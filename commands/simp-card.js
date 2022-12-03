const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("simp-card")
    .setDescription("Get a simp card of a user")
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

    let avatarUrl = user.avatarURL({ extension: "jpg" });
    let card = `https://some-random-api.ml/canvas/simpcard?avatar=${avatarUrl}`;

    await interaction.reply({
      content: card,
    });
  },
};
