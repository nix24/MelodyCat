/**
 * if (interaction.commandName === "mc-pause") {
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
 */

const { useQueue } = require("discord-player");

module.exports = {
	name: "mc-pause",
	/**
	 * Asynchronous function to toggle pause/play of the music player.
	 *
	 * @param {Interaction} interaction - the interaction that triggered the function
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
			queue.node.setPaused(!queue.node.isPaused()); //isPaused() returns true if that player is already paused
			//interaction.followUp changes based on whether the player is paused or not
			await interaction.followUp(
				queue.node.isPaused()
					? "Taking a short catNap, music is paused."
					: "Back to the melody, music is resumed!"
			);
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
