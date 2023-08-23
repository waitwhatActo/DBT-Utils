const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	name: "test",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Test command")
		.setDMPermission(false)
		.setDefaultMemberPermissions(8),
	async execute(interaction) {
		const { ids, bot } = require("../index.js");
		const role = await interaction.guild.roles.cache.get("1040759146485653545");
		const guild = await bot.guilds.cache.get(ids.guild);
		const members = await guild.members.cache.map(member => member.id);

		role.members.forEach(member => {
			member.roles.remove(role);
		});

		/* for (let count = 0; members.length > count; count++) {
			const member = await guild.members.cache.get(members[count]);
			if (member.roles.cache.some(role)) {
				member.roles.remove(role);
			}
		} */
		interaction.channel.send({ content: "Done", ephemeral: true });
	},
};