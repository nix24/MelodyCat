/**
 * if (interaction.commandName === "mc-loop") {
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
// 		switch (interaction.options.getString("mode")) {
// 			case "off":
// 				queue.setRepeatMode(0);
// 				break;
// 			case "track":
// 				queue.setRepeatMode(1);
// 				break;
// 			case "queue":
// 				queue.setRepeatMode(2);
// 				break;
// 			default:
// 				await interaction.followUp("Invalid loop mode!");
// 				break;
// 		}
// 		await interaction.followUp(
// 			`Loop mode set to ${interaction.options.getString("mode")}`
// 		);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.followUp({
// 			content: "There was an error while executing this command!",
// 			ephemeral: true,
// 		});
// 	}
// }

const { useQueue } = require("discord-player");

module.exports = {
	name: "mc-loop",
	/**
	 * asynchronous function to execute the command to set the loop mode
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
				content:
					"Oops, it seems like I tripped over some spaghetti code. Could you wait a bit before you try that command again?",
				ephemeral: true,
			});
		}
	},
};
