const Discord = require('../node_modules/discord.js/src/index.js');
const colorer = require('../config/color.json');
const codeblock = '```';

module.exports.noPerms = (message, perm) => {
	const errorembed = new Discord.MessageEmbed();
	errorembed.setColor(colorer.error);
	errorembed.setTitle('While exectuting the last command a Error occured!');
	errorembed.setFooter('Error occured');
	errorembed.setTimestamp(new Date);
	errorembed.setDescription(`Permission needed!\n${codeblock}Markdown\n# You are missing ${perm} to do this action!${codeblock}`);
	message.channel.send(errorembed);
};

module.exports.equalPerms = (message, user, perms) => {
	const errorembed = new Discord.MessageEmbed();
	errorembed.setColor(colorer.error);
	errorembed.setTitle('While exectuting the last command a Error occured!');
	errorembed.setFooter('Error occured');
	errorembed.setTimestamp(new Date);
	errorembed.setDescription(`${user} has perms`, perms);
	message.channel.send(errorembed);
};

module.exports.botuser = (message, action) => {
	const errorembed = new Discord.MessageEmbed();
	errorembed.setColor(colorer.error);
	errorembed.setTitle('While exectuting the last command a Error occured!');
	errorembed.setFooter('Error occured');
	errorembed.setTimestamp(new Date);
	errorembed.setDescription(`You cannot ${action} a bot. \n${codeblock}Markdown\n# You tried to ${action} a bot!${codeblock}`);
	message.channel.send(errorembed);
};

module.exports.cantfindUser = (message, invaliduser) => {
	const errorembed = new Discord.MessageEmbed();
	errorembed.setColor(colorer.error);
	errorembed.setTitle('While exectuting the last command a Error occured!');
	errorembed.setFooter('Error occured');
	errorembed.setTimestamp(new Date);
	errorembed.setDescription(`User was not found!\n${codeblock}Markdown\n# User ${invaliduser} was not found!${codeblock}`);
	message.channel.send(errorembed);
};

module.exports.noReason = (message) => {
	const errorembed = new Discord.MessageEmbed();
	errorembed.setColor(colorer.error);
	errorembed.setTitle('While exectuting the last command a Error occured!');
	errorembed.setFooter('Error occured');
	errorembed.setTimestamp(new Date);
	errorembed.setDescription(`Reason cannot be emtpy!\n${codeblock}Markdown\n# The reason cannot be empty!\n# Please supply a reason!${codeblock}`);
	message.channel.send(errorembed);
};
module.exports.err = (message, err) =>{
	const errorembed = new Discord.MessageEmbed();
	errorembed.setColor(colorer.error);
	errorembed.setTitle('While exectuting the last command a Error occured!');
	errorembed.setFooter('Error occured');
	errorembed.setTimestamp(new Date);
	errorembed.setDescription(`Unexpected error!\n\t Please contact Bot developer!\n${codeblock}Markdown\n# Error caused by ${err.name} : ${err.message}!${codeblock}`);
	message.channel.send(errorembed);
};
module.exports.dm = (message, err) =>{
	const errorembed = new Discord.MessageEmbed();
	errorembed.setColor(colorer.error);
	errorembed.setTitle('While exectuting the last command a Error occured!');
	errorembed.setFooter('Error occured');
	errorembed.setTimestamp(new Date);
	errorembed.setDescription(`Unexpected error!\n\t${codeblock}Markdown\n# Error caused by ${err.name} : ${err.message}!${codeblock}`);
	message.send(`${codeblock}Markdown\n# Unexpected error!\n# Error caused by ${err.name} : ${err.stack}!${codeblock}`, { embed: errorembed });
};

