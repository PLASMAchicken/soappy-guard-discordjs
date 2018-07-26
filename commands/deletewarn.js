const Discord = require('../node_modules/discord.js/src/index.js');;

module.exports.run = (bot, message, args) => {
	const user = message.mentions.users.first() || bot.users.get(args[0]);
	if(!user || message.author.id == user.id) return message.reply('User was not found! :I');
	const warnembed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(user.tag);
	if(bot.userdata.get(user.id)) {
		const userdata = bot.userdata.get(user.id) || {};
		if(!userdata.warns) return message.reply('No warns found');
		if(!userdata.warns[args[1]]) return message.reply('No warn found!');
		if(userdata.warns[args[1]].guild !== message.guild.id) return message.reply('This warn was not given in this Guild!');
		delete userdata.warns[args[1]];
		warnembed.setDescription(args[1] + ' deleted!');
		bot.userdata.set(user.id, userdata);
		warnembed.setFooter(`User now has ${Object.keys(bot.userdata.get(user.id)['warns']).length} global warns!`);
	}
	else {warnembed.setDescription('No Warns Logged!');}
	message.channel.send(warnembed);
};

/* TO-DO:
bot.userdata.find(data => data.warns != undefined ? data.warns['470604247789076484'] : undefined).warns['470604247789076484']
*/

module.exports.help = {
	name: 'deletewarn',
	description: 'deletes warns',
	usage: 'deletewarn <@|user id> <id>',
	aliases: ['delwarn', 'delstrike', 'deletestrike'],
	requires: ['adminrole'],
};