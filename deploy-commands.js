const { REST, Routes } = require("discord.js");
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

const { SlashCommandBuilder } = require("@discordjs/builders");

const commands = [
	new SlashCommandBuilder()
		.setName("mc-play")
		.setDescription("Plays a music stream from a YouTube link.")
		.addStringOption((option) =>
			option
				.setName("url")
				.setDescription("The YouTube URL to play")
				.setRequired(true)
		)
		.toJSON(),
	// Adding help command
	new SlashCommandBuilder()
		.setName("mc-help")
		.setDescription("Shows a list of available commands.")
		.toJSON(),
	// Queue command: shows the current music queue up to 10 tracks
	new SlashCommandBuilder()
		.setName("mc-queue")
		.setDescription("Shows the current music queue up to 10 tracks.")
		.toJSON(),
	// Pause command: pauses the music playback
	new SlashCommandBuilder()
		.setName("mc-pause")
		.setDescription("Pauses the music playback.")
		.toJSON(),
	// Skip command: skips the currently playing track
	new SlashCommandBuilder()
		.setName("mc-skip")
		.setDescription("Skips the currently playing track.")
		.toJSON(),
	// Shuffle command: shuffles the current queue
	new SlashCommandBuilder()
		.setName("mc-shuffle")
		.setDescription("Shuffles the current queue.")
		.toJSON(),
	// Loop command: loops the current track or queue
	new SlashCommandBuilder()
		.setName("mc-loop")
		.setDescription("Loops the current track or queue.")
		.addStringOption((option) =>
			option
				.setName("mode")
				.setDescription("The loop mode")
				.setRequired(true)
				.addChoices(
					{ name: "Track", value: "track" },
					{ name: "Queue", value: "queue" },
					{ name: "Off", value: "off" }
				)
		)
		.toJSON(),
	// Clear command: clears the current queue
	new SlashCommandBuilder()
		.setName("mc-clear")
		.setDescription("Clears the current queue.")
		.toJSON(),
];

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy the commands
(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		// Catch and log any errors
		console.error(error);
	}
})();
