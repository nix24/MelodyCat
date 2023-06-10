const { useQueue } = require("discord-player");

module.exports = {
	name: "mc-clear",
	/**
	 * Executes the clear queue command.
	 *
	 * @param {Object} interaction - The interaction object.
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
			queue.delete();
			await interaction.followUp(
				"Alright, I've tidied up the song queue for you, have fun now"
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
