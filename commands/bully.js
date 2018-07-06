const ms = require('ms');
const errors = require('../utils/errors.js');
const config = require('../config/botconfig.json');

module.exports.run = (bot, message, args, guildConf) => {
	try {
		const time = guildConf.bullytime;
		const tobully = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!tobully) return errors.cantfindUser(message, args[0]);
		args.shift();
		tobully.oldnickname = tobully.displayName;
		tobully.tempnickname = args.join(' ');
		tobully.setNickname(tobully.tempnickname, 'Temp Nick Change');
		message.channel.send(`${tobully.oldnickname} is now ${tobully.tempnickname} for ${ms(ms(time))}`);
		setTimeout(function() {
			tobully.setNickname(tobully.oldnickname);
			message.channel.send(`${tobully.tempnickname} is now ${tobully.oldnickname} again!`);
		}, ms(time));

	}
	catch (err) {
		errors.err(message, err);
	}

};

module.exports.help = {
	name: 'bully',
	description: 'Change somebodys nick for a short time',
	usage: 'bully <@> <new name>',
	disableindm: true,
};
