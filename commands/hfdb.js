const Discord = require('discord.js');
const fs = require('fs');
const errors = require('../utils/errors.js');

module.exports.run = async (bot, message, args) => {
	if(args[0] == 'edit') {
		args.shift();
		const key = args.shift();
		const value = args.join(' ');
		bot.guilds.forEach(guild => {
			const guildConf = bot.guildsettings.get(guild.id) || bot.defaultguildsettings;
			guildConf[key] = value;

			bot.guildsettings.set(guild.id, guildConf);
		});
		bot.defaultguildsettings[key] = value;
		const exporter = `module.exports = defaultSettings = ${JSON.stringify(bot.defaultguildsettings, null, 2)}`;
		fs.writeFileSync('./config/defaultguildsettings.js', exporter, 'utf-8');

		const sEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`${args.join(' ')} set!`)
			.setDescription(`GlobalGuild configuration item \`${key}\` has been changed to:\n\`\`\`js\n${value}\n\`\`\``);
		message.channel.send(sEmbed);
	}
	else if(args[0] == 'delete') {
		args.shift();
		const key = args.join(' ');
		bot.guilds.forEach(guild => {
			const guildConf = bot.guildsettings.get(guild.id) || bot.defaultguildsettings;
			delete guildConf[key];
			bot.guildsettings.set(guild.id, guildConf);
		});
		delete bot.defaultguildsettings[key];
		const exporter = `module.exports = defaultSettings = ${JSON.stringify(bot.defaultguildsettings, null, 2)}`;
		fs.writeFileSync('./config/defaultguildsettings.js', exporter, 'utf-8');
		const sEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`${key} deleted!`)
			.setDescription(`GlobalGuild configuration item \`${args.join(' ')}\` has been removed!`);
		message.channel.send(sEmbed);
	}
	else {
		return errors.err(message, new ReferenceError('Invalid Function called! Please use edit or delete!'));
	}
};

module.exports.help = {
	name: 'hardforkdb',
	description: 'hardforkdb',
	usage: 'hardforkdb',
	requires: ['botowner'],
	hideinhelp: true,
	cooldown: '1ms',
};