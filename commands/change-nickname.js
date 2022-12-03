const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("change-nickname")
    .setDescription("Change the nickname of a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("new_nickname")
        .setDescription("Enter the new nickname")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.ManageNicknames
    );
    let user = interaction.options.getUser("user");
    let newNickname = interaction.options.getString("new_nickname");

    if (!permission) {
      await interaction.reply({
        content: "You don't have the permissions to use this command...",
        ephemeral: true,
      });
    } else {
      let member = interaction.guild.members.cache.get(user.id);

      await member
        .setNickname(newNickname)
        .then(async () => {
          const nicknameEmbed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setDescription(
              `**${interaction.user.username}** changed **${user.tag}\'s** nickname to **${newNickname}**`
            );

          await interaction.reply({
            embeds: [nicknameEmbed],
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
