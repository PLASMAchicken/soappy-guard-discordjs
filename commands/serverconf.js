const Discord = require('discord.js');

module.exports.run = async (bot, message, args, guildConf) => {
	const sEmbed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setTitle('Guild Configuration:')
		.setDescription('```js\n' + require('util').inspect(guildConf) + '\n```');
	message.channel.send(sEmbed);

};

module.exports.help = {
	name: 'serverconfig',
	description: 'Lists ServerConf',
	usage: 'serverconfig',
	disableindm: true,
	aliases: ['sc', 'serverconf', 'sconf'],
	requires: ['staffrole'],
};