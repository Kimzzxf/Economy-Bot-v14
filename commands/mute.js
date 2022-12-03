const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("mute_duration")
        .setDescription("Select the mute duration")
        .addChoices(
          {
            name: "1 minute",
            value: 1,
          },
          {
            name: "5 minutes",
            value: 5,
          },
          {
            name: "10 minutes",
            value: 10,
          },
          {
            name: "1 hour",
            value: 60,
          },
          {
            name: "1 day",
            value: 1440,
          },
          {
            name: "1 week",
            value: 10080,
          }
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Enter the reason for mute")
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.MuteMembers
    );
    let user = interaction.options.getUser("user");
    let muteDuration = interaction.options.getInteger("mute_duration");
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
        content: "You can't mute yourself...",
        ephemeral: true,
      });
    } else if (user.id === client.user.id) {
      await interaction.reply({
        content: "You can't mute me with using my own commands...",
        ephemeral: true,
      });
    } else {
      let member = interaction.guild.members.cache.get(user.id);

      await member
        .timeout(muteDuration * 60 * 1000, reason)
        .then(async () => {
          const muteEmbed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setDescription(
              `<:Arrow:964215679387566151> User Muted - ${user}\n<:Arrow:964215679387566151> Muted by - ${interaction.user}\n<:Arrow:964215679387566151> Reason - **${reason}**`
            );

          await interaction.reply({
            embeds: [muteEmbed],
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
