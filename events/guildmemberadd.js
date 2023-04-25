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
			.setColor(member.user.hexAccentColor ?? 0x00FF00)
			.setDescription("**Member Joined**")
			.setThumbnail(member.user.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
			.addFields([
				{ name: "Account Created", value: `<t:${member.user.createdTimestamp}:F>`, inline: true },
			])
			.setTimestamp()
			.setFooter({ text: `ID: ${member.user.id}` });
		member.guild.channels.fetch(ids.channels.mod.log).send({ embeds: [embed] });
	},
};