const { useMasterPlayer } = require("discord-player");

// commands/mc-play.js
module.exports = {
	name: "mc-play",
	/**
	 * Executes a command to play a track in a voice channel, given an interaction object and a player object.
	 *
	 * @param {Object} interaction - The interaction object that triggered the command.
	 * @param {Object} player - The player object that will play the track.
	 */
	async execute(interaction, player) {
		const channel = interaction.member.voice.channel;
		player = useMasterPlayer();
		if (!channel)
			return interaction.reply(
				"Purrhaps you might want to join a voice channel first?"
			);
		const query = interaction.options.getString("url", true);
		await interaction.deferReply();
		try {
			const { track } = await player.play(channel, query, {
				nodeOptions: {
					metadata: {
						channel: interaction.channel,
						client: interaction.client,
						requestedBy: interaction.user,
					},
					volume: 50,
				},
			});

			await interaction.followUp(
				`**${track.title}** queued up by ${interaction.user}. What a purrfect choice`
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
