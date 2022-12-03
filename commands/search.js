const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("search")
    .setDescription("Search for some coins")
    .addStringOption((option) =>
      option
        .setName("search_location")
        .setDescription("Select a location to search")
        .addChoices(
          {
            name: "Car",
            value: "Car",
          },
          {
            name: "Bike",
            value: "Bike",
          },
          {
            name: "Wallet",
            value: "Wallet",
          },
          {
            name: "Pocket",
            value: "Pocket",
          },
          {
            name: "Computer",
            value: "Computer",
          },
          {
            name: "Keyboard",
            value: "Keyboard",
          },
          {
            name: "Laptop",
            value: "Laptop",
          },
          {
            name: "Desk",
            value: "Desk",
          },
          {
            name: "Shoe",
            value: "Shoe",
          },
          {
            name: "Sock",
            value: "Sock",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let searchLocation = interaction.options.getString("search_location");
    let amount = Math.floor(Math.random() * 1000) + 100;

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

    if (timeout - (Date.now() - data.searchTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.searchTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.searchTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const searchEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You searched a **${searchLocation}** and found **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [searchEmbed],
      });
    }
  },
};
