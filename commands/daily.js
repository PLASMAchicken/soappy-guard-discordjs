const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message) => {
	const userdata = bot.userdata.get(message.author.id) || {};
	const m = await message.channel.send('Fetching Data from Discord Bot List API');
	if(!userdata.tokens) userdata.tokens = 0;
	const voted = await bot.dbl.hasVoted(message.author.id);
	if(voted === true) {
		const embed = new Discord.MessageEmbed();
		const weekend = await bot.dbl.isWeekend();
		if(weekend === true) {
			embed.addField('Discord Bot List Bonus!', 'You got 2 Tokens as the Discord Bot List Mulitplicator is activated!');
			userdata.tokens += 1;
		}
		userdata.tokens += 1;
		embed.setTitle('Thank you for your Vote!')
			.setDescription('It really helps the bot to grow!')
			.setFooter(`You now have ${userdata.tokens} Tokens`);
		bot.userdata.set(message.author.id, userdata);
		m.edit(embed);
	}
	else{
		const embed = new Discord.MessageEmbed()
			.setTitle('To get your daily token reward you need to Vote!')
			.setDescription(`[Vote Here](https://discordbots.org/bot/${bot.user.id})`)
			.setFooter(`You currently have ${userdata.tokens} Tokens`);
		m.edit(embed);
		const cooldowns = bot.cooldowns.get(message.author.id);
		cooldowns['daily'] = Date.now() - ms(this.help.cooldown) + ms('5min');
		bot.cooldowns.set(message.author.id, cooldowns);
	}
};
module.exports.help = {
	name: 'daily',
	description: 'get ya daily',
	usage: 'daily',
	hideinhelp: true,
	cooldown: '24h',
};

