const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (bot, message) => {
	const userdata = bot.userdata.get(message.author.id) || {};
	message.channel.send('Fetching Data from Discord Bot List API').then(m =>{
		if(!userdata.tokens) userdata.tokens = 0;
		bot.dbl.hasVoted(message.author.id).then(voted =>{
			if(voted === true) {
				userdata.tokens += 1;
				const embed = new Discord.RichEmbed()
					.setTitle('Thank you for your Vote!')
					.setDescription('It really helps the bot to grow!')
					.setFooter(`You now have ${userdata.tokens} Tokens`);
				bot.userdata.set(message.author.id, userdata);
				m.edit(embed);
			}
			else{
				const embed = new Discord.RichEmbed()
					.setTitle('To get your daily token reward you need to Vote!')
					.setDescription(`[Vote Here](https://discordbots.org/bot/${bot.user.id})`)
					.setFooter(`You currently have ${userdata.tokens} Tokens`);
				m.edit(embed);
				const cooldowns = bot.cooldowns.get(message.author.id);
				cooldowns['daily'] = Date.now() - ms(this.help.cooldown) + ms('5min');
				bot.cooldowns.set(message.author.id, cooldowns);
			}
		});
	});
};
module.exports.help = {
	name: 'daily',
	description: 'get ya daily',
	usage: 'daily',
	hideinhelp: true,
	cooldown: '1min',
};

