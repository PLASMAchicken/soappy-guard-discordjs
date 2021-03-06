const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
	const embed = new Discord.RichEmbed()
		.addField('Bot Invite', `[[Invite Bot]](https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`, true)
		.addField('Support Server', '[[Invite Bot]](https://discord.gg/xeKMCRq)', true);
	message.channel.send(embed);
};

module.exports.help = {
	name: 'invite',
	description: 'Add Bot to Server!',
	usage: 'invite',
	requires: [''],
	aliases: ['inv', 'support', 'addbot'],
};
