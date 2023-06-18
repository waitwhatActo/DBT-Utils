const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	name: "vcactives",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("vc")
		.setDescription("Get the role @VC Active")
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand
				.setName("add")
				.setDescription("Add the role vc active to yourself"),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("remove")
				.setDescription("Remove the role vc active from yourself"),
		),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();
		const member = interaction.member;
		const role = interaction.guild.roles.cache.get("1119851406086643802");

		switch (subcommand) {
		case "add": {
			try {
				await member.roles.add(role);
			}
			catch {
				interaction.reply({ content: "Failed to add role, please retry.", ephemeral: true });
			}
			interaction.reply({ content: `Successfully added the role ${role}.`, ephemeral: true });
			break;
		}
		case "remove": {
			try {
				await member.roles.remove(role);
			}
			catch {
				interaction.reply({ content: "Failed to remove role, please retry.", ephemeral: true });
			}
			interaction.reply({ content: `Successfully removed the role ${role}.`, ephemeral: true });
			break;
		}
		}
	},
};