const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("balance")
    .setDescription("Shows the balance of a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to view their balance")
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let user = interaction.options.getUser("user");

    if (!user) {
      user = interaction.user;
    }

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
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    const balanceEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`__${user.username}\'s Balance__`)
      .setDescription(
        `<:Arrow:964215679387566151> Wallet: **${data.wallet.toLocaleString()}**\n<:Arrow:964215679387566151> Bank: **${data.bank.toLocaleString()}**`
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [balanceEmbed],
    });
  },
};
