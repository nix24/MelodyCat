const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player, useQueue } = require("discord-player");
const fs = require("fs");
require("dotenv").config();
//version discord.js = 14.0.0
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
const player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
});

(async () => {
	await player.extractors.loadDefault();
})();

player.events.on("playerStart", (queue, track) => {
	const channel = queue.metadata.channel;
	channel.send(`Now playing **${track.title}**!`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === "mc-play") {
		const channel = interaction.member.voice.channel;
		if (!channel)
			return interaction.reply("You are not connected to a voice channel!");
		const query = interaction.options.getString("url", true);
		await interaction.deferReply();
		try {
			const { track } = await player.play(channel, query, {
				nodeOptions: {
					metadata: {
						channel: interaction.channel,
						client: interaction.client,
						requestedBy: interaction.user,
					},
					volume: 50,
				},
			});

			await interaction.followUp(
				`**${track.title}** enqueued! requested by ${interaction.user}`
			);
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}

	//help command
	if (interaction.commandName === "mc-help") {
		const helpMessage =
			"Here are the available commands:\n" +
			"• `/mc-play <url>`: Plays a music stream from an URL or search.\n" +
			"• `/queue`: Shows the current music queue.\n" +
			"• `/skip`: Skips the currently playing track.\n" +
			"• `/pause`: Pauses/resumes the music playback.\n" +
			"• `/mc-volume <level>`: Adjusts the volume of the music playback.\n" +
			"• `/mc-playlist-create <name>`: Creates a new playlist.\n" +
			"• `/mc-pl-add <name> <url>`: Adds a track to a playlist.\n" +
			"• `/mc-pl-play <name>`: Plays a playlist.\n" +
			"• `/mc-help`: Shows this help message.";

		await interaction.reply(helpMessage);
	}
	//queue command: shows the current music queue up to 10 tracks
	if (interaction.commandName === "mc-queue") {
		//grab the current queue
		const queue = useQueue(interaction.guild.id);

		//if there is no queue, return an error message
		if (!queue) {
			await interaction.reply("There is no music playing!");
			return;
		}

		await interaction.deferReply();
		try {
			//if there is a queue, grab the current track
			const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
			const currentTrack = queue.currentTrack;
			console.log(currentTrack.title);

			//loop through the queue and grab the first 10 tracks
			const songs = [];
			for (let i = 0; i < tracks.length && i < 10; i++) {
				songs.push(`${i + 1}: ${tracks[i].title} - ${tracks[i].duration}
				`);
			}

			//create the embed message
			const queueMessage = {
				title: "🐈‍⬛ Music Queue 🐈‍⬛",
				description: songs.join("\n"),
				//
				fields: [
					{
						name: "🎧 Now Playing 🎧",
						value: `**${currentTrack.title}** - ${currentTrack.author} -  ${currentTrack.duration} by ${interaction.user}`,
					},
				],
			};

			//send the embed message
			await interaction.followUp({ embeds: [queueMessage] });
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
	//pause command: skips the current track
	if (interaction.commandName === "mc-pause") {
		const queue = useQueue(interaction.guild.id);
		if (!queue) {
			await interaction.reply("There is no music playing!");
			return;
		}

		await interaction.deferReply();
		try {
			queue.node.setPaused(!queue.node.isPaused()); //isPaused() returns true if that player is already paused
			//interaction.followUp changes based on whether the player is paused or not
			await interaction.followUp(
				queue.node.isPaused() ? "Paused the music!" : "Resumed the music!"
			);
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
	//skip command: skips the current track
	if (interaction.commandName === "mc-skip") {
		const queue = useQueue(interaction.guild.id);
		if (!queue) {
			await interaction.reply("There is no music playing!");
			return;
		}

		await interaction.deferReply();
		try {
			queue.node.skip();
			await interaction.followUp("Skipped the music!");
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
	//shuffle command: shuffles the current queue
	if (interaction.commandName === "mc-shuffle") {
		const queue = useQueue(interaction.guild.id);
		if (!queue) {
			await interaction.reply("There is no music playing!");
			return;
		}

		await interaction.deferReply();
		try {
			queue.tracks.shuffle();
			await interaction.followUp("Shuffled the queue!");
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
	//loop (off, track, Queue) command: loops the current track or queue
	if (interaction.commandName === "mc-loop") {
		const queue = useQueue(interaction.guild.id);
		if (!queue) {
			await interaction.reply("There is no music playing!");
			return;
		}

		await interaction.deferReply();
		try {
			//ask user for type of loop(Track, Queue, Off)
			/**
			 * Mode	Value	Description
			Off	0	Default mode with no loop active
			Track	1	Loops the current track
			Queue	2	Loops the current queue
			 */
			switch (interaction.options.getString("mode")) {
				case "off":
					queue.setRepeatMode(0);
					break;
				case "track":
					queue.setRepeatMode(1);
					break;
				case "queue":
					queue.setRepeatMode(2);
					break;
				default:
					await interaction.followUp("Invalid loop mode!");
					break;
			}
			await interaction.followUp(
				`Loop mode set to ${interaction.options.getString("mode")}`
			);
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}

	//clear command: clears the current queue
	if (interaction.commandName === "mc-clear") {
		const queue = useQueue(interaction.guild.id);
		if (!queue) {
			await interaction.reply("There is no music already homie .-.!");
			return;
		}

		await interaction.deferReply();
		try {
			queue.delete();
			await interaction.followUp("Cleared the queue!");
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log("I am ready to play with discord-player!");
});

client.login(process.env.DISCORD_BOT_TOKEN);
