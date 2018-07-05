const Discord = require('discord.js');
const botconfig = require('../config/botconfig.json');
const colorer = require('../config/color.json');
const fs = require('fs');


const helpembed = new Discord.RichEmbed();
helpembed.setTitle(' Help Document');
helpembed.setColor(colorer.help);

module.exports.add = (module, description, hide) => {
	if(hide == true) {return;}
	helpembed.addField(module, description);
};

module.exports.send = (message) => {
	message.channel.send(helpembed);
};

module.exports.embedhelp = (message) => {

	helpembed.setTitle('HelpDocument for !embed')
		.setDescription('Usage: !embed cmd1=arg1 | cmd2=arg1=arg2 | cmd3=arg1=arg2=arg3 \nCan be mixed! \nLike !embed description=something | field=sometitle=somedesc | title=Main Title')
		.addBlankField()
		.addField('title=title', 'Defines the Title!')
		.addField('description=description', 'Defines the Description!')
		.addField('field=title=description', 'Adds Field with Title and Description!')
		.addField('url=url', 'Defines the url')
		.addField('thumbnail=url', 'Defines the url of thumbnail')
		.addField('image=url', 'Defines the url of the main image')
		.addField('author=none/me', 'Defines the author')
		.addField('color=HEXCOLOR', 'Defines the color')
		.addField('timestamp', 'Adds timestamp to footer')
		.addField('footer=text=url', 'Defines the footer img and text');


	message.channel.send(helpembed);
};

