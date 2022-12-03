const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme from Reddit"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const url = "https://meme-api.herokuapp.com/gimme";

    axios.default
      .get(url)
      .then(async (res) => {
        const memeEmbed = new discord.EmbedBuilder()
          .setColor("#0155b6")
          .setTitle(`${res.data.title}`)
          .setURL(`${res.data.postLink}`)
          .addFields(
            {
              name: "Author",
              value: `${res.data.author}`,
              inline: true,
            },
            {
              name: "Ups :thumbsup:",
              value: `${res.data.ups.toLocaleString()}`,
              inline: true,
            }
          )
          .setImage(`${res.data.url}`)
          .setFooter({
            text: `Subreddit - ${res.data.subreddit}`,
          });

        await interaction.reply({
          embeds: [memeEmbed],
        });
      })
      .catch(async (err) => {
        console.log(err);
        await interaction.reply({
          content: "There was an error while executing this command...",
          ephemeral: true,
        });
      });
  },
};
