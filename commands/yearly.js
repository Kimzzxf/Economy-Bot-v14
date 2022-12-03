const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("yearly")
    .setDescription("Claim your yearly reward"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let amount = 1000000;

    let data;
    try {
      data = await schema.findOne({
        userId: interaction.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    let timeout = 31557600000;

    if (timeout - (Date.now() - data.yearlyTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.yearlyTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.yearlyTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const yearlyEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You recieved a yearly reward of **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [yearlyEmbed],
      });
    }
  },
};
