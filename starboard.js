const { RichEmbed } = require('discord.js');

module.exports.add = async (reaction, user, bot) => {
	const message = reaction.message;
	if (reaction.emoji.name !== '⭐') return;
	if (message.author.id === user.id) return message.channel.send(`${user}, you cannot star your own messages.`);
	if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`);
	const { starboardChannel } = bot.guildsettings.get(message.guild.id);
	const fetch = await message.guild.channels.find('name', starboardChannel).fetchMessages({ limit: 10 });
	const stars = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
	if (stars) {
		const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
		const foundStar = stars.embeds[0];
		const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
		const embed = new RichEmbed()
			.setColor(foundStar.color)
			.setDescription(foundStar.description)
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp()
			.setFooter(`⭐ ${parseInt(star[1]) + 1} | ${message.id}`)
			.setImage(image);
		const starMsg = await message.guild.channels.find('name', starboardChannel).fetchMessage(stars.id);
		await starMsg.edit({ embed });
	}
	if (!stars) {
		if (!message.guild.channels.exists('name', starboardChannel)) throw `It appears that you do not have a \`${starboardChannel}\` channel.`;
		const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
		if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`);
		const embed = new RichEmbed()
			.setColor(15844367)
			.setDescription(message.cleanContent)
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp(new Date())
			.setFooter(`⭐ 1 | ${message.id}`)
			.setImage(image);
		await message.guild.channels.find('name', starboardChannel).send({ embed });
	}
};
module.exports.remove = async (reaction, user, bot) => {
	const message = reaction.message;
	if (reaction.emoji.name !== '⭐') return;
	const { starboardChannel } = bot.guildsettings.get(message.guild.id);
	const fetch = await message.guild.channels.find('name', starboardChannel).fetchMessages({ limit: 10 });
	const stars = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
	if (stars) {
		const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
		const foundStar = stars.embeds[0];
		const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
		const embed = new RichEmbed()
			.setColor(foundStar.color)
			.setDescription(foundStar.description)
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp()
			.setFooter(`⭐ ${parseInt(star[1]) - 1} | ${message.id}`)
			.setImage(image);
		const starMsg = await message.guild.channels.find('name', starboardChannel).fetchMessage(stars.id);
		await starMsg.edit({ embed });
	}
};

// Here we add the this.extension function to check if there's anything attached to the message.
function extension(reaction, attachment) {
	const imageLink = attachment.split('.');
	const typeOfImage = imageLink[imageLink.length - 1];
	const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
	if (!image) return '';
	return attachment;
};
