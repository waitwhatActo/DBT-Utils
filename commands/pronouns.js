const { EmbedBuilder, ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	name: "pronouns",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("pronouns")
		.setDescription("Choose a pronouns that you'd like to be called with!"),
	async execute(interaction) {
		const row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("he")
					.setLabel("He/Him")
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("she")
					.setLabel("She/Her")
					.setStyle(ButtonStyle.Danger),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("they")
					.setLabel("They/Them")
					.setStyle(ButtonStyle.Secondary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("clear")
					.setLabel("Clear roles")
					.setStyle(ButtonStyle.Success),
			);
		const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("it")
					.setLabel("It/Its")
					.setStyle(ButtonStyle.Secondary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("any")
					.setLabel("Any Pronouns")
					.setStyle(ButtonStyle.Secondary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("ask")
					.setLabel("Ask for pronouns")
					.setStyle(ButtonStyle.Secondary),
			);

		const embed = new EmbedBuilder()
			.setDescription("**Choose your pronouns**! (Within 15 seconds, 3 times only.)")
			.setColor("Random")
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.avatarURL({ size: 4096, extension: "png" })}` })
			.setTimestamp()
			.setFooter({ text: "Proudly developed and hosted by Acto" });

		const message = await interaction.reply({ embeds: [embed], components: [row1, row2], ephemeral: true });
		const collector = await message.createMessageComponentCollector({
			componentType: 2,
			max: 3,
			maxComponents: 3,
			maxUsers: 3,
			time: 15000,
		});

		const split = interaction.guild.roles.cache.get("1040764357933547568");
		const he = interaction.guild.roles.cache.get("1040764392456859858");
		const she = interaction.guild.roles.cache.get("1040764432848011345");
		const they = interaction.guild.roles.cache.get("1040764452775137320");
		const it = interaction.guild.roles.cache.get("1040764472693903490");
		const any = interaction.guild.roles.cache.get("1040764529367330849");
		const ask = interaction.guild.roles.cache.get("1040764492688142418");

		collector.on("collect", async i => {
			switch (i.customId) {
			case "he": {
				if (!interaction.member.roles.cache.has(split)) {
					try {
						interaction.member.roles.add(split);
					}
					catch {
						i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
						return;
					}
				}
				try {
					interaction.member.roles.add(he);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role given", ephemeral: true });
				break;
			}
			case "she": {
				if (!interaction.member.roles.cache.has(split)) {
					try {
						interaction.member.roles.add(split);
					}
					catch {
						i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
						return;
					}
				}
				try {
					interaction.member.roles.add(she);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role given", ephemeral: true });
				break;
			}
			case "they": {
				if (!interaction.member.roles.cache.has(split)) {
					try {
						interaction.member.roles.add(split);
					}
					catch {
						i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
						return;
					}
				}
				try {
					interaction.member.roles.add(they);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role given", ephemeral: true });
				break;
			}
			case "clear": {
				interaction.member.roles.remove(he);
				interaction.member.roles.remove(she);
				interaction.member.roles.remove(they);
				interaction.member.roles.remove(ask);
				interaction.member.roles.remove(any);
				interaction.member.roles.remove(it);
				i.reply({ content: "Role removed", ephemeral: true });
				break;
			}
			case "it": {
				if (!interaction.member.roles.cache.has(split)) {
					try {
						interaction.member.roles.add(split);
					}
					catch {
						i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
						return;
					}
				}
				try {
					interaction.member.roles.add(it);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role given", ephemeral: true });
				break;
			}
			case "any": {
				if (!interaction.member.roles.cache.has(split)) {
					try {
						interaction.member.roles.add(split);
					}
					catch {
						i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
						return;
					}
				}
				try {
					interaction.member.roles.add(any);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role given", ephemeral: true });
				break;
			}
			case "ask": {
				if (!interaction.member.roles.cache.has(split)) {
					try {
						interaction.member.roles.add(split);
					}
					catch {
						i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
						return;
					}
				}
				try {
					interaction.member.roles.add(ask);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry on contact owner.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role given", ephemeral: true });
				break;
			}
			}
		});
	},

};