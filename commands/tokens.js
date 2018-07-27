const Discord = require('discord.js');

module.exports.run = (bot, message) => {
	const user = message.mentions.users.first() || message.author;
	const userdata = bot.userdata.get(user.id) || {};
	const embed = new Discord.RichEmbed()
		.setAuthor(user.tag, user.displayAvatarURL)
		.setFooter(`You currently have ${userdata.tokens} Tokens`);
	bot.userdata.set(message.author.id, userdata);
	message.channel.send(embed);
};
module.exports.help = {
	name: 'tokens',
	description: 'See your tokens',
	usage: 'tokens <|@>',
	cooldown: '3s',
};

