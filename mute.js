const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { bot, ids } = require("../index.js");

module.exports = {
	name: "mute",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Mute or unmute a member")
		.setDefaultMemberPermissions(4)
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand.setName("mute")
				.setDescription("Mute a member (28 days max, or if no duration is specified)")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to mute")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason of mute")
						.setRequired(false))
				.addStringOption(option =>
					option.setName("duration")
						.setDescription("Duration of mute (28 days max)")
						.setRequired(false)))
		.addSubcommand(subcommand =>
			subcommand.setName("unmute")
				.setDescription("Unmute a member")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to unmute")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason of unmute")
						.setRequired(false))),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();
		const member = interaction.options.getMember("member");
		const reason = interaction.options.get("reason")?.value ?? "not specified";
		const duration = interaction.options.get("duration")?.value ?? "not specified";
		const muteRole = interaction.guild.roles.cache.get(ids.roles.mute);

		switch (subcommand) {
		case "mute": {
			try {
				await member.timeout(duration, reason);
				await member.roles.add(muteRole, { reason: reason });
			}
			catch {
				await member.timeout(duration, reason);
				interaction.reply({ content: "Failed to mute member, please retry.", ephemeral: true });
			}
			interaction.reply({ content: `Successfully muted ${member} for **${duration}** for **${reason}**.`, ephemeral: true });
			interaction.channel.send(`${member} was muted for **${duration}** for **${reason}**.`);
			break;
		}
		case "unmute": {
			break;
		}
		}
	},
};