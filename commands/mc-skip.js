/**
 * if (interaction.commandName === "mc-skip") {
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
 */

const { useQueue } = require("discord-player");

module.exports = {
	name: "mc-skip",
	/**
	 * Asynchronously executes the interaction passed as an argument to skip the current track.
	 *
	 * @param {Object} interaction - The interaction to be executed.
	 * @return {Promise} A Promise that resolves with no value upon completion.
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
			queue.node.skip();
			await interaction.followUp(
				"Sometimes it's refreshing to skip a song. Let's hear what's next!"
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
