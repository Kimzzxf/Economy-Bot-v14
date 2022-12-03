const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play Rock Paper Scissors and win coins")
    .addIntegerOption((option) =>
      option
        .setName("bet_amount")
        .setDescription("Enter the bet amount")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Select your choice")
        .addChoices(
          {
            name: "Rock",
            value: "rock",
          },
          {
            name: "Paper",
            value: "paper",
          },
          {
            name: "Scissors",
            value: "scissors",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let choiceArray = ["rock", "paper", "scissors"];
    let betAmount = interaction.options.getInteger("bet_amount");
    let choice = interaction.options.getString("choice");
    let botChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];

    let data;
    try {
      data = await schema.findOne({
        userId: interaction.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
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

    let timeout = 30000;

    if (timeout - (Date.now() - data.rpsTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.rpsTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else if (betAmount > data.wallet) {
      await interaction.reply({
        content: "You don't have that much coins in your wallet...",
        ephemeral: true,
      });
    } else if (choice === botChoice) {
      data.rpsTimeout = Date.now();
      await data.save();

      const tieEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`__${interaction.user.username}\'s Rock Paper Scissors__`)
        .setDescription(
          `**${interaction.user.username}\'s** it's a **tie**, and you got all your coins back`
        );

      await interaction.reply({
        embeds: [tieEmbed],
      });
    } else if (choice === "rock" && botChoice === "scissors") {
      let winAmount1 = betAmount * 2;

      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      data.wallet += winAmount1 * 1;
      await data.save();

      const winEmbed1 = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`__${interaction.user.username}\'s Rock Paper Scissors__`)
        .setDescription(
          `**${interaction.user.username}** you **won**, and you got double of your bet coins back`
        );

      await interaction.reply({
        embeds: [winEmbed1],
      });
    } else if (choice === "scissors" && botChoice === "paper") {
      let winAmount2 = betAmount * 2;

      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      data.wallet += winAmount2 * 1;
      await data.save();

      const winEmbed2 = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`__${interaction.user.username}\'s Rock Paper Scissors__`)
        .setDescription(
          `**${interaction.user.username}** you **won**, and you got double of your bet coins back`
        );

      await interaction.reply({
        embeds: [winEmbed2],
      });
    } else if (choice === "paper" && botChoice === "rock") {
      let winAmount3 = betAmount * 2;

      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      data.wallet += winAmount3 * 1;
      await data.save();

      const winEmbed3 = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`__${interaction.user.username}\'s Rock Paper Scissors__`)
        .setDescription(
          `**${interaction.user.username}** you **won**, and you got double of your bet coins back`
        );

      await interaction.reply({
        embeds: [winEmbed3],
      });
    } else {
      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      await data.save();

      const loseEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(
          `__${interaction.user.username}'s Diceroll Rock Paper Scissors__`
        )
        .setDescription(
          `**${interaction.user.username}** you **lost**, and you lost all of your bet coins`
        );

      await interaction.reply({
        embeds: [loseEmbed],
      });
    }
  },
};
