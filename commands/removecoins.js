const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("removecoins")
    .setDescription("Remove coins from a user's wallet")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Enter the amount you want to remove")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.ManageGuild
    );
    let user = interaction.options.getUser("user");
    let amount = interaction.options.getInteger("amount");

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    if (!permission) {
      await interaction.reply({
        content: "You don't have the permissions to use this command...",
        ephemeral: true,
      });
    } else if (amount > data.wallet) {
      await interaction.reply({
        content: "This user doesn't have that much coins in their wallet...",
        ephemeral: true,
      });
    } else {
      data.wallet -= amount * 1;
      await data.save();

      const removecoinsEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You removed **:coin: ${amount.toLocaleString()}** from **${
            user.username
          }\'s** wallet`
        );

      await interaction.reply({
        embeds: [removecoinsEmbed],
      });
    }
  },
};
