const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("anime-hug")
    .setDescription("Get a Anime hug"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const url = "https://some-random-api.ml/animu/hug";

    axios.default.get(url).then(async (res) => {
      await interaction
        .reply({
          content: `${res.data.link}`,
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            content: "There was an error while executing this command...",
            ephemeral: true,
          });
        });
    });
  },
};
