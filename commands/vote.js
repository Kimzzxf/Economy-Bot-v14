const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote Me on top.gg"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const voteRow = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setLabel("Vote Me on top.gg")
        .setStyle(discord.ButtonStyle.Link)
        .setURL("https://top.gg/bot/960193514656919652/vote")
    );

    await interaction.reply({
      content: "Click the below button to Vote Me on top.gg",
      components: [voteRow],
    });
  },
};
