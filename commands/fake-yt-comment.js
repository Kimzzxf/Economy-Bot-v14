const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("fake-yt-comment")
    .setDescription("Post a fake YouTube comment")
    .addStringOption((option) =>
      option
        .setName("comment")
        .setDescription("Enter your comment")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let comment = interaction.options.getString("comment");
    let avatarUrl = interaction.user.avatarURL({ extension: "jpg" });
    let canvas = `https://some-random-api.ml/canvas/youtube-comment?avatar=${avatarUrl}&username=${
      interaction.user.username
    }&comment=${encodeURIComponent(comment)}`;

    await interaction.reply({
      content: canvas,
    });
  },
};
