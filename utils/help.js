const commands = [];


commands.push('Here\'s a list of all my commands:');
commands.push('\nYou can send `help [command name]` to get info on a specific command!\n');


module.exports.add = (module, description, usage, hide) => {
	if(hide == true) {return;}
	commands.push(`Command: ${module}\n\tDescription: ${description}\n\tUsage: ${usage}\n`);
};

module.exports.send = (message) => {
	return message.author.send(commands, { split: true, code: 'markdown' })
		.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with all my commands!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
			message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});
};

module.exports.embedhelp = (message) => {
	const helpembed = new require('dicsord.js').RichEmbed()
		.setTitle(' Help Document')
		.setColor('RANDOM')
		.setTitle('HelpDocument for !embed')
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

