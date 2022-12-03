const discord = require("discord.js");
const jokes = require("discord-jokes");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("chucknorris")
    .setDescription("Get a random Chuck Norris joke"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    jokes.getRandomCNJoke(async function (joke) {
      const chucknorrisEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle("Here's a Chuck Norris joke for you")
        .setDescription(`**${joke}**`)
        .setFooter({
          text: "Is it funny? IDK",
        });

      await interaction.reply({
        embeds: [chucknorrisEmbed],
      });
    });
  },
};
