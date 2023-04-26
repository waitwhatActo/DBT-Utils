const { Events, EmbedBuilder, AuditLogEvent } = require("discord.js");
const { bot, ids } = require("../index.js");

module.exports = {
	name: Events.GuildAuditLogEntryCreate,
	async execute(auditLog) {
		const { action, executorId, targetId } = auditLog;
		const executor = await bot.users.cache.get(executorId);
		const target = await bot.users.cache.get(targetId);
		switch (action) {
		case AuditLogEvent.MemberBanAdd: {
			const embed = new EmbedBuilder()
				.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL() })
				.setColor("#FF0000")
				.setTitle("**Member Banned**")
				.addFields([
					{ name: "Responsible Moderator", value: `<@${executor.id}>`, inline: true },
					{ name: "Reason", value: auditLog.reason ?? "No reason provided.", inline: true },
					{ name: "Ban Time", value: `<t:${Math.round(auditLog.createdAt / 1000)}:F>`, inline: false },
					{ name: "Account Created", value: `<t:${Math.round(target.createdTimestamp / 1000)}:F>`, inline: true },
					// { name: "Joined Server", value: `<t:${Math.round(target.joinedTimestamp / 1000)}:F>`, inline: true },
				])
				.setTimestamp()
				.setThumbnail(target.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
				.setFooter({ text: `ID: ${target.id}`, iconURL: bot.user.displayAvatarURL() });
				// @ts-expect-error 1
			await (bot.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
			break;
		}
		case AuditLogEvent.MemberBanRemove: {
			const embed = new EmbedBuilder()
				.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL() })
				.setColor("#00FF00")
				.setTitle("**Member Unbanned**")
				.addFields([
					{ name: "Responsible Moderator", value: `<@${executor.id}>`, inline: true },
					{ name: "Unban Time", value: `<t:${Math.round(auditLog.createdAt / 1000)}:F>`, inline: false },
					{ name: "Account Created", value: `<t:${Math.round(target.createdTimestamp / 1000)}:F>`, inline: true },
				])
				.setTimestamp()
				.setThumbnail(target.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
				.setFooter({ text: `ID: ${target.id}`, iconURL: bot.user.displayAvatarURL() });
			// @ts-expect-error 1
			await (bot.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
			break;
		}
		case AuditLogEvent.MemberKick: {
			const embed = new EmbedBuilder()
				.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL() })
				.setColor("#FF0000")
				.setTitle("**Member Kicked**")
				.addFields([
					{ name: "Responsible Moderator", value: `<@${executor.id}>`, inline: true },
					{ name: "Reason", value: auditLog.reason ?? "No reason provided.", inline: true },
					{ name: "Kick Time", value: `<t:${Math.round(auditLog.createdAt / 1000)}:F>`, inline: false },
					{ name: "Account Created", value: `<t:${Math.round(target.createdTimestamp / 1000)}:F>`, inline: true },
				// { name: "Joined Server", value: `<t:${Math.round(target.joinedTimestamp / 1000)}:F>`, inline: true },
				])
				.setTimestamp()
				.setThumbnail(target.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
				.setFooter({ text: `ID: ${target.id}`, iconURL: bot.user.displayAvatarURL() });
			// @ts-expect-error 1
			await (bot.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
			break;
		}
		}
	},
};