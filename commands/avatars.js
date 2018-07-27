const Discord = require('discord.js'); // For Embed
module.exports.run = (bot, msg) => {
	if(!msg.mentions.users.first()) return msg.reply('Specify atleast one User!');
	if(msg.mentions.users.size >= 3) return msg.reply('You are limited to 3 avatars at once!');
	msg.mentions.users.forEach(u => {
		const embed = new Discord.RichEmbed()
			.setTitle(`${u.tag}'s profile-picutre/avatar`)
			.setImage(u.displayAvatarURL);
		msg.channel.send(embed);
	});
};

module.exports.help = {
	name: 'avatars',
	description: 'gives back avatars!',
	usage: '-',
	aliases: ['profile'],
	cooldown: '4min',
};

