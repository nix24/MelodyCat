/**
 * moving to seperate file:if (interaction.commandName === "mc-help") {
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
 */

module.exports = {
	name: "mc-help",
	/**
	 * Asynchronously executes the function to reply with a help message containing all available commands.
	 *
	 * @param {Object} interaction - the interaction object
	 */
	async execute(interaction) {
		const helpMessage =
			"Here are the available commands:\n" +
			"• `/mc-play <url>`: Play a tune from an URL or search. Like your personal DJ.\n" +
			"• `/queue`: Check out the current playlist.\n" +
			"• `/skip`: Skip to the next track. Variety is the spice of life!\n" +
			"• `/pause`: Take a break and pause/resume the music.\n" +
			"• `/mc-loop <value>`: Loop the current track or playlist. Some tunes are just worth repeating.\n" +
			"• `/mc-shuffle`: Shuffle the playlist. I like a musical surprise now and then.\n" +
			"• `/mc-clear`: Clear the current playlist. A fresh start for fresh beats.\n" +
			"• `/mc-help`: Need help? I'm here for you.";

		await interaction.reply(helpMessage);
	},
};
