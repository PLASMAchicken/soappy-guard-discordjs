const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const user = message.mentions.users.first() || bot.users.get(args[0]) || message.author;
	const warnembed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setTitle(user.tag + '\'s warns:');
	if(bot.userdata.get(user.id)) {
		const warns = bot.userdata.get(user.id).warns || {};
		for(const key in warns) {
			warnembed.addField(key, warns[key].reason + '\n' + (warns[key].guild == message.guild.id ? '[this guild]' : '[' + warns[key].guild + ']') + '\n[' + (bot.guilds.get(warns[key].guild) == '' ? bot.guilds.get(warns[key].guild).name : 'Non resovleable Guild!') + ']', true);
		}
	}
	else {warnembed.setDescription('No Warns Logged!');}
	message.channel.send(warnembed);

};


module.exports.help = {
	name: 'warns',
	description: 'check your warns',
	usage: 'warns <@>',
};