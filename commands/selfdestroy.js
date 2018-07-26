const Discord = require('../node_modules/discord.js/src/index.js');
const split = require('../utils/split.js');


module.exports.run = async (bot, message, args) => {

	const data = split(args);
	const embed = new Discord.MessageEmbed();
	embed.setAuthor(message.author.username, message.author.avatarURL);
	let time;
	for (let i = 0; i < data.length; i++) {
		switch(data[i][0]) {
		case 'time':
			time = data[i][1] * 1000;
			if(time < 6000) {time = 6000;}
			if(time > 20000) {time = 20000;}
			embed.setFooter(`MESSAGE WILL SELF DESTRUCT IN ${time / 1000} SECONDS!`);
			break;
		case 'text':
			embed.setDescription(data[i][1]);
			break;
		default:
			embed.addField('ERROR:', '[' + data[i] + '] cannot be resolved!');
		}
	}
	if(!time) {return message.reply('Add time=3 for 3 seconds');}
	message.delete();
	message.channel.send(embed)
		.then(msg => {
			msg.delete(time);
		})
	;
};

module.exports.help = {
	name:'selfdestroy',
	description: 'selfdestroy',
	hideinhelp: false,
	usage: 'selfdestroy time=3 | text=<msg>',
	disableindm: true,
	aliases: ['sd'],
};