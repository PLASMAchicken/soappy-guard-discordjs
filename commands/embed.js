const Discord = require('discord.js');
const errors = require('../utils/errors.js');
const helper = require('../utils/help.js');
const spliter = require('../utils/split.js');


module.exports.run = (bot, message, args) => {


	if(args[0] == 'help') {
		return helper.embedhelp(message);
	}
	const embed = new Discord.RichEmbed();
	embed.setAuthor(message.author.username, message.author.avatarURL);
	const data = spliter(args);
	for (let i = 0; i < data.length; i++) {
		switch(data[i][0]) {
		case 'title':
			embed.setTitle(data[i][1]);
			break;
		case 'description':
			embed.setDescription(data[i][1]);
			break;
		case 'color':
			embed.setColor(data[i][1]);
			break;
		case 'image':
			embed.setImage(data[i][1]);
			break;
		case 'thumbnail':
			embed.setThumbnail(data[i][1]);
			break;
		case 'url':
			embed.setURL(data[i][1]);
			break;
		case 'footer':
			embed.setFooter(data[i][1], data[i][2]);
			break;
		case 'timestamp':
			embed.setTimestamp(new Date);
			break;
		case 'field':
			if(data[i][1] == '') {
				data[i][1] = 'Title of Field cannot be emtpy';
			}
			if(data[i][2] == '') {
				data[i][2] = 'Description of Field cannot be emtpy';
			}
			embed.addField(data[i][1], data[i][2]);
			break;
		case 'author':
			if (data[i][1] == 'none') {
				if (!message.member.hasPermission('MANAGE_MESSAGES')) {
					return errors.noPerms(message, 'MANAGE_MESSAGES');
				}
				else{
					embed.setAuthor('');
				}
			}
			else if (data[i][1] == 'me') {
				embed.setAuthor(message.author.username, message.author.avatarURL);
			}
			break;
		default:
			embed.addField('ERROR:', '[' + data[i] + '] cannot be resolved! **__USE !embed help__**');
		}
	}
	message.delete();
	message.channel.send(embed);

};

module.exports.help = {
	name: 'embed',
	description: '**__USE !embed help__**',
	usage: 'embed help',
	disableindm: true,
};
