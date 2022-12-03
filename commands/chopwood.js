const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("chopwood")
    .setDescription("Chop some wood in the forest and earn coins"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let woodAmount = Math.floor(Math.random() * 20) + 1;
    let amount = woodAmount * 250 * 1;

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

    let timeout = 30000;

    if (timeout - (Date.now() - data.chopwoodTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.chopwoodTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.chopwoodTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const chopwoodEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You chopped **${woodAmount}** logs of wood and earned **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [chopwoodEmbed],
      });
    }
  },
};
