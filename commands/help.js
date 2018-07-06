const helpembed = require('../utils/help.js');
const ms = require('ms');

module.exports.run = (bot, message, args, guildConf) => {
	if(!args.length) return helpembed.send(message);
	const command = bot.commands.get(args.join(' ').toLowerCase());
	if (!command) return message.reply('that\'s not a valid command!');
	const helpcmd = [];
	helpcmd.push(`**Name:** ${command.help.name}`);

	// if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
	if (command.help.description) helpcmd.push(`**Description:** ${command.help.description}`);
	if (command.help.usage) helpcmd.push(`**Usage:** ${guildConf.prefix}${command.help.usage}`);
	let cooldown;
	if(command.help.cooldown) {
		cooldown = ms(ms(command.help.cooldown, { long: true }));
	}
	else{
		cooldown = ms(5000);
	}
	helpcmd.push(`**Cooldown:** ${cooldown}`);

	message.channel.send(helpcmd, { split: true });

};

module.exports.help = {
	name: 'help',
	description: 'Shows Help Page',
	usage: 'help',
};
