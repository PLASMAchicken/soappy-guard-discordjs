const { RichEmbed } = require('discord.js');

module.exports.add = async (reaction, user, bot) => {
	const message = reaction.message;
	if(message.channel.type != 'text') return;
	if (reaction.emoji.name !== '⭐') return;
	if (message.author.id === user.id) {
		reaction.remove(user);
		return message.channel.send(`${user}, you cannot star your own messages.`).then(msg => msg.delete(5000));
	}
	if (message.author.bot) {
		reaction.remove(user);
		return message.channel.send(`${user}, you cannot star bot messages.`).then(msg => msg.delete(5000));
	}
	const { starboardChannel } = bot.guildsettings.get(message.guild.id);
	const starChannel = message.guild.channels.find(channel => channel.name == starboardChannel); if(!starChannel) return;
	let fetch = await starChannel.fetchMessages({ limit: 10 });
	fetch = fetch.filter(m => m.embeds[0] != undefined && m.author.id == bot.user.id);
	const stars = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
	if (stars) {
		const star = /^⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
		const foundStar = stars.embeds[0];
		const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
		const embed = new RichEmbed()
			.setColor(foundStar.color)
			.setDescription(foundStar.description)
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp()
			.setFooter(`⭐ ${parseInt(star[1]) + 1} | ${message.id}`)
			.setImage(image);
		const starMsg = await starChannel.fetchMessage(stars.id);
		await starMsg.edit({ embed });
	}
	if (!stars) {
		const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
		if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`);
		const embed = new RichEmbed()
			.setColor(15844367)
			.setDescription(message.cleanContent)
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp(new Date())
			.setFooter(`⭐ 1 | ${message.id}`)
			.setImage(image);
		await starChannel.send({ embed });
	}
};
module.exports.remove = async (reaction, user, bot) => {
	const message = reaction.message;
	if (message.author.id === user.id) return;
	if (reaction.emoji.name !== '⭐') return;
	const { starboardChannel } = bot.guildsettings.get(message.guild.id);
	const starChannel = message.guild.channels.find(channel => channel.name == starboardChannel); if(!starChannel) return;
	let fetch = await starChannel.fetchMessages({ limit: 10 });
	fetch = fetch.filter(m => m.embeds[0] != undefined);
	const stars = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
	if (stars) {
		const star = /^⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
		const foundStar = stars.embeds[0];
		const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
		const embed = new RichEmbed()
			.setColor(foundStar.color)
			.setDescription(foundStar.description)
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp()
			.setFooter(`⭐ ${parseInt(star[1]) - 1} | ${message.id}`)
			.setImage(image);
		const starMsg = await starChannel.fetchMessage(stars.id);
		await starMsg.edit({ embed });
		if(parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
	}
};

// Here we add the this.extension function to check if there's anything attached to the message.
function extension(reaction, attachment) {
	const imageLink = attachment.split('.');
	const typeOfImage = imageLink[imageLink.length - 1];
	const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
	if (!image) return '';
	return attachment;
}
