const Discord = require('discord.js');
const errors = require('../utils/errors.js');

module.exports.run = async (bot, message, args, guildConf) => {
	const staffRole = message.guild.roles.find('name', guildConf.adminRole);
	if (!staffRole || !message.member.roles.has(staffRole.id)) return errors.noPerms(message, guildConf.staffRole + 'role');
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
};