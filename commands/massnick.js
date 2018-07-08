module.exports.run = async (bot, message, args) => {
	const massnick = args.join(' ');
	const errorhandler = [];
	try{
		message.guild.members.forEach((user) => {
			user.setNickname(massnick, 'MassNick').catch(err => err);
		});
	}
	catch (err) {
		errorhandler.push(err);
	}
	if(errorhandler.length == 0) {
		message.channel.send('Finished!');
	}
	else{
		message.channel.send(`Finished: ${errorhandler.length} failed!`);
	}
};


module.exports.help = {
	name: 'massnick',
	description: 'Change everybodys nick!',
	usage: 'massnick <new name>',
	disableindm: true,
	aliases: ['ms'],
};
