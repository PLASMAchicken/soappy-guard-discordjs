// Packages
const Discord = require('../node_modules/discord.js/src/index.js'); // For Embed
const colorer = require('../config/color.json'); // For color
const uptime = require('../utils/uptime.js'); // For uptime
const branch = require('../utils/branch.js'); // For current branch

module.exports.run = (bot, message) => {
	botinfo(bot, message);
};

module.exports.help = {
	name: 'botinfo',
	description: 'Shows you the Bot Info',
	usage: 'botinfo',
	aliases: ['info', 'bot'],
};

async function botinfo(bot, message) {
	let m = await message.channel.send('Calculating BotInfo Please stand by!');
	const inline = true;
	const bicon = bot.user.displayAvatarURL;
	const botembed = new Discord.MessageEmbed()
		.setTitle('Bot Information')
		.setColor(colorer.botinfo)
		.setURL('https://github.com/PLASMAchicken/soappy-guard-discordjs')
		.setThumbnail(bicon)
		.setTimestamp(message.createdAt)
		.setAuthor(bot.user.username, bot.user.displayAvatarURL)
		.addField('Bot Created on', new Date(bot.user.createdAt).toUTCString(), inline)
		.addField('⏱ uptime', `${uptime(bot)}`, inline)
		// .addField('Shard', `${bot.shard.id + 1} | ${bot.shard.count}`, inline)
		.addField('Invite Bot', `[Invite Bot](https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`)
		.setFooter('And do not forget to wash ya hands!');
	if(branch()) {
		botembed.addField('Running on Git Branch:', `[${branch()}](https://github.com/PLASMAchicken/soappy-guard-discordjs/tree/${branch()})`, inline);
		botembed.addField('For Help:', `[ReadMe](https://github.com/PLASMAchicken/soappy-guard-discordjs/tree/${branch()}/README.md) or !help`, inline);
	}
	else{
		botembed.addField('Running on Git Branch:', '[Unknown](https://github.com/PLASMAchicken/soappy-guard-discordjs/)', inline);
		botembed.addField('For Help:', '[ReadMe](https://github.com/PLASMAchicken/soappy-guard-discordjs/blob/master/README.md) or !help', inline);
	}

	m = await m.edit('calculating ping.');
	await console.log(message.createdTimestamp + '+' + m.editedTimestamp);
	await botembed.addField('Ping:', `Latency is ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(bot.ping)}ms!\nLatency between receiving and sending is ${await m.editedTimestamp - message.createdTimestamp} ms! `);
	await m.edit(botembed);
}