﻿const Discord = require('discord.js');
const color = require(process.cwd() + '/config/color.json');

module.exports.run = async (bot, message) => {
	const restartembed = new Discord.RichEmbed()
		.setColor(color.restart)
		.setThumbnail(bot.user.avatarURL)
		.setTitle('Status')
		.setDescription(`Please wait ${bot.user.username} is restarting`);
	message.channel.send(restartembed);
	bot.destroy()
		.then(() => bot.login(process.env.TOKEN));
	restartembed.setDescription(`${bot.user.username} has restarted!`);
	bot.once('ready', () => {
		message.channel.send(restartembed);
	});
};

module.exports.help = {
	name: 'restart',
	description: 'Restarts the Bot',
	usage: 'restart',
	requires: ['botadmin'],

};

