const config = require("./config.json");
const discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");

const client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMessages,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity("with Slash commands");

  mongoose
    .connect(config.mongodb_uri)
    .then(() => {
      console.log("Successfully connected to the MongoDB Database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to the MongoDB Database");
    });
});

client.commands = new discord.Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(client, interaction);
  } catch (err) {
    console.log(err);
    await interaction.reply({
      content: "There was an error while executing this command...",
      ephemeral: true,
    });
  }
});

client.login(process.env.TOKEN);
 require("./deployCommands.js")



const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));