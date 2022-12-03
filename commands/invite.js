const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite Me to your server"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const inviteRow = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle(discord.ButtonStyle.Link)
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=960193514656919652&permissions=8&scope=bot%20applications.commands"
        )
    );

    await interaction.reply({
      content: "Click the below button to Invite Me to your server",
      components: [inviteRow],
    });
  },
};
