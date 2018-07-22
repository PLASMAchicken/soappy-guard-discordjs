const botconfig = require('../config/botconfig.json');
const errors = require('../utils/errors.js'); // Error Handler

module.exports = (bot, notify, err) => {
	botconfig[notify].forEach(tonotify => {
		bot.users.fetchUser(tonotify).then((dm) => errors.dm(dm, err)).catch(err => {
			console.error(`${tonotify} could not been notified because of ${err}!`);
			throw process.exit();
		});
	});
};