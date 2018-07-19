const launchtime = new Date; // used for started in 1999ms!
// Packages
require('dotenv').config(); // Replaces Token File
const Discord = require('discord.js');

// Configs
const botconfig = require('./config/botconfig.json'); // load bot config

// Node Ver Check
if(process.version.charAt(1) != 1 && process.version.charAt(1) <= 8 && botconfig.no_node_ver_check != true) throw 'Please use Node Version 8 or above!';

// Utils
const timestamp = require('./utils/timestamp.js'); // module to give out timestamp like [07:00:00:300]
const commandhandler = require('./utils/commandhandler.js'); // load commands and then run them
const reactionshandler = require('./utils/reactionshandler.js'); // used for commands that use the reactions menu
const branch = require('./utils/branch.js'); // used to get the current branch
const notify = require('./utils/notifybot.js'); // Error Handler
const starboard = require('./starboard.js');

// startup
const bot = new Discord.Client({}); // Start Bot
bot.commands = new Discord.Collection(); // Init Command Handler
commandhandler.start(bot, timestamp); // Start Loading Commands
if(process.env.waitfordb == 'true' || process.env.waitfordb == true) {
	console.log(`${timestamp()} Waiting for DataBase to load up!`);
	setTimeout(function() {
		bot.login(process.env.TOKEN); // login to Discord
		console.log(`${timestamp()} Database should be ready now!`);
	}, 45000);
}
else{
	bot.login(process.env.TOKEN); // login to Discord
	console.log(`${timestamp()} Database wait skipped!`);
}
// Discord Bot List Support
const DBL = require('dblapi.js');
bot.dbl = new DBL(process.env.dbl);

// Database
const Enmap = require('enmap');
const provider = require('enmap-sqlite');


// events
bot.on('ready', async () => { // when Bot Succesfullly loged into Discord
	bot.cooldowns = new Enmap({ provider: new provider({ name: 'cooldowns' }) });
	bot.guildsettings = new Enmap({ provider: new provider({ name: 'guildsettings' }) });
	bot.userdata = new Enmap({ provider: new provider({ name: 'userdata' }) });
	bot.tags = new Enmap({ provider: new provider({ name: 'tags' }) });
	bot.defaultguildsettings = require('./config/defaultguildsettings.js'); // load bot config
	console.log(`${timestamp()} ${bot.user.username} is online on ${bot.guilds.size} servers! \n${timestamp()} Bot started in ${bot.readyAt - launchtime}ms!`);
	bot.user.setActivity(`${bot.guilds.size} servers${branch() ? `, on ${branch()} branch` : ''}!`, {
		type: 'WATCHING',
	});
	if (bot.guilds.size == 0 || botconfig.on_start_print_invite == true) console.log(`${timestamp()} [Invite Bot]( https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot )`);
	dblpost();
	function dblpost() {
		bot.dbl.postStats(bot.guilds.size).then(dbl => console.log(timestamp() + ' Updated Discord Bot List Stats! ' + require('util').inspect(dbl)));
	}
	setInterval(dblpost, 600000);
});

bot.on('message', async message => { // on message run command
	commandhandler.run(message, bot, timestamp);
});

bot.on('messageUpdate', async (oldMessage, newMessage) => { // on edited message run/rerun command
	commandhandler.run(newMessage, bot, timestamp);
});

bot.on('messageReactionAdd', (messageReaction, user) => { // on Reaction handle
	starboard.add(messageReaction, user, bot);
	reactionshandler.handle(messageReaction, user, bot);
});
bot.on('messageReactionRemove', (messageReaction, user) => { // on Reaction handle
	starboard.remove(messageReaction, user, bot);
});

bot.on('guildCreate', guild => {
	bot.user.setActivity(`${bot.guilds.size} servers${branch() ? `, on ${branch()} branch` : ''}!`, {
		type: 'WATCHING',
	});
	bot.guildsettings.set(guild.id, bot.defaultguildsettings);
	const guildlog = new Discord.RichEmbed()
		.setTitle('New Guild Joined!')
		.setColor('RANDOM')
		.addField('Server:', `${guild.name} with ID: ${guild.id} `)
		.addField('Owner:', `${guild.owner.user.tag} with ID ${guild.ownerID} `)
		.addField('Users:', guild.members.filter(m=> m.user.bot == false).size, true)
		.addField('Bots:', guild.members.filter(m=> m.user.bot == true).size, true)
		.setTimestamp(new Date());
	const botownerguild = bot.guilds.get(process.env.botownerguild);
	const guildlogchannel = botownerguild.channels.find(c => c.name == 'bot-guilds');
	if(!guildlogchannel) throw Error(`Could't find guildlogchannel! In ${process.env.botownerguild}`);
	guildlogchannel.send(guildlog);
});

bot.on('guildDelete', guild => {
	bot.user.setActivity(`${bot.guilds.size} servers${branch() ? `, on ${branch()} branch` : ''}!`, {
		type: 'WATCHING',
	});
	const guildlog = new Discord.RichEmbed()
		.setTitle('Left Guild!')
		.setColor('RANDOM')
		.addField('Server:', `${guild.name} with ID: ${guild.id} `)
		.addField('Owner:', `${guild.owner.user.tag} with ID: ${guild.ownerID} `)
		.setTimestamp(new Date());
	const botownerguild = bot.guilds.get(process.env.botownerguild);
	const guildlogchannel = botownerguild.channels.find('name', 'bot-guilds');
	if(!guildlogchannel) throw Error(`Could't find guildlogchannel! In ${process.env.botownerguild}`);
	guildlogchannel.send(guildlog);
});

bot.on('guildMemberAdd', member => {
	const guildConf = bot.guildsettings.get(member.guild.id) || bot.defaultguildsettings;
	let welcomeMessage = guildConf.welcomeMessage;
	const welcomeChannel = member.guild.channels.find(c => c.name == guildConf.welcomeChannel && c.type == 'text');
	if(!welcomeChannel || !welcomeMessage) return;
	welcomeMessage = welcomeMessage.replace('{{user}}', member.user.tag);
	welcomeChannel.send(welcomeMessage);
});

process.on('unhandledRejection', (err) => { // OHH NO UNHANLED ERROR: NOTIFY ALL BOT DEVS
	console.error(err);
	if (err.name == 'DiscordAPIError' && err.message == '401: Unauthorized') return process.exit();
	notify(bot, 'botdevs', err);
});
/*
bot.dbl.webhook.on('ready', hook => {
	console.log(`${timestamp()} Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
bot.dbl.webhook.on('vote', vote => {
	console.log(vote);
	const votelog = new Discord.RichEmbed()
		.setTitle('VOTE!')
		.setColor('RANDOM')
		.addField('Voter:', `${bot.users.get(vote.user) ? bot.users.get(vote.user).tag : vote.user}`)
		.setTimestamp(new Date());
	const botownerguild = bot.guilds.get(process.env.botownerguild);
	const guildlogchannel = botownerguild.channels.find('name', 'bot-votes');
	if(!guildlogchannel) throw Error(`Could't find botvotes! In ${process.env.botownerguild}`);
	guildlogchannel.send(votelog);
});
*/