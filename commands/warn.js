const errors = require('../utils/errors.js');
const Discord = require('discord.js');
const SnowflakeUtil = Discord.SnowflakeUtil;

module.exports.run = async (bot, message, args, guildConf) => {
	if(!message.member.roles.exists('name', guildConf['staffRole']) && !message.member.roles.exists('name', guildConf['adminRole'])) return errors.noPerms(message, guildConf['staffRole'] + 'Role');
	const towarn = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!towarn) return message.reply('User not found!');
	const userdata = bot.userdata.get(towarn.id) || {};
	const warnid = SnowflakeUtil.generate();
	const warn = args.slice(1).join(' ');
	if(!userdata.warns) {
		userdata.warns = {};
	}
	userdata.warns[warnid] = warn;
	bot.userdata.set(towarn.id, userdata);
	const warnembed = new Discord.RichEmbed()
		.setTitle(towarn.user.tag + ' warned!')
		.setDescription(`[${warnid}] : ${warn}`)
		.setColor('RANDOM');
	message.channel.send(warnembed);
};


module.exports.help = {
	name: 'warn',
	description: 'warn somebody bad!',
	usage: 'warn <@|id> <Why ;(>',
};