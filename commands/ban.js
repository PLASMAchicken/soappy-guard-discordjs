const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
	const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) return message.channel.send('Can\'t find user!');
	const bReason = args.join(' ').slice(22);
	if(!bReason) return message.channel.send('Gimme me reason!');
	if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('No can do pal!');
	if(bUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send('That person can\'t be kicked!');

	const banEmbed = new Discord.RichEmbed()
		.setDescription('~Ban~')
		.setColor('#bc0000')
		.addField('Banned User', `${bUser} with ID ${bUser.id}`)
		.addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
		.addField('Banned In', message.channel)
		.addField('Time', message.createdAt)
		.addField('Reason', bReason);

	const incidentchannel = message.guild.channels.find('name', 'incidents');
	if(!incidentchannel) return message.channel.send('Can\'t find incidents channel.');

	message.guild.member(bUser).ban(bReason);
	incidentchannel.send(banEmbed);
};

module.exports.help = {
	name: 'ban',
	description: 'Bans Bad People',
	usage: 'ban <@USER> <Reason>',
	disableindm: true,
	requires: ['botowner'],
};
