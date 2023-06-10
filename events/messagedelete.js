const { Events, EmbedBuilder } = require("discord.js");
const { bot, ids } = require("../index.js");

module.exports = {
	name: Events.MessageDelete,
	async execute(message) {
		if (message.channel.id == "1116868202224435291") return;
		const embed = new EmbedBuilder()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL(), url: `https://discord.com/users/${message.author.id}` })
			.setColor(0xFF0000)
			.setTitle("**Message Deleted**")
			.setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**`)
			.addFields([
				{ name: "Message", value: `\`\`\`${message.content ?? "Message did not contain text."}\`\`\`` },
				{ name: "Message ID", value: `${message.id}` },
				{ name: "Sent At", value: `<t:${Math.round(message.createdTimestamp / 1000)}:F>` },
				{ name: "Deleted At", value: `<t:${Math.round(new Date().getTime() / 1000)}:F>` },
			])
			.setFooter({ text: `User ID: ${message.author.id}`, iconURL: bot.user.displayAvatarURL() })
			.setTimestamp();
		await (message.guild.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
	},
};