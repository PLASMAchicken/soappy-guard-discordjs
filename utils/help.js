const commands = [];


commands.push('Here\'s a list of all my commands:');
commands.push('\nYou can send `help [command name]` to get info on a specific command!\n');


module.exports.add = (props) => {
	if(props.help.hideinhelp == true) {return;}
	commands.push(`**Command: ${props.help.name}**\n${props.help.description ? `\tDescription: ${props.help.description}\n` : '' }${props.help.usage ? `\tUsage: ${props.help.usage}\n` : '' }${props.help.aliases ? `\tAliases: ${props.help.aliases.join(', ')}\n` : '' }`);
};

module.exports.send = (message) => {
	return message.author.send(commands, { split: { char: '\n\n' } })
		.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with all my commands!');
		})
		.catch(error => {
			message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
			if(error.code != 50007) throw new Error(`Could not send help DM to ${message.author.tag}.\n` + error);
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

