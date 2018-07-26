const Discord = require('../node_modules/discord.js/src/index.js');

module.exports.run = async (bot, message, args, guildConf) => {
	const reportschannel = message.guild.channels.find(c => c.name == guildConf.reportsChannel);
	if(!reportschannel) return message.channel.send(`Couldn't find ${guildConf.reportsChannel} channel.`);
	const rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send('Couldn\'t find user.');
	const rreason = args.join(' ').slice(22);

	const reportEmbed = new Discord.MessageEmbed()
		.setDescription('Reports')
		.setColor('#15f153')
		.addField('Reported User', `${rUser} with ID: ${rUser.id}`)
		.addField('Reported By', `${message.author} with ID: ${message.author.id}`)
		.addField('Channel', message.channel)
		.setTimestamp(message.createdAt);
	if(rreason == '') {return message.reply('SPECIFY REASON!');}
	else{reportEmbed.addField('Reason', rreason);}
	message.delete().catch();


	reportschannel.send(reportEmbed);

};

module.exports.help = {
	name: 'report',
	description: '!report <USER> <REASON>',
	usage: 'report <@USER> <Reason>',
	disableindm: true,

};
