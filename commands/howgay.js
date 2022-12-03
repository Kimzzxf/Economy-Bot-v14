const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("howgay")
    .setDescription("Shows how gay a user is")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let user = interaction.options.getUser("user");

    if (!user) {
      user = interaction.user;
    }

    let gayPercentage = Math.floor(Math.random() * 100);

    const howgayEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setDescription(
        `**${user.username}** is **${gayPercentage}%** gay :rainbow_flag:`
      );

    await interaction.reply({
      embeds: [howgayEmbed],
    });
  },
};
