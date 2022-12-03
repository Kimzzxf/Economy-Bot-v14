const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("commands")
    .setDescription("Shows the list of all available commands")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Enter the commands category")
        .addChoices(
          {
            name: "Economy",
            value: "economy",
          },
          {
            name: "Eco-Mod",
            value: "ecomod",
          },
          {
            name: "Gambling",
            value: "gambling",
          },
          {
            name: "Image Overlay",
            value: "imageoverlay",
          },
          {
            name: "Image Filter",
            value: "imagefilter",
          },
          {
            name: "Canvas",
            value: "canvas",
          },
          {
            name: "Fun",
            value: "fun",
          },
          {
            name: "Anime",
            value: "anime",
          },
          {
            name: "Moderation",
            value: "moderation",
          },
          {
            name: "Misc",
            value: "misc",
          },
          {
            name: "Utility",
            value: "utility",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const category = interaction.options.getString("category");

    if (category === "economy") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Economy commands")
        .setDescription(
          "`balance`, `beg`, `deposit`, `withdraw`, `fish`, `hunt`, `chopwood`, `search`, `postmeme`, `daily`, `weekly`, `monthly`, `yearly`, `donated`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "ecomod") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Eco-Mod commands")
        .setDescription("`addcoins`, `removecoins`")
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "gambling") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Gambling commands")
        .setDescription("`diceroll`, `rps`")
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "imageoverlay") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Image Overlay commands")
        .setDescription(
          "`gay`, `glass`, `wasted`, `mission-passed`, `jail`, `comrade`, `triggered`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "imagefilter") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Image Filter commands")
        .setDescription(
          "`greyscale`, `invert`, `sepia`, `red`, `green`, `blue`, `blurple`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "canvas") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Canvas commands")
        .setDescription(
          "`pixelate`, `blur`, `simp-card`, `horny-card`, `fake-yt-comment`, `fake-tweet`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "fun") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Fun commands")
        .setDescription("`meme`, `dadjoke`, `chucknorris`, `howgay`, `ppsize`")
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "anime") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Anime commands")
        .setDescription("`anime-hug`, `anime-pat`, `anime-wink`")
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "moderation") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Moderation commands")
        .setDescription(
          "`purge`, `change-nickname`, `kick`, `ban`, `unban`, `mute`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "misc") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Misc commands")
        .setDescription(
          "`avatar`, `membercount`, `userinfo`, `serverinfo`, `youtube`, `weather`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } else if (category === "utility") {
      const embed = new discord.EmbedBuilder()
        .setColor("#f773d9")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Utility commands")
        .setDescription(
          "`ping`, `invite`, `support`, `info`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
