const Discord = require('discord.js');
const tempmessage = require('../utils/tempmessage.js');
const colorer = require('../config/color.json');
const agree = '✅';
const disagree = '❎';


const poolembed = new Discord.MessageEmbed()
	.setTitle('Pool')
	.setFooter(`Use ${agree} or ${disagree} reactions to vote`)
	.setColor(colorer.pool);


module.exports.run = async (bot, message, args) => {
	const pool = args.join(' ');
	if (!pool) return tempmessage(message, 'Please provide a pool to vote on!');
	poolembed.setDescription(pool);

	const msg = await message.channel.send(poolembed);
	await msg.react(agree);
	await msg.react(disagree);
	const filter = (reaction) => reaction.emoji.name == agree || reaction.emoji.name == disagree;
	const reactions = await msg.awaitReactions(filter, { time: 16000 });
	const reactionsa = reactions;
	let agreec, disagreec;
	if(reactions.get(agree)) {agreec = await reactions.get(agree).count - 1;}
	else{agreec = 0;}
	if(reactions.get(disagree)) {disagreec = await reactionsa.get(disagree).count - 1;}
	else{disagreec = 0;}

	poolembed.setDescription(`Voting complete! \n\n${agree}: ${agreec}\n${disagree}: ${disagreec}`);
	msg.edit(poolembed);
	msg.clearReactions();


};
module.exports.help = {
	name: 'pool',
	description: 'Creates a Pool for People to vote on!',
	usage: 'pool <pool>',
	disableindm: true,
};
