const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mc-queue")
		.setDescription("Shows the current music queue."),
	async execute(interaction) {
		//code to execute when command is ran
	},
};
