const { Events, ActivityType } = require("discord.js");
const { bot } = require("../index.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute() {
		console.log("Bot is ready");
		bot.user.setPresence({ status: "online", activities: [{ type: ActivityType.Playing, name: "with Acto (Proudly developed and hosted by Acto)" }] });
	},
};