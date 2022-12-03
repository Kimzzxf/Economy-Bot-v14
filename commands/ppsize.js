const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ppsize")
    .setDescription("Get the size of the pp of a user")
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

    let ppSize = Math.floor(Math.random() * 10);
    let pp = "";

    for (let i = 0; i < ppSize; i++) {
      pp += "=";
    }

    const finalSize = `**\n8${pp}D**`;

    const ppSizeEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setDescription(`**${user.username}\'s** Penis Size\n**${finalSize}**`);

    await interaction.reply({
      embeds: [ppSizeEmbed],
    });
  },
};
