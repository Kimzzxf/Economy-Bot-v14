const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw your coins from the bank")
    .addIntegerOption((option) =>
      option
        .setName("withdraw_amount")
        .setDescription("Enter the withdraw amount")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let withdrawAmount = interaction.options.getInteger("withdraw_amount");

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

    if (withdrawAmount > data.bank) {
      await interaction.reply({
        content: "You don't have that much coins in your bank to withdraw.",
      });
    } else if (withdrawAmount <= 0) {
      await interaction.reply({
        content: "Please enter a number above 0.",
      });
    } else {
      data.bank -= withdrawAmount * 1;
      data.wallet += withdrawAmount * 1;
      await data.save();

      const withdrawEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `Successfully withdrawn **:coin: ${withdrawAmount.toLocaleString()}** from the bank`
        );

      await interaction.reply({
        embeds: [withdrawEmbed],
      });
    }
  },
};
