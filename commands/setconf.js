const Discord = require('../node_modules/discord.js/src/index.js');

module.exports.run = async (bot, message, args, guildConf) => {
	if (!args[0] || args[0 == 'help']) return message.reply(`Usage: ${guildConf.prefix}${this.help.name} <key> <new value>`);
	const key = args.shift();
	const value = args.join(' ');
	if(!guildConf.hasOwnProperty(key)) return message.reply('This key is not in the configuration.');
	guildConf[key] = value;
	bot.guildsettings.set(message.guild.id, guildConf);
	const sEmbed = new Discord.MessageEmbed()
		.setColor('#FF9900')
		.setTitle(`${key} set!`)
		.setDescription(`Guild configuration item ${key} has been changed to:\n\`\`\`${value}\`\`\``);
	message.channel.send(sEmbed);
};

module.exports.help = {
	name: 'setconfig',
	description: 'Sets the ServerSpecific Settings',
	usage: 'setconf <key> <new value>',
	disableindm: true,
	aliases: ['setconf', 'setserconf', 'setserverconf', 'setserverconfig'],
	requires: ['adminrole'],
};