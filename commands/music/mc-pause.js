const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mc-pause")
		.setDescription("Pauses the music playback."),
	async execute(interaction) {
		// Implement code to pause the music playback
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});

		const paused = queue.setPaused(true);

		return void interaction.followUp({
			content: paused ? "⏸ | Paused!" : "❌ | Something went wrong!",
		});
	},
};
