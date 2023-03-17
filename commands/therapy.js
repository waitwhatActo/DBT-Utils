const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "therapy",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("therapy")
		.setDescription("Starts a therapy session")
		.addStringOption(option =>
			option.setName("thread_topic")
				.setDescription("Topic of the Therapy Thread")
				.setRequired(true)),
	async execute(interaction) {
		const threadname = await interaction.options.getString("thread_topic");
		const channel = await interaction.guild.channels.fetch("1043600236196667512");
		let thread = undefined;
		try {
			thread = await channel.threads.create({
				name: threadname,
				reason: `Therapy Needed, Created by ${interaction.member.id}`,
				type: ChannelType.PrivateThread,
			});
		}
		catch {
			return interaction.reply({ content: "The bot was not able to create the thread, please try again.", ephemeral: true });
		}
		try {
			thread.join();
		}
		catch {
			thread.delete();
			return interaction.reply({ content: "The bot was not able to join the thread, please try again.", ephemeral: true });
		}

		interaction.reply({ content: `Thread created: <#${thread.id}>`, ephemeral: true });

		const embed = new EmbedBuilder()
			.setAuthor({ iconURL: interaction.user.avatarURL({ size: 4096, extension: "png" }), name: interaction.member.user.username })
			.setDescription(`**This thread was created by <@${interaction.member.id}>. \n\n<@${interaction.member.id}> would like to discuss about ${threadname}`)
			.setTimestamp()
			.setFooter({ text: "Ping your friends to invite them into the conversation; Proudly developed and hosted by Acto" });
		const message = await thread.send({ content: `<@${interaction.member.id}>`, embeds: [embed] });
		message.pin();
	},
};