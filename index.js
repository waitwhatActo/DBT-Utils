const { IntentsBitField, Client, Collection, Events } = require("discord.js");
const fs = require("node:fs");
const io = require("@pm2/io");
const { token } = require("./config.json");
const { ids } = require("./ids.json");
const bot = new Client({ intents: new IntentsBitField(3276799) });
module.exports = { bot, ids };

io.init({
	// @ts-ignore
	transactions: true,
	http: true,
});
// @ts-ignore
bot.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// @ts-ignore
	bot.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	}
	else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}
// @ts-ignore
bot.on(Events.MessageCreate, async function(message) {
	if (message.author.bot) return;
	if (!message.inGuild()) return;
	if (message.author.equals(bot.user)) return;
	if (!message.content.startsWith("!")) return;
	const args = message.content.substring(1).split(" ");
	switch (args[0].toLowerCase()) {
	case "slowmode": {
		if (!(message.member.id == "428445352354643968" || message.member.id == "933317965024210995")) return message.reply("No perms");
		message.channel.setRateLimitPerUser(parseInt(args[1]));
		message.channel.send(`Slowmode was set to ${args[1]} seconds.`);
		break;
	}
	}
});

bot.login(token);