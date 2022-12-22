const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	name: "tellraw",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("tellraw")
		.setDescription("Send a message in chat as DBT Utils")
		.setDMPermission(false)
		.setDefaultMemberPermissions(8)
		.addStringOption(option =>
			option.setName("message")
				.setDescription("Message you want me to send in chat")
				.setRequired(true))
		.addChannelOption(option =>
			option.setName("channel")
				.setDescription("Channel to send the message in")
				.setRequired(true)),
	async execute(interaction) {
		const message = interaction.options.getString("message");
		const channel = interaction.options.getChannel("channel");
		if (!(message || channel)) {
			interaction.reply({ content: "Missing one parameter", ephemeral: true });
			return;
		}

		channel.send(message);

		interaction.reply({ content: "Message sent", ephemeral: true });
	},
};