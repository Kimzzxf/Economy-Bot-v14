const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("postmeme")
    .setDescription("Post a meme and earn coins")
    .addStringOption((option) =>
      option
        .setName("meme_category")
        .setDescription("Select a meme category")
        .addChoices(
          {
            name: "Fresh",
            value: "Fresh",
          },
          {
            name: "Copypasta",
            value: "Copypasta",
          },
          {
            name: "Repost",
            value: "Repost",
          },
          {
            name: "Intellectual",
            value: "Intellectual",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let memeCategory = interaction.options.getString("meme_category");
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

    if (timeout - (Date.now() - data.postmemeTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.postmemeTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.postmemeTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const postmemeEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You posted a **${memeCategory}** meme and earned **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [postmemeEmbed],
      });
    }
  },
};
