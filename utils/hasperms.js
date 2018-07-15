const botconfig = require('../config/botconfig.json');

module.exports.owner = (user, message) => {
	for (let i = 0; i < botconfig.botowners.length; i++) {
		if (botconfig.botowners[i] === user.id) return true;
	}
	if (message) message.channel.send('Boi this is only for ma Owna!');
	return false;
};

module.exports.admin = (user, message) => {
	for (const admin of botconfig.botadmins) {
		if (admin === user.id) return true;
	}
	for (const owner of botconfig.botowners) {
		if (owner === user.id) return true;
	}
	if (message) message.channel.send('Boi this is only for ma Owna or Admins!');
	return false;
};