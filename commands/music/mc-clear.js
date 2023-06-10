const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mc-clear")
		.setDescription("Clears all songs from the music queue."),
	async execute(interaction) {
		// Implement code to clear all songs from the music queue
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});

		const success = queue.clear();

		return void interaction.followUp({
			content: success ? `✅ | Cleared!` : "❌ | Something went wrong!",
		});
	},
};
