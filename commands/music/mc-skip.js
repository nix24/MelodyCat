const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mc-skip")
		.setDescription("Skips the currently playing track."),
	async execute(interaction) {
		// Implement code to skip the currently playing track
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});

		const currentTrack = queue.current;
		const success = queue.skip();

		return void interaction.followUp({
			content: success
				? `✅ | Skipped **${currentTrack}**!`
				: "❌ | Something went wrong!",
		});
	},
};
