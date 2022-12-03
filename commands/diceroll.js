const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("diceroll")
    .setDescription("Roll the dice and win coins")
    .addIntegerOption((option) =>
      option
        .setName("bet_amount")
        .setDescription("Enter the bet amount")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("choice_1")
        .setDescription("Select your choice")
        .addChoices(
          {
            name: "1",
            value: 1,
          },
          {
            name: "2",
            value: 2,
          },
          {
            name: "3",
            value: 3,
          },
          {
            name: "4",
            value: 4,
          },
          {
            name: "5",
            value: 5,
          },
          {
            name: "6",
            value: 6,
          }
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("choice_2")
        .setDescription("Select your choice")
        .addChoices(
          {
            name: "1",
            value: 1,
          },
          {
            name: "2",
            value: 2,
          },
          {
            name: "3",
            value: 3,
          },
          {
            name: "4",
            value: 4,
          },
          {
            name: "5",
            value: 5,
          },
          {
            name: "6",
            value: 6,
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let choiceArray = [1, 2, 3, 4, 5, 6];
    let betAmount = interaction.options.getInteger("bet_amount");
    let choice1 = interaction.options.getInteger("choice_1");
    let choice2 = interaction.options.getInteger("choice_2");
    let botChoice1 =
      choiceArray[Math.floor(Math.random() * choiceArray.length)];
    let botChoice2 =
      choiceArray[Math.floor(Math.random() * choiceArray.length)];
    let userTotal = choice1 + choice2;
    let botTotal = botChoice1 + botChoice2;

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

    if (timeout - (Date.now() - data.dicerollTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.dicerollTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else if (betAmount > data.wallet) {
      await interaction.reply({
        content: "You don't have that much coins in your wallet...",
        ephemeral: true,
      });
    } else if (userTotal === botTotal) {
      data.dicerollTimeout = Date.now();
      await data.save();

      const tieEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`__${interaction.user.username}\'s Diceroll__`)
        .setDescription(
          `**${interaction.user.username}** it\'s a **tie**, and you got all your coins back`
        );

      await interaction.reply({
        embeds: [tieEmbed],
      });
    } else if (userTotal > botTotal) {
      let winAmount = betAmount * 2;

      data.dicerollTimeout = Date.now();
      data.wallet -= betAmount * 1;
      data.wallet += winAmount * 1;
      await data.save();

      const winEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`__${interaction.user.username}\'s Diceroll__`)
        .setDescription(
          `**${interaction.user.username}** you **won**, and you got double of your bet coins back\n\nYou rolled **${choice1}** and **${choice2}**\nI rolled **${botChoice1}** and **${botChoice2}**`
        );

      await interaction.reply({
        embeds: [winEmbed],
      });
    } else if (botTotal > userTotal) {
      data.dicerollTimeout = Date.now();
      data.wallet -= betAmount * 1;
      await data.save();

      const loseEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`__${interaction.user.username}\'s Diceroll__`)
        .setDescription(
          `**${interaction.user.username}** you **lost**, and you lost all of your bet coins\n\nYou rolled **${choice1}** and **${choice2}**\nI rolled **${botChoice1}** and **${botChoice2}**`
        );

      await interaction.reply({
        embeds: [loseEmbed],
      });
    }
  },
};
