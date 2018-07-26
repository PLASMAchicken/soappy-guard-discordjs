const Discord = require('discord.js');
const SnowflakeUtil = Discord.SnowflakeUtil;

module.exports.run = async (bot, message, args) => {
	const towarn = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!towarn) return message.reply('User not found!');
	const userdata = bot.userdata.get(towarn.id) || {};
	const warnid = SnowflakeUtil.generate();
	const warn = args.slice(1).join(' ');
	if(args.slice(1).length == 0) return message.reply('Please add a valid reason!');
	if(!userdata.warns) {
		userdata.warns = {};
	}
	userdata.warns[warnid] = {};
	userdata.warns[warnid].reason = warn;
	userdata.warns[warnid].moderator = message.author.id;
	userdata.warns[warnid].guild = message.guild.id;
	bot.userdata.set(towarn.id, userdata);
	const warnembed = new Discord.MessageEmbed()
		.setTitle(towarn.user.tag + ' warned!')
		.setDescription(`[${warnid}] : ${warn}`)
		.setColor('RANDOM')
		.setFooter(`User now has ${Object.keys(bot.userdata.get(towarn.id)['warns']).length} global warns!`);
	message.channel.send(warnembed);
};


module.exports.help = {
	name: 'warn',
	description: 'warn somebody bad!',
	usage: 'warn <@|id> <Why ;(>',
	aliases: ['strike'],
	requires: ['staffrole'],
};