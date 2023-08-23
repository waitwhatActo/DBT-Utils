const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	name: "color",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("color")
		.setDescription("Set a color for your nickname")
		.setDMPermission(false)
		.addStringOption(option =>
			option.setName("test-a-members-only")
				.setMaxLength(6)
				.setMinLength(6)
				.setDescription("The color you want your name to be (Hex code)")
				.setRequired(false)),
	async execute(interaction) {
		const { bot } = require("../index.js");
		if (interaction.member.roles.cache.has("1124924940878090302")) {
			if (!interaction.member.roles.cache.has("1040759146485653545")) {
				interaction.member.roles.add("1040759146485653545");
			}
			const color = interaction.options.getString("test-a-members-only");
			if (!color) return interaction.reply({ content: "You did not specify a color!", ephemeral: true });
			const embed = new EmbedBuilder()
				.setDescription(`Your name color has been set to ${color}!`)
				.setColor(color)
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
				.setFooter({ text: "DBT Utils da best", iconURL: bot.user.displayAvatarURL() });
			if (interaction.guild.roles.cache.has(role => role.name == interaction.member.id)) {
				await interaction.guild.roles.cache.find(role => role.name == interaction.member.id).setColor(color);
			}
			else {
				await interaction.guild.roles.create({
					name: interaction.member.id,
					color: color,
				});
				await interaction.member.roles.add(interaction.guild.roles.cache.find(role => role.name == interaction.member.id));
			}
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
		else {
			const embed = new EmbedBuilder()
				.setDescription("**Choose a color from the list below!**")
				.setColor("Random")
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
				.setFooter({ text: "DBT Utils da best", iconURL: bot.user.displayAvatarURL() });
			const row1 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId("red")
						.setLabel("Red")
						.setStyle(ButtonStyle.Danger),
					new ButtonBuilder()
						.setCustomId("orange")
						.setLabel("Orange")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId("yellow")
						.setLabel("Yellow")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId("green")
						.setLabel("Green")
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId("blue")
						.setLabel("Blue")
						.setStyle(ButtonStyle.Primary),
				);
			const row2 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId("purple")
						.setLabel("Purple")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId("pink")
						.setLabel("Pink")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId("brown")
						.setLabel("Brown")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId("black")
						.setLabel("Black")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId("white")
						.setLabel("White")
						.setStyle(ButtonStyle.Secondary),
				);
			await interaction.reply({ embeds: [embed], components: [row1, row2], ephermeral: true });
			const filter = i => i.user.id === interaction.user.id;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
			const colors = [ "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Black", "White" ];
			collector.on("collect", async i => {
				if (!interaction.member.roles.cache.has("1143711771497074740")) {
					await interaction.member.roles.add("1143711771497074740");
					return;
				}
				colors.forEach(async color => {
					const role = await interaction.guild.roles.cache.find(a => a.name == color);
					if (interaction.member.roles.cache.has(role.id)) {
						await interaction.member.roles.remove(role.id);
					}
				});
				try {
					const role = await interaction.guild.roles.cache.find(a => a.name == (i.customId.charAt(0).toUpperCase() + i.customId.slice(1)));
					await interaction.member.roles.add(role.id);
				}
				catch (ex) {
					console.log(ex);
					await interaction.followUp({ content: "Failed to add role, please retry.", ephemeral: true });
					return;
				}
				await interaction.followUp({
					content: `You have changed your name color to ${i.customId.charAt(0).toUpperCase() + i.customId.slice(1) }.`, ephemeral: true });
			});
			collector.on("end", async collected => {
				if (collected.size === 0) {
					await interaction.followUp({ content: "You did not choose a color in time!" });
				}
			},
			);
		}
	},
};