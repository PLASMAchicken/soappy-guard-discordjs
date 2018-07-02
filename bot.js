var launchtime = new Date; // used for started in 1999ms!
// Packages                                             
require('dotenv').config() // Replaces Token File
const Discord = require("discord.js");

// Configs
const botconfig = require("./config/botconfig.json"); // load bot config



// Utils
const timestamp = require("./utils/timestamp.js"); // module to give out timestamp like [07:00:00:300]
const commandhandler = require('./utils/commandhandler.js') // load commands and then run them
const reactionshandler = require('./utils/reactionshandler.js') // used for commands that use the reactions menu
const branch = require('./utils/branch.js') // used to get the current branch
const errors = require("./utils/errors.js"); // Error Handler



// WEB PART
var app = require('./app');
var debug = require('debug')('soappy-guard-discordjs:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '27015');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, "0.0.0.0");
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    console.log(`${timestamp()} Example app listening at http://${server.address().address}:${server.address().port}`)
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}



// BOT PART
// startup
const bot = new Discord.Client({}); // Start Bot
bot.commands = new Discord.Collection(); // Init Command Handler
commandhandler.start(bot, timestamp); // Start Loading Commands
bot.login(process.env.TOKEN); // login to Discord


// Database
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
bot.guildsettings = new Enmap({ provider: new EnmapLevel({ name: 'guildsettings' })})
bot.defaultguildsettings = require("./config/defaultguildsettings.js") // load bot config
bot.cooldowns = new Discord.Collection();

// events
bot.on("ready", async () => { // when Bot Succesfullly loged into Discord
    console.log(`${timestamp()} ${bot.user.username} is online on ${bot.guilds.size} servers! \n${timestamp()} Bot started in ${bot.readyAt-launchtime}ms!`);
    bot.user.setActivity(`${bot.guilds.size} servers${branch() ? `, on ${branch()} branch` : ''}!`, {
        type: "WATCHING"
    });
    if (bot.guilds.size == 0 || botconfig.on_start_print_invite == true) console.log(`${timestamp()} [Invite Bot](https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`);
});

bot.on("message", async message => { // on message run command
    commandhandler.run(message, bot, timestamp)
});

bot.on("messageUpdate", async (oldMessage, newMessage) => { // on edited message run/rerun command
    commandhandler.run(newMessage, bot, timestamp);
});

bot.on('messageReactionAdd', (messageReaction, user) => { // on Reaction handle
    reactionshandler.handle(messageReaction, user, timestamp, bot)
});

bot.on("guildCreate", guild => {
    bot.settings.set(guild.id, bot.defaultGuildSettings);
  });

bot.on("guildMemberAdd", member => {
    let welcomeMessage = bot.settings.getProp(member.guild.id, "welcomeMessage");
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)
    member.guild.channels
      .find("name", bot.settings.getProp(member.guild.id, "welcomeChannel"))
      .send(welcomeMessage)
  });

process.on('unhandledRejection', (err) => { // OHH NO UNHANLED ERROR: NOTIFY ALL BOT DEVS
    console.error(err)
    if (err.name == 'DiscordAPIError' && err.message == '401: Unauthorized') return process.exit();
    botconfig.botdev.forEach(botownerid => {
        bot.fetchUser(botownerid).then((dm) => errors.dm(dm, err)).catch(err => {
            console.error(`${botownerid} could not been notified because of ${err}!`)
            process.exit()
        })
    });
});
