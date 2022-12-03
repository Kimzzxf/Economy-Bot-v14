const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Enter the reason for ban")
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.BanMembers
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
        content: "You can't ban yourself...",
        ephemeral: true,
      });
    } else if (user.id === client.user.id) {
      await interaction.reply({
        content: "You can't ban me with using my own commands...",
        ephemeral: true,
      });
    } else {
      let member = interaction.guild.members.cache.get(user.id);

      await member
        .ban({
          reason: reason,
        })
        .then(async () => {
          const banEmbed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setDescription(
              `<:Arrow:964215679387566151> User Banned - ${user}\n<:Arrow:964215679387566151> Banned by - ${interaction.user}\n<:Arrow:964215679387566151> Reason - **${reason}**`
            );

          await interaction.reply({
            embeds: [banEmbed],
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
