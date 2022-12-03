const config = require("../config.json");
const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("weather")
    .setDescription("Check the weather of a city")
    .addStringOption((option) =>
      option
        .setName("city_name")
        .setDescription("Enter the city name")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const cityName = interaction.options.getString("city_name");
    const url = `https://api.weatherapi.com/v1/current.json?key=${
      config.weather_api_key
    }&q=${encodeURIComponent(cityName)}&aqi=no`;

    axios
      .get(url)
      .then(async (res) => {
        const embed = new discord.EmbedBuilder()
          .setColor("#0155b6")
          .setThumbnail(`https:${res.data.current.condition.icon}`)
          .setTitle(`${res.data.location.name}'s Weather`)
          .addFields(
            {
              name: "Temperature",
              value: `${res.data.current.temp_c} C° or ${res.data.current.temp_f} F°`,
              inline: false,
            },
            {
              name: "Wind Speed",
              value: `${res.data.current.wind_kph} kph or ${res.data.current.wind_mph} mph`,
              inline: false,
            },
            {
              name: "Wind Degree",
              value: `${res.data.current.wind_degree}°`,
              inline: false,
            },
            {
              name: "Pressure",
              value: `${res.data.current.pressure_in} inches`,
              inline: false,
            },
            {
              name: "Humidity",
              value: `${res.data.current.humidity}%`,
              inline: false,
            }
          )
          .setFooter({
            text: "Data from weather api",
          });

        await interaction.reply({
          embeds: [embed],
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
