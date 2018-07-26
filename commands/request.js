const Discord = require('../node_modules/discord.js/src/index.js');
const colorer = require('../config/color.json');

module.exports.run = async (bot, message, args) => {
	const feedback = args.join(' ');

	const feedbackEmbed = new Discord.MessageEmbed()
		.setDescription('Feedback')
		.setColor(colorer.feedback)
		.addField('Requested by', `${message.author.tag} with ID: ${message.author.id}`)
		.addField('Requested on Server:', `${message.guild.name} with ID: ${message.guild.id} `)
		.addField('Feedback:', feedback)
		.setTimestamp(message.createdAt);
	const botownerguild = bot.guilds.get(process.env.botownerguild);
	const requestchannel = botownerguild.channels.find(c => c.name == 'bot-requests');
	if(!requestchannel) return message.channel.send('Couldn\'t find #bot-requests channel. This is an issue on the Bot Owner Server! You can do !invite to go to the botowners discord!');
	message.delete().catch();
	requestchannel.send(feedbackEmbed);

};

module.exports.help = {
	name: 'request',
	description: '!request',
	usage: 'request <feedback>',

};
