const { EmbedBuilder, Events } = require("discord.js");
const { bot, ids } = require("../index.js");

module.exports = {
	name: Events.MessageUpdate,
	async execute(oldMessage, newMessage) {
		if (newMessage.content == oldMessage.content) return;
		if (newMessage.channel.id == "1116868202224435291") return;
		const embed = new EmbedBuilder()
			.setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL(), url: `https://discord.com/users/${newMessage.author.id}` })
			.setColor("Random")
			.setTitle("**Message Edited**")
			.setURL(newMessage.url)
			.setDescription(`**Message sent by ${newMessage.author} edited in ${newMessage.channel}**`)
			.addFields([
				{ name: "Old Message", value: `${oldMessage.content ?? "No content"}`, inline: true },
				{ name: "New Message", value: `${newMessage.content ?? "No content"}`, inline: true },
			])
			.setFooter({ text: `User ID: ${newMessage.author.id}`, iconURL: bot.user.displayAvatarURL() })
			.setTimestamp();
		await (oldMessage.guild.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
	},
};