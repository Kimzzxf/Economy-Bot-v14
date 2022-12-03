const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("mission-passded")
    .setDescription("Get a mission passed overlay on a user's avatar")
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

    let avatarUrl = user.avatarURL({ size: 512, extension: "jpg" });
    let overlay = `https://some-random-api.ml/canvas/passed?avatar=${avatarUrl}`;

    await interaction.reply({
      content: overlay,
    });
  },
};
