const { Events, EmbedBuilder } = require("discord.js");
const { ids, bot } = require("../index.js");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		
		const bannedmember = [
			"pedophilehunter.com",
			".gg/cloride",
			"pedohunter.com"
			];
			
		for (let i = 0; i < bannedmember.length; i++) {
			member.ban({ reason: "Matched member filter" });
		}
		
		const tierrole = await member.guild.roles.fetch("1060378062740541562");
		const memberrole = await member.guild.roles.fetch("1023534020249788477");
		const membera = await member.fetch();

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
			.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL(), url: `https://discord.com/users/${member.user.id}` })
			.setTitle("**Member Joined**")
			.setColor(membera.user.hexAccentColor ?? "#00FF00")
			.setThumbnail(member.user.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
			.addFields([
				{ name: "Account Created", value: `<t:${Math.round(member.user.createdTimestamp / 1000)}:F>`, inline: true },
			])
			.setTimestamp()
			.setFooter({ text: `User ID: ${member.user.id}`, iconURL: bot.user.displayAvatarURL() });
		await (member.guild.channels.cache.get(ids.channels.mod.log)).send({ embeds: [embed] });
	},
};