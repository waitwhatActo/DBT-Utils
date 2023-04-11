const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
	type: "slash",
	name: "color",
	data: new SlashCommandBuilder()
		.setName("namecolor")
		.setDescription("Set a color for your in-server name!")
		.setDMPermission(false)
		.addStringOption(option =>
			option.setName("color")
				.setDescription("Please enter a HEX color code (without the hashtag). If you don't know what that is, type HELP .")
				.setMaxLength(6)
				.setMinLength(4)
				.setRequired(true)),
	async execute(interaction) {
		const color = await interaction.options.getString("color").toLowerCase();
		if (color == "help") return interaction.reply({ content: "Here's your link to pick a color: https://g.co/kgs/RtvjWy", ephemeral: true });
		if (!interaction.member.roles.cache.has("1040759146485653545")) {
			interaction.member.roles.add("1040759146485653545");
		}

		const embed = new EmbedBuilder()
			.setColor(`#${color}`)
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.member.user.avatarURL({ extension: "png", size: 4096 }) ?? ""}` })
			.setTimestamp()
			.setFooter({ text: "Proudly developed and hosted by Acto" });

		const role = await interaction.guild.roles.cache.find(rolea => rolea.name == `${interaction.member.id}`);
		if (!role) {
			const roleb = await interaction.guild.roles.create({
				name: `${interaction.member.id}`,
				color: `#${color}`,
				hoist: false,
				mentionable: false,
				reason: "Color",
				permissions: new PermissionsBitField(),
			});
			interaction.member.roles.add(roleb);
			embed.setDescription(`Successfully added color ${color} to your name!`);
			interaction.reply({ embeds: [embed], ephemeral: true });
			return;
		}

		if (!interaction.member.roles.cache.has(role)) interaction.member.roles.add(role);

		await interaction.guild.roles.edit(role, {
			name: `${interaction.member.id}`,
			color: `#${color}`,
			hoist: false,
			mentionable: false,
			reason: "Color",
			permissions: new PermissionsBitField(),
		});

		embed.setDescription(`Successfully edited name color to ${color}!`);
		interaction.reply({ embeds: [embed], ephemeral: true });

	},
};