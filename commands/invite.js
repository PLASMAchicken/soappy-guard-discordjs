const Discord = require('../node_modules/discord.js/src/index.js');;

module.exports.run = async (bot, message) => {
	const embed = new Discord.MessageEmbed()
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
