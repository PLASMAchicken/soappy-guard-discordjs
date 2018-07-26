const Discord = require('../node_modules/discord.js/src/index.js');;

module.exports.run = async (bot, message, args, guildConf) => {
	const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!kUser) return message.channel.send('Can\'t find user!');
	const kReason = args.join(' ').slice(22);
	if(!kReason) return message.channel.send('Gimme me reason!');
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('No can do pal!');
	if(kUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send('That person can\'t be kicked!');

	const modLog = message.guild.channels.find(channel => channel.name === guildConf.modLogChannel);
	const kickEmbed = new Discord.MessageEmbed()
		.setDescription('~Kick~')
		.setColor('#e56b00')
		.addField('Kicked User', `${kUser} with ID ${kUser.id}`)
		.addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
		.addField('Kicked In', message.channel)
		.addField('Tiime', message.createdAt)
		.addField('Reason', kReason);

	message.guild.member(kUser).kick(kReason).catch(err =>{
		if(err.code == 50013) {
			message.reply('Failed to kick! ' + err.message);
		}
		else {
			message.reply('Command failed! Please do !request <message> if you know why!');
			throw err;
		}
	});
	if(modLog) modLog.send(kickEmbed);
	else message.channel.send('No ModLogChannel defined!', { embed: kickEmbed });

};

module.exports.help = {
	name: 'kick',
	description: 'Kicks bad People',
	usage: 'kick <@User> <Reason>',
	disableindm: true,
	requires: ['staffrole'],
};
