const errors = require(process.cwd() + '/utils/errors.js');

module.exports.run = async (bot, message, args) => {
	message.delete();
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPerms(message, 'MANAGE_MESSAGES');
	const botmessage = args.join(' ');
	message.channel.send(botmessage);
};

module.exports.help = {
	name: 'say',
	description: 'let the bot say something funny',
	usage: 'say <TXT>',
	disableindm: true,
	requires: ['staffrole'],
};
