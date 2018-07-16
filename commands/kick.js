const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!kUser) return message.channel.send('Can\'t find user!');
	const kReason = args.join(' ').slice(22);
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('No can do pal!');
	if(kUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send('That person can\'t be kicked!');

	const kickEmbed = new Discord.RichEmbed()
		.setDescription('~Kick~')
		.setColor('#e56b00')
		.addField('Kicked User', `${kUser} with ID ${kUser.id}`)
		.addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
		.addField('Kicked In', message.channel)
		.addField('Tiime', message.createdAt)
		.addField('Reason', kReason);

	const kickChannel = message.guild.channels.find('name', 'incidents');
	if(!kickChannel) return message.channel.send('Can\'t find incidents channel.');

	message.guild.member(kUser).kick(kReason);
	kickChannel.send(kickEmbed);
};

module.exports.help = {
	name: 'kick',
	description: 'Kicks bad People',
	usage: 'kick <@User> <Reason>',
	disableindm: true,
	requires: ['staffrole'],
};
