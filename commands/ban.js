const Discord = require('discord.js');

module.exports.run = (bot, message, args, guildConf) => {
	const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) return message.channel.send('Can\'t find user!');
	const bReason = args.join(' ').slice(22);
	if(!bReason) return message.channel.send('Gimme me reason!');
	if(bUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send('That person can\'t be banned!');

	const modLog = message.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
	const banEmbed = new Discord.MessageEmbed()
		.setDescription('~Ban~')
		.setColor('#bc0000')
		.addField('Banned User', `${bUser} with ID ${bUser.id}`)
		.addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
		.addField('Banned In', message.channel)
		.addField('Time', message.createdAt)
		.addField('Reason', bReason);

	message.guild.member(bUser).ban(bReason).catch(err =>{
		if(err.code == 50013) {
			message.reply('Failed to Ban! ' + err.message);
		}
		else {
			message.reply('Command failed! Please do !request <message> if you know why!');
			throw err;
		}
	});
	if(modLog) modLog.send(banEmbed);
	else message.channel.send('No ModLogChannel defined!', { embed: banEmbed });
};

module.exports.help = {
	name: 'ban',
	description: 'Bans Bad People',
	usage: 'ban <@USER> <Reason>',
	disableindm: true,
	requires: ['adminrole'],
};
