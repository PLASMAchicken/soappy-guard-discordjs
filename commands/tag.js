const hasbotperms = require('../utils/hasperms.js');
const Discord = require('../node_modules/discord.js/src/index.js');;

module.exports.run = (bot, message, args) => {
	if(args[0] == 'add') {
		args.shift();
		const tagname = args.shift();
		const tagcontent = args.join(' ');
		if(tagcontent.lenght) return message.reply('Cannot use empty tag!');
		const tag = {};
		tag.owner = message.author.id;
		tag.content = tagcontent;
		if(bot.tags.get(tagname)) return message.reply(`Tag: ${tagname} already exists!`);
		const infoembed = new Discord.MessageEmbed()
			.setTitle(`Added Tag: ${tagname}`)
			.setColor('RANDOM');
		message.channel.send(infoembed);

		let userdata = bot.userdata.get(message.author.id);
		if(!userdata) userdata = {};
		if(!userdata.tags) userdata.tags = [];
		userdata.tags.push(tagname);
		bot.userdata.set(message.author.id, userdata);
		bot.tags.set(tagname, tag);
	}
	else if (args[0] == 'edit') {
		args.shift();
		const tagname = args.shift();
		const tag = bot.tags.get(tagname);
		if(!tag) return message.reply('Not a tag!');
		if(tag.owner != message.author.id) return message.reply('You do not own this tag!');
		const tagcontent = args.join(' ');
		tag.content = tagcontent;
		const infoembed = new Discord.MessageEmbed()
			.setTitle(`Edited Tag: ${tagname}`)
			.setColor('RANDOM');
		message.channel.send(infoembed);
		bot.tags.set(tagname, tag);
	}
	else if (args[0] == 'delete') {
		args.shift();
		const tagname = args.shift();
		if(!bot.tags.get(tagname)) return message.reply('No tag found!');
		const tagowner = bot.tags.get(tagname).owner;
		if(tagowner != message.author.id) return message.reply('You do not own this tag!\nIf you think this tag should be deleted then use !request or speak with a BOT Admin');
		const deleteembed = new Discord.MessageEmbed()
			.setTitle(`Deleted Tag: ${tagname}`)
			.setColor('RANDOM');
		message.channel.send(deleteembed);
		bot.tags.delete(tagname);
	}
	else if (args[0] == 'forcedelete') {
		args.shift();
		const tagname = args.shift();
		if(!bot.tags.get(tagname)) return message.reply('No tag found!');
		if(hasbotperms.admin(message.author, message) == true) {
			const deleteembed = new Discord.MessageEmbed()
				.setTitle(`Deleted Tag: ${tagname}`)
				.setDescription(`Tag created by: ${bot.tags.get(tagname).owner}`)
				.setColor('RANDOM');
			message.channel.send(deleteembed);
			bot.tags.delete(tagname);
		}
	}
	else if (args[0] == 'info') {
		args.shift();
		const tagname = args.shift();
		if(!bot.tags.get(tagname)) return message.reply('No tag found!');
		const infoembed = new Discord.MessageEmbed()
			.setTitle(`Tag: ${tagname}`)
			.setDescription(`Tag created by: ${bot.tags.get(tagname).owner}\n${bot.users.get(bot.tags.get(tagname).owner) == '' ? bot.users.get(bot.tags.get(tagname).owner).tag : 'User not resolveable!' }`);
		message.channel.send(infoembed);
	}
	else if (args[0] == 'list') {
		const infoembed = new Discord.MessageEmbed()
			.setTitle(message.author.tag + '`s Tags');
		if(bot.userdata.get(message.author.id)) {
			const usertags = bot.userdata.get(message.author.id).tags || [];
			infoembed.setDescription(usertags);
		}
		else {infoembed.setDescription('No Tags logged!');}
		message.channel.send(infoembed);
	}
	else {
		let tag = args.join(' ');
		tag = bot.tags.get(tag);
		if(!tag) return message.reply('No tag found!');
		message.channel.send(tag.content);
	}
};


module.exports.help = {
	name: 'tag',
	description: 'edits tags',
	usage: 'tag <add|edit|tag> <new tag|edited tag|>',
};