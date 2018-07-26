const Discord = require('../node_modules/discord.js/src/index.js');;
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