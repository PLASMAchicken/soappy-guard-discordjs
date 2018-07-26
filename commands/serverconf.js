const Discord = require('../node_modules/discord.js/src/index.js');

module.exports.run = async (bot, message, args, guildConf) => {
	const sEmbed = new Discord.MessageEmbed()
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