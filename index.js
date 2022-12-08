const { IntentsBitField, Client, Collection, ActivityType } = require("discord.js");
const fs = require("node:fs");
const io = require("@pm2/io");
const { token } = require("./config.json");
const bot = new Client({ intents: new IntentsBitField(3276799) });

bot.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

io.init({
	// @ts-ignore
	transactions: true,
	http: true,
});

bot.once("ready", async () => {
	console.log("Bot is ready");
	bot.user.setPresence({ status: "online", activities: [{ type: ActivityType.Playing, name: "with Acto (Proudly developed and hosted by Acto)" }] });
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}

bot.on("interactionCreate", async function(interaction) {
	if (!(interaction.isCommand() || interaction.isButton() || interaction.isContextMenuCommand() || interaction.isSelectMenu() || interaction.isMessageContextMenuCommand())) return;
	if (!interaction.inGuild()) return;
	// @ts-ignore
	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});
// @ts-ignore
bot.on("messageCreate", async function(message) {
	if (message.author.bot) return;
	if (!message.inGuild()) return;
	if (message.author.equals(bot.user)) return;
	if (!message.content.startsWith("!")) return;
	const args = message.content.substring(1).split(" ");
	switch (args[0].toLowerCase()) {
	case "slowmode": {
		if (!(message.member.id == "428445352354643968" || message.member.id == "710272856772050994")) return message.reply("No perms");
		message.channel.setRateLimitPerUser(parseInt(args[1]));
		message.channel.send(`Slowmode was set to ${args[1]} seconds.`);
		break;
	}
	}
});

bot.login(token);