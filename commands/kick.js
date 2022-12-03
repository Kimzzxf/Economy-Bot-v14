const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Enter the reason for kick")
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.KickMembers
    );
    let user = interaction.options.getUser("user");
    let reason =
      interaction.options.getString("reason") ||
      `Reason not provided by ${interaction.user}`;

    if (!permission) {
      await interaction.reply({
        content: "You don't have the permissions to use this command...",
        ephemeral: true,
      });
    } else if (user.id === interaction.user.id) {
      await interaction.reply({
        content: "You can't kick yourself...",
        ephemeral: true,
      });
    } else if (user.id === client.user.id) {
      await interaction.reply({
        content: "You can't kick me by using my own commands...",
        ephemeral: true,
      });
    } else {
      let member = interaction.guild.members.cache.get(user.id);

      await member
        .kick(reason)
        .then(async () => {
          const kickEmbed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setDescription(
              `<:Arrow:964215679387566151> User Kicked - ${user}\n<:Arrow:964215679387566151> Kicked by - ${interaction.user}\n<:Arrow:964215679387566151> Reason - **${reason}**`
            );

          await interaction.reply({
            embeds: [kickEmbed],
          });
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            content: "There was an error while executing this command...",
            ephemeral: true,
          });
        });
    }
  },
};
