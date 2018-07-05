const reactionshandler = require('../utils/reactionshandler.js');
const reactions = require('../utils/reactions.js');

module.exports.run = async (message) => {
	const msg = await message.channel.send('Test select 1');
	await msg.react(reactions.one.emoji);
	await msg.react(reactions.two.emoji);
	await reactionshandler.add(msg, module.exports.help.name, message.author.id);
};

module.exports.one = (run) => {
	run.message.channel.send('test finished');
};

module.exports.help = {
	name: '!!',
	description: '!!',
	usage: '!!',
	hideinhelp: true,
};
