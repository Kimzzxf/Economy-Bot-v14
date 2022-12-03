const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get a brief info about a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let user = interaction.options.getUser("user");

    const userinfoEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL(),
      })
      .addFields(
        {
          name: "Account Created At",
          value: `${user.createdAt.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Joined Server At",
          value: `${interaction.guild.joinedAt.toLocaleString()}`,
          inline: true,
        },
        {
          name: "User ID",
          value: `${user.id}`,
          inline: true,
        },
        {
          name: "User Tag",
          value: `${user.tag}`,
          inline: true,
        },
        {
          name: "Username",
          value: `${user.username}`,
          inline: true,
        },
        {
          name: "Is User Bot",
          value: `${user.bot}`,
          inline: true,
        }
      )
      .setFooter({
        text: "This data gets changed according to the user",
      });

    await interaction.reply({
      embeds: [userinfoEmbed],
    });
  },
};
