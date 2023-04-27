const { Events, EmbedBuilder } = require("discord.js");
const { bot, ids } = require("../index.js");

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(oldMember, newMember) {
		const embed = new EmbedBuilder()
			.setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL(), url: `https://discord.com/users/${newMember.user.id}` })
			.setURL(`https://discord.com/users/${newMember.user.id}`)
			.setColor("Random")
			.setTitle("**Member Updated**")
			.setFooter({ text: `User ID: ${newMember.user.id}`, iconURL: bot.user.displayAvatarURL() })
			.setTimestamp();
		const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
		if (removedRoles.size > 0) {
			embed.setDescription(`**Role(s) removed from ${newMember}**`).addFields([{ name: "Roles", value: `${removedRoles.map(r => r.name)}` }]);
		}
		const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
		if (addedRoles.size > 0) {
			embed.setDescription(`**Role(s) added to ${newMember}**`).addFields([{ name: "Roles", value: `${addedRoles.map(r => r.name)}` }]);
		}
		if (oldMember.nickname != newMember.nickname) {
			embed.setDescription(`**Nickname changed for ${newMember}**`).addFields([{ name: "Nickname", value: `${oldMember.nickname} -> ${newMember.nickname}` }]);
		}
		if (oldMember.communicationDisabledUntilTimestamp != newMember.communicationDisabledUntilTimestamp) {
			if (newMember.communicationDisabledUntilTimestamp == null) {
				embed.setDescription(`**${newMember} unmuted**`).setColor(0x00FF00);
			}
			else {
				embed.setDescription("**Member muted**").setColor(0xFF0000).addFields([{ name: "Muted Until", value: `<t:${Math.round(newMember.communicationDisabledUntilTimestamp / 1000)}:F>` }]);
			}
		}
		await (newMember.guild.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
	},
};