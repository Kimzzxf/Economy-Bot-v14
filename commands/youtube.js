const discord = require("discord.js");
const yts = require("yt-search");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Search a video on YouTube")
    .addStringOption((option) =>
      option
        .setName("search_query")
        .setDescription("Enter your search query")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const searchQuery = interaction.options.getString("search_query");
    const result = await yts(searchQuery);
    const videos = result.videos.slice(0, 1);
    videos.forEach(async function (v) {
      await interaction.reply({
        content: `${v.url}\n<:youtube:953181818344079381> Channel Name - **${
          v.author.name
        }**\n<a:a_dot:954247940963192832> Views - **${v.views.toLocaleString()}**\n<a:a_dot:954247940963192832> Video Duration - **${
          v.duration.timestamp
        }**\n<a:a_dot:954247940963192832> Uploaded - **${v.ago}**`,
      });
    });
  },
};
