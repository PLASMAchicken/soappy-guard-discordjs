const helpembed = require('../utils/help.js');

module.exports.run = async (bot, message) => {
	helpembed.send(message);
};

module.exports.help = {
	name: 'help',
	description: 'Shows Help Page',
	usage: 'help',
};
