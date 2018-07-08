// Packages
const fs = require('fs');
const ms = require('ms');

// Utils
const hasbotperms = require('../utils/hasbotperms.js');
const help = require('../utils/help.js');

// Configs
const botconfig = require('../config/botconfig.json');

module.exports.run = async (message, bot, timestamp) => { // commandhandler.run
	if (message.author.bot) return; // message author =  bot => return
	let guildConf;
	if (message.channel.type === 'text') {
		guildConf = bot.guildsettings.get(message.guild.id) || bot.defaultguildsettings;
	}
	else{
		guildConf = bot.defaultguildsettings;
	}
	const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|\\${guildConf.prefix})\\s*`);
	if (!prefixRegex.test(message.content)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();
	const commandfile = bot.commands.get(cmd) || bot.commands.find(command => command.help.aliases && command.help.aliases.includes(cmd));
	if (commandfile) {
		if (message.channel.type === 'text') {
			const botchannel = message.guild.channels.find('name', guildConf.botChannel);
			if(botchannel) {
				if(message.channel.name !== guildConf.botChannel) {
					message.delete(0).catch(err => console.log(err));
					return message.author.send(`You can only use ${message.cleanContent} in ${botchannel}!`).catch(err =>{
						message.reply(`Please only use commands ${message.cleanContent} in  ${botchannel}!`).then(msg => msg.delete(6000));
						if(err.code != 50007) console.error(err);
					});
				}
			}
		}
		if (message.channel.type === 'dm') {
			if(commandfile.help.disableindm == true)return message.channel.send('Sorry this Command is not yet supported!'); // check if command is supported in dm if not => return
			console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} request by ${message.author.username} @ ${message.author.id} `); // if command can run => log action
		}
		else{
			console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} request by ${message.author.username} @ ${message.guild.name} `); // if command can run => log action
		}
		if(commandfile.help.botowner == true || commandfile.help.botadmin == true) { // if command requires bot owner => check
			if(commandfile.help.botowner == true) {
				if(hasbotperms.owner(message.author, message) != true) { // if not botowner => return
					console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} failed!: Not Bot Owner! `);
					return;
				}
			}
			else if(commandfile.help.botadmin == true) {
				if(hasbotperms.admin(message.author, message) != true) { // if not botadmin => return
					console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} failed!: Not Bot Admin! `);
					return;
				}
			}
		}
		const now = Date.now();
		const cooldownAmount = ms(commandfile.help.cooldown || botconfig.cooldown);
		if(!bot.cooldowns.get(message.author.id)) bot.cooldowns.set(message.author.id, {});
		const cooldowns = bot.cooldowns.get(message.author.id);
		if(!cooldowns[commandfile.help.name]) {
			cooldowns[commandfile.help.name] = now - cooldownAmount;
		}
		const cooldown = bot.cooldowns.get(message.author.id)[commandfile.help.name];
		const expirationTime = cooldown + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = ms(expirationTime - now, { long: true });
			return message.reply(`please wait \`${timeLeft}\` before reusing the \`${commandfile.help.name}\` command.`);
		}
		cooldowns[commandfile.help.name] = now;
		bot.cooldowns.set(message.author.id, cooldowns);

		message.channel.startTyping(); // everyhing is working => start typing
		try {
			commandfile.run(bot, message, args, guildConf); // run command => then stop typing
		}
		catch (error) {
			console.error(error);
			message.reply(`Oh no there was an error trying to executing ${commandfile.help.name}!\nBut don't worry we will try to fix it!\nIf you have any info for us please do !request ${commandfile.name} broke when I did: `);
		}
		message.channel.stopTyping(true);
	}
};
module.exports.start = (bot, timestamp) => { // load commands from command dir
	fs.readdir('./commands/', (err, files) => { // read dir
		if(err) { // err =>
			if (err.errno == -4058) { // err code = -4059 => dir not present
				fs.mkdirSync('./commands'); // => make dir
				console.log('Command folder was not found! Creating ./commands/ \n Please restart Bot!'); // => log
				return process.exit(); // => return
			}
			else{ // Unknow Error =>
				console.log(err); // => log
				return process.exit(); // => exit
			}
		}
		const jsfile = files.filter(f => f.split('.').pop() === 'js'); // get all .js files
		if (jsfile.length <= 0) { // if no commands present
			return console.log(timestamp() + 'Couldn\'t find commands.'); // log no commands => close commandhandler and start bot
		}
		jsfile.forEach((f) => { // if commands present
			const props = require(`../commands/${f}`); // => load each one

			console.log(`${timestamp()} ${f} loaded!`); // => log that command got loaded
			help.add(props.help.name, props.help.description, props.help.usage, props.help.hideinhelp); // => add command info to help
			bot.commands.set(props.help.name, props); // => add command to command list
		}); // => close commandhandler and start bot
	});
};
