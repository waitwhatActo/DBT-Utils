const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const tierrole = await member.guild.roles.fetch("1060378062740541562");
		const memberrole = await member.guild.roles.fetch("1023534020249788477");

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
	},
};