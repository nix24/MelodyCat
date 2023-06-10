const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player, useQueue } = require("discord-player");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
//version discord.js = 14.0.0
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
const player = new Player(client, {
	ytdlOptions: {
		//optimize for speed and audio quality
		quality: "highestaudio",
		filter: "audioonly",
		highWaterMark: 1 << 25,
	},
	queryCache: true,
});
//further optimizing for speed and audio quality

client.commands = new Collection();
// Read all command files in the "commands" directory
const commandFiles = fs
	.readdirSync(path.join(__dirname, "/commands"))
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
(async () => {
	await player.extractors.loadDefault();
})();

player.events.on("playerStart", (queue, track) => {
	const channel = queue.metadata.channel;
	channel.send(`Now playing **${track.title}**!`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction, player);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log("I am ready to play with discord-player!");
});

client.login(process.env.DISCORD_BOT_TOKEN);
