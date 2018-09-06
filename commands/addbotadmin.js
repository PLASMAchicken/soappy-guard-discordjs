const fs = require('fs');

module.exports.run = (bot, message, args) => {
	const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(kUser) {
		const obj = require(process.cwd() + '/config/botconfig.json');

		obj.botadmins[obj.botadmins.length] = kUser.id;
		fs.writeFile('./config/botconfig.json', JSON.stringify(obj, null, 4), function(err) {
			if(err) console.log(err);
			if(!err) return message.reply(`Added ${kUser} to Bot Admin List!`);
		});
	}
	else {message.channel.send('Specify User!');}
};

module.exports.help = {
	name: 'addbotadmin',
	description: 'Add Bot Admin!',
	usage: 'addbotadmin <@>',
	requires: ['botowner'],
};
