const Discord = require('../node_modules/discord.js/src/index.js');
const botconfig = require('../config/botconfig.json');
const colorer = require('../config/color.json');

const tempembed = new Discord.MessageEmbed()
	.setTitle('TempEmbed')
	.setTimestamp(new Date)
	.setColor(colorer.temp);

module.exports = (message, tempmsg) => {
	tempembed.setDescription(tempmsg);
	message.channel.send(tempembed)
		.then(msg => setTimeout(() => msg.delete(), botconfig.tempmsg));
};