const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Shows you the member count of this server"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const membercountEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setDescription(
        `<:Arrow:964215679387566151> Member Count of **${interaction.guild.name}** - **${interaction.guild.memberCount}**`
      );

    await interaction.reply({
      embeds: [membercountEmbed],
    });
  },
};
