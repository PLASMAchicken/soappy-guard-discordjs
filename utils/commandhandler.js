// Packages
const fs = require('fs');
const ms = require('ms');
const Discord = require('../node_modules/discord.js/src/index.js');;

// Utils
const hasbotperms = require('../utils/hasperms.js');
const help = require('../utils/help.js');
const errors = require('../utils/errors.js');

// Configs
const botconfig = require('../config/botconfig.json');

module.exports.run = async (message, bot, timestamp) => { // commandhandler.run
	if (message.author.bot) return; // message author =  bot => return
	let guildConf;
	if (message.channel.type === 'text') {
		if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
		if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('I need EMBED_LINKS Permission to work properly!');
		guildConf = bot.guildsettings.get(message.guild.id) || bot.defaultguildsettings;
		if(!guildConf['setup'] || guildConf.setup != true) {
			guildConf['setup'] = true;
			bot.guildsettings.set(message.guild.id, guildConf);
			console.log('Sent SETUP EMBED to ' + message.guild.name);
			const setupembed = new Discord.MessageEmbed()
				.setTitle('Bot Setup')
				.setDescription('Hello, thanks for adding my Bot')
				.addField('To get a List of all Commands do', '!help')
				.addField('If you want to view your Servers Config you can do', '!serverconf')
				.addField('To edit something in your Server Config do', '!setconf <key> <value>')
				.addField('For Support you can do', '!support')
				.setColor('RANDOM')
				.addField('For Feedback you can do', '!request <message>');
			message.channel.send(setupembed);
		}
		if(!guildConf['update'] || guildConf.update != '1') {
			guildConf['update'] = '1';
			bot.guildsettings.set(message.guild.id, guildConf);
			console.log('Sent UPDATE EMBED to ' + message.guild.name);
			const setupembed = new Discord.MessageEmbed()
				.setTitle('Bot now Updated!')
				.addField('Commands added!', '!daily, !tokens')
				.addField('Now using Discord.js', 'master')
				.setColor('RANDOM');
			message.channel.send(setupembed);
		}
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
		// if(!message.author.bot && message.author.id != '193406800614129664')return message.reply('Bot is currently experiencing Maintaince! Sorry.');
		if (message.channel.type === 'text') {
			const botchannel = message.guild.channels.find(c => c.name == guildConf.botChannel);
			if(botchannel) {
				if(message.channel.name !== guildConf.botChannel) {
					message.delete(0).catch(err => console.log(err));
					return message.author.send(`You can only use ${message.cleanContent} in ${botchannel}!`).catch(err =>{
						message.reply(`Please only use commands ${message.cleanContent} in  ${botchannel}!`).then(msg => msg.delete(6000));
						if(err.code != 50007) console.error(err);
					});
				}
			}
			console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${commandfile.help.name} request by ${message.author.username} @ ${message.guild.name} `); // if command can run => log action
		}
		else {
			if(commandfile.help.disableindm == true)return message.channel.send('Sorry this Command is not yet supported!'); // check if command is supported in dm if not => return
			console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${commandfile.help.name} request by ${message.author.username} @ ${message.author.id} `); // if command can run => log action
		}
		if(commandfile.help.requires) {
			if(commandfile.help.requires.includes('botowner')) {
				if(hasbotperms.owner(message.author, message) != true) { // if not botowner => return
					return console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${commandfile.help.name} failed!: Not Bot Owner! `);
				}
			}
			else if (commandfile.help.requires.includes('botadmin')) {
				if(hasbotperms.admin(message.author, message) != true) { // if not botadmin => return
					return console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${commandfile.help.name} failed!: Not Bot Admin! `);
				}
			}
			else if (message.channel.type === 'text') {
				if (commandfile.help.requires.includes('adminrole')) {
					const adminRole = message.guild.roles.find(r => r.name == guildConf.adminRole);
					if (!message.member.hasPermission('ADMINISTRATOR') && (!adminRole || !message.member.roles.has(adminRole.id))) return errors.noPerms(message, guildConf.adminRole + ' role'), console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${commandfile.help.name} failed!: Not Server Admin! `);
				}
				else if (commandfile.help.requires.includes('staffrole')) {
					const adminRole = message.guild.roles.find(r => r.name == guildConf.adminRole);
					const staffRole = message.guild.roles.find(r => r.name == guildConf.staffRole);
					if (!message.member.hasPermission('ADMINISTRATOR') && (!staffRole || !message.member.roles.has(staffRole.id) && (!adminRole || !message.member.roles.has(adminRole.id)))) return errors.noPerms(message, guildConf.staffRole + ' role'), console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${commandfile.help.name} failed!: Not Server Staff! `);
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
			help.add(props); // => add command info to help
			bot.commands.set(props.help.name, props); // => add command to command list
		}); // => close commandhandler and start bot
	});
};
