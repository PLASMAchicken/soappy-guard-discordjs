module.exports.run = async (bot, message) => {
	// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
	// The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
	const m = await message.channel.send('PING IS GETTING REQUESTED PLEASE STAND BY!');
	const msg = await m.edit(`DISCORDJS.PLAY:Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
	await setTimeout(() => {
		msg.channel.send(`Latency between receiving and sending is ${msg.editedTimestamp - message.createdTimestamp}ms`);
	}, 2000);
};

module.exports.help = {
	name: 'ping',
	description: 'Pong!',
	usage: 'ping',
};
