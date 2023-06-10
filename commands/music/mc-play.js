const { SlashCommandBuilder } = require("@discordjs/builders");
const client = require("../../clientInstance");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mc-play")
		.setDescription("Plays a music stream from a YouTube link.")
		.addStringOption((option) =>
			option.setName("url").setDescription("YouTube URL").setRequired(true)
		),
	async execute(interaction) {
		const url = interaction.options.getString("url");
		const guildId = interaction.guild.id;
		const memberVoiceChannel = interaction.member.voice.channel;

		// Check if the user is in a voice channel
		if (!memberVoiceChannel) {
			return await interaction.reply("You need to join a voice channel first!");
		}

		// Get the queue for the guild or create it if it doesn't exist
		let queue = client.player.getQueue(guildId);
		if (!queue) {
			queue = client.player.createQueue(guildId);
		}

		// Join the voice channel
		await queue.join(memberVoiceChannel);

		// Play the song
		await queue.play(url).catch((err) => {
			console.log(err);
			if (!queue) {
				queue.stop();
			}
		});

		await interaction.reply("Playing your song!");
	},
};
