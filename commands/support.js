const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("support")
    .setDescription("Join my Support Server"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const supportRow = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setLabel("Join my Support Server")
        .setStyle(discord.ButtonStyle.Link)
        .setURL("https://discord.gg/uoaio")
    );

    await interaction.reply({
      content: "Click the button below to Join my Support Server",
      components: [supportRow],
    });
  },
};
