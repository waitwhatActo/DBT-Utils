const { Events, EmbedBuilder } = require("discord.js");
const { bot, ids } = require("../index.js");

module.exports = {
	name: Events.GuildMemberRemove,
	async execute(member) {
		const embed = new EmbedBuilder()
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL(), url: `https://discord.com/users/${member.user.id}` })
			.setColor("#FF0000")
			.setTitle("**Member Left**")
			.addFields([
				{ name: "Account Created", value: `<t:${Math.round(member.user.createdTimestamp / 1000)}:F>`, inline: true },
				{ name: "Joined Server", value: `<t:${Math.round(member.joinedTimestamp / 1000)}:F>`, inline: true },
			])
			.setTimestamp()
			.setThumbnail(member.user.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
			.setFooter({ text: `ID: ${member.user.id}`, iconURL: bot.user.displayAvatarURL() });
		await (member.guild.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
	},
};