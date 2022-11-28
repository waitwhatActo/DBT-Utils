const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	type: "slash",
	name: "kick",
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Kick a member")
		.setDMPermission(false)
		.addUserOption(option =>
			option.setName("member")
				.setDescription("Member to kick")
				.setRequired(true))
		.setDefaultMemberPermissions(2)
		.addBooleanOption(option =>
			option.setName("private")
				.setDescription("Secretly kick")
				.setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember("member");
		const private = interaction.options.getBoolean("private");
		try {
			member.kick();
		}
		catch {
			interaction.reply({ content: "Failed to kick member, please retry.", ephemeral: true });
		}

		interaction.reply({ content: `Successfully kicked ${member}.`, ephmeral: private });
	},
};