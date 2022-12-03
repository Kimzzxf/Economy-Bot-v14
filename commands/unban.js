const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user")
    .addStringOption((option) =>
      option
        .setName("user_id")
        .setDescription("Enter the id of the user whom you want to unban")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.BanMembers
    );
    let userId = interaction.options.getString("user_id");

    if (!permission) {
      await interaction.reply({
        content: "You don't have the permissions to use this command...",
        ephemeral: true,
      });
    } else {
      let totalBans = await interaction.guild.bans.fetch();
      let member = totalBans.find((m) => m.user.id === userId);

      if (!member) {
        await interaction.reply({
          content: "This user id is not there in this server's bans list...",
          ephemeral: true,
        });
      } else {
        interaction.guild.members.unban(userId).then(async () => {
          const unbanEmbed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setDescription(
              `<:Arrow:964215679387566151> User Unbanned - <@${userId}>\n<:Arrow:964215679387566151> Unbanned by - ${interaction.user}`
            );

          await interaction.reply({
            embeds: [unbanEmbed],
          });
        });
      }
    }
  },
};
