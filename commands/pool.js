const Discord = require('discord.js');
const tempmessage = require(process.cwd() + '/utils/tempmessage.js');
const agree = '✅';
const disagree = '❎';

module.exports.run = async (bot, message, args) => {
	const poolembed = new Discord.RichEmbed()
		.setTitle('Pool')
		.setFooter(`Use ${agree} or ${disagree} reactions to vote`)
		.setColor('RANDOM');
	const pool = args.join(' ');
	if (!pool) return tempmessage(message, 'Please provide a pool to vote on!');
	poolembed.setDescription(pool);

	const msg = await message.channel.send(poolembed);
	const filter = (reaction) => (reaction.emoji.name == agree || reaction.emoji.name == disagree);
	await msg.react(agree);
	await msg.react(disagree);
	const reactions = await msg.awaitReactions(filter, { time: 16000 });
	poolembed.setDescription(`Voting complete! \n\n${agree}: ${await reactions.get(agree) ? reactions.get(agree).count - 1 : 0}\n${disagree}: ${await reactions.get(disagree) ? reactions.get(disagree).count - 1 : 0}`);
	poolembed.addField('Question:', pool);
	poolembed.setColor('RANDOM');
	msg.edit(poolembed);
	msg.reactions.clear();


};
module.exports.help = {
	name: 'pool',
	description: 'Creates a Pool for People to vote on!',
	usage: 'pool <pool>',
	disableindm: true,
};
