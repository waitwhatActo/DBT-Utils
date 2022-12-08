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
		.addBooleanOption(option =>
			option.setName("private")
				.setDescription("Silently Ban Member")
				.setRequired(true))
		.addStringOption(option =>
			option.setName("reason")
				.setDescription("Reason of ban")
				.setRequired(false))
		.setDefaultMemberPermissions(4),
	async execute(interaction) {
		const member = interaction.options.getMember("member");
		const private = interaction.options.getBoolean("private");
		const reason = interaction.options.get("reason")?.value ?? "not specified";
		try {
			await member.ban({ reason: reason });
		}
		catch {
			interaction.reply({ content: "Failed to ban member, please retry.", ephemeral: true });
		}

		if (private) {
			interaction.reply({ content: `Successfully ban ${member} for **${reason}**.`, ephmeral: true });
		}
		else {
			interaction.reply({ content: `Successfully ban ${member} for **${reason}**.`, ephmeral: true });
			interaction.channel.send(`Successfully ban ${member} for **${reason}**.`);
		}
	},
};