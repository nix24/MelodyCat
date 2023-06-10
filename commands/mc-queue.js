/***
 * converting over to seperate file
 * if (interaction.commandName === "mc-queue") {
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
 */
const { useQueue } = require("discord-player");

module.exports = {
	name: "mc-queue",
	/**
	 * Executes the music queue when prompted by a user.
	 *
	 * @param {Object} interaction - The interaction object containing the guild id.
	 */
	async execute(interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue) {
			await interaction.reply(
				"doesn't seem to be any music playing right now. Why don't you pick a song?"
			);
			return;
		}

		await interaction.deferReply();
		try {
			//if there is a queue, grab the current track
			const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
			const currentTrack = queue.currentTrack;

			//loop through the queue and grab the first 10 tracks
			const songs = [];
			for (let i = 0; i < tracks.length && i < 10; i++) {
				songs.push(`${i + 1}: ${tracks[i].title} - ${tracks[i].duration}
                `);
			}

			//create the embed message
			const queueMessage = {
				color: 0xffd700, // This is the color for the side bar. Gold seems cozy, but you can choose another color from Discord's color palette.
				title: "🐈‍⬛ Catfe Music Queue 🐈‍⬛",
				description:
					songs.length > 0
						? songs.join("\n")
						: "_The song queue is currently empty. Why not pick your favorite tune?_",
				fields: [
					{
						name: "🎧 Now Playing 🎧",
						value: `**${currentTrack.title}** - ${currentTrack.author} -  ${currentTrack.duration}\n\n_Chosen by ${interaction.user}_`,
					},
				],
				footer: { text: "MelodyCat: Making every day a cozy experience 🐾" },
			};

			// Send the embed message
			await interaction.followUp({ embeds: [queueMessage] });
		} catch (error) {
			console.error(error);
			await interaction.followUp({
				content:
					"Oops, it seems like I tripped over some spaghetti code. Could you wait a bit before you try that command again?",
				ephemeral: true,
			});
		}
	},
};
