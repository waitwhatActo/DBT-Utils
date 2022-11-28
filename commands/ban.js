const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	type: "slash",
	name: "ban",
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a member")
		.setDMPermission(false)
		.addUserOption(option =>
			option.setName("member")
				.setDescription("Member to ban")
				.setRequired(true))
		.setDefaultMemberPermissions(4)
		.addBooleanOption(option =>
			option.setName("private")
				.setDescription("Secretly ban")
				.setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember("member");
		const private = interaction.options.getBoolean("private");
		try {
			member.ban();
		}
		catch {
			interaction.reply({ content: "Failed to ban member, please retry.", ephemeral: true });
		}

		interaction.reply({ content: `Successfully ban ${member}.`, ephmeral: private });
	},
};