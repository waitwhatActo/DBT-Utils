const { Events, EmbedBuilder } = require("discord.js");
const { ids } = require("../index.js");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const tierrole = await member.guild.roles.fetch("1060378062740541562");
		const memberrole = await member.guild.roles.fetch("1023534020249788477");
		member = await member.fetch();

		try {
			member.roles.add(tierrole);
		}
		catch {
			console.log(`Error adding tier role for ${member.user.username}`);
		}
		try {
			member.roles.add(memberrole);
		}
		catch {
			console.log(`Error adding member role for ${member.user.username}`);
		}

		const embed = new EmbedBuilder()
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
			.setTitle("**Member Joined**")
			.setColor(member.user.hexAccentColor ?? "GREEN")
			.setThumbnail(member.user.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
			.addFields([
				{ name: "Account Created", value: `<t:${member.user.createdTimestamp/1000}:F>`, inline: true },
			])
			.setTimestamp()
			.setFooter({ text: `ID: ${member.user.id}` });
		await (member.guild.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
	},
};