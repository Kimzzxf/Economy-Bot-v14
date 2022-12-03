const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("work")
    .setDescription("Work and earn some coins")
    .addStringOption((option) =>
      option
        .setName("job")
        .setDescription("Select a job")
        .addChoices(
          {
            name: "Software Developer",
            value: "Software Developer",
          },
          {
            name: "Data Scientist",
            value: "Data Scientist",
          },
          {
            name: "Doctor",
            value: "doctor",
          },
          {
            name: "Waiter",
            value: "Waiter",
          },
          {
            name: "Painter",
            value: "Painter",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let job = interaction.options.getString("job");
    let amount = Math.floor(Math.random() * 5000) + 500;

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

    let timeout = 3600000;

    if (timeout - (Date.now() - data.workTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.workTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.workTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const workEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You worked as a **${job}** and earned **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [workEmbed],
      });
    }
  },
};
