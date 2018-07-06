module.exports.run = (bot, message) => {
	message.reply('Here ya go!');
};
module.exports.help = {
	name: 'daily',
	description: 'get ya daily',
	usage: 'daily',
	hideinhelp: true,
	cooldown: '1d',
};

