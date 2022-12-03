const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete messages in a text channel")
    .addChannelOption((option) =>
      option
        .setName("channel_name")
        .setDescription("Select a channel")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("messages_amount")
        .setDescription("Enter the amount of messages you want to delete")
        .setMinValue(1)
        .setMaxValue(300)
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.ManageMessages
    );
    let channelName = interaction.options.getChannel("channel_name");
    let messagesAmount = interaction.options.getInteger("messages_amount");

    if (!permission) {
      await interaction.reply({
        content: "You don't have the permissions to use this command...",
        ephemeral: true,
      });
    } else {
      channelName.bulkDelete(messagesAmount, true);

      const purgeEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `**${
            interaction.user.username
          }** deleted **${messagesAmount.toLocaleString()}** messages in **${channelName}**`
        );

      await interaction.reply({
        embeds: [purgeEmbed],
      });
    }
  },
};
