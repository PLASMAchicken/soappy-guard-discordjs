const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const user = message.mentions.users.first() || bot.users.get(args[0]) || message.author;
	const warnembed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setTitle(user.tag + '\'s warns:');
	const warns = bot.userdata.get(user.id).warns;
	for(const key in warns) {
		warnembed.addField(key, warns[key], true);
	}

	message.channel.send(warnembed);

};


module.exports.help = {
	name: 'warns',
	description: 'check your warns',
	usage: 'warns <@>',
};