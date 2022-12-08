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

		const thread = await channel.threads.create({
			name: threadname,
			reason: `Therapy Needed, Created by ${interaction.member.id}`,
			type: ChannelType.PrivateThread,
		});
		await thread.join();

		interaction.reply({ content: `Thread created: <#${thread.id}>`, ephemeral: true });

		const embed = new EmbedBuilder()
			.setAuthor({ iconURL: interaction.member.avatarURL({ size: 4096, extension: "png" }), name: interaction.member.nickname })
			.setDescription(`**This thread was created by <@${interaction.member.id}>. \n\nPlease try and ensure the thread is about ${threadname}.**`)
			.setTimestamp()
			.setFooter({ text: "Ping people you want to join; Proudly developed and hosted by Acto" });
		thread.send({ embeds: [embed], allowedMentions: false });
	},
};