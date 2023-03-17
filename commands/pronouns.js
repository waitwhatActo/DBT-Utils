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
			.setDescription("**Choose your pronouns**! (15 seconds, 3 choices per interaction)")
			.setColor("Random")
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.user.avatarURL({ size: 4096, extension: "png" })}` })
			.setTimestamp()
			.setFooter({ text: "Proudly developed and hosted by Acto" });

		const message = await interaction.reply({ embeds: [embed], components: [row1, row2], ephemeral: true });
		try {
			// eslint-disable-next-line no-var
			var collector = message.createMessageComponentCollector({
				componentType: 2,
				max: 3,
				maxComponents: 3,
				maxUsers: 1,
				time: 15000,
			});
		}
		catch {
			interaction.reply({ content: "Failed to create collector, please retry the command. If this is happening consistently, please contact Acto.", ephemeral: true });
			return;
		}

		const split = interaction.guild.roles.cache.get("1040764357933547568");
		const he = interaction.guild.roles.cache.get("1040764392456859858");
		const she = interaction.guild.roles.cache.get("1040764432848011345");
		const they = interaction.guild.roles.cache.get("1040764452775137320");
		const it = interaction.guild.roles.cache.get("1040764472693903490");
		const any = interaction.guild.roles.cache.get("1040764529367330849");
		const ask = interaction.guild.roles.cache.get("1040764492688142418");

		collector.on("collect", async i => {
			if (!interaction.member.roles.cache.has(split)) {
				try {
					interaction.member.roles.add(split);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry or contact Acto.", ephemeral: true });
					return;
				}
			}
			switch (i.customId) {
			case "he": {
				try {
					interaction.member.roles.add(he);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry or contact Acto.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role `@He/Him` was successfully given to you!", ephemeral: true });
				break;
			}
			case "she": {
				try {
					interaction.member.roles.add(she);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry or contact Acto.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role `@She/her` was successfully given to you!", ephemeral: true });
				break;
			}
			case "they": {
				try {
					interaction.member.roles.add(they);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry or contact Acto.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role `@They/Them` was successfully given to you!", ephemeral: true });
				break;
			}
			case "clear": {
				interaction.member.roles.remove(he).catch();
				interaction.member.roles.remove(she).catch();
				interaction.member.roles.remove(they).catch();
				interaction.member.roles.remove(ask).catch();
				interaction.member.roles.remove(any).catch();
				interaction.member.roles.remove(it).catch();
				i.reply({ content: "Role(s) removed successfull!", ephemeral: true });
				break;
			}
			case "it": {
				try {
					interaction.member.roles.add(it);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry or contact Acto.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role `@It/Its` was successfully given to you!", ephemeral: true });
				break;
			}
			case "any": {
				try {
					interaction.member.roles.add(any);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry or contact Acto.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role `@Any` was successfully given to you!", ephemeral: true });
				break;
			}
			case "ask": {
				try {
					interaction.member.roles.add(ask);
				}
				catch {
					i.reply({ content: "Failed to give role, please retry or contact Acto.", ephemeral: true });
					return;
				}
				i.reply({ content: "Role `@Ask` was successfully given to you!", ephemeral: true });
				break;
			}
			}
		});
	},

};