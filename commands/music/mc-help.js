const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mc-help")
		.setDescription("Shows a list of available commands."),
	async execute(interaction) {
		const helpMessage =
			"Here are the available commands:\n" +
			"• `/mc-play <url>`: Plays a music stream from a YouTube link.\n" +
			"• `/queue`: Shows the current music queue.\n" +
			"• `/skip`: Skips the currently playing track.\n" +
			"• `/pause`: Pauses the music playback.\n" +
			"• `/mc-volume <level>`: Adjusts the volume of the music playback.\n" +
			"• `/mc-playlist-create <name>`: Creates a new playlist.\n" +
			"• `/mc-pl-add <name> <url>`: Adds a track to a playlist.\n" +
			"• `/mc-pl-play <name>`: Plays a playlist.\n" +
			"• `/mc-help`: Shows this help message.";

		await interaction.reply(helpMessage);
	},
};
