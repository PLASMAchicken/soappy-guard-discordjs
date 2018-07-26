const Discord = require('discord.js');
module.exports.run = (bot, message, args, guildConf) => {
	const embed = new Discord.MessageEmbed()
		.addField('Global Prefix', '```' + bot.defaultguildsettings.prefix + '```\nor\n```@' + bot.user.tag + '```')
		.addField('Channel Prefix', '```' + guildConf.prefix + '```');
	message.channel.send(embed);
};


module.exports.help = {
	name: 'prefix',
	description: 'Shows the current prefix!',
	usage: 'prefix',
};