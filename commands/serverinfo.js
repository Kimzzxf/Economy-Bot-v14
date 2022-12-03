const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Get a brief info about the server"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const serverinfoEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(interaction.guild.iconURL())
      .setTitle(interaction.guild.name)
      .addFields(
        {
          name: "Server Created At",
          value: `${interaction.guild.createdAt.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Server Name",
          value: `${interaction.guild.name}`,
          inline: true,
        },
        {
          name: "Server ID",
          value: `${interaction.guild.id}`,
          inline: true,
        },
        {
          name: "Owner ID",
          value: `${interaction.guild.ownerId}`,
          inline: true,
        },
        {
          name: "Member Count",
          value: `${interaction.guild.memberCount}`,
          inline: true,
        },
        {
          name: "Is Server Partnered",
          value: `${interaction.guild.partnered}`,
          inline: true,
        }
      )
      .setFooter({
        text: "This data gets changed according to the server",
      });

    await interaction.reply({
      embeds: [serverinfoEmbed],
    });
  },
};
