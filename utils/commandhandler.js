// Packages
const fs = require("fs");

// Utils
const hasbotperms = require("../utils/hasbotperms.js")
const help = require("../utils/help.js");

// Configs
const botconfig = require("../config/botconfig.json");
let cooldown = new Set();

module.exports.run = (message, bot, timestamp) => {                                                                 // commandhandler.run
        if (message.author.bot) return;                                                                             // message author =  bot => return
        let prefixes = JSON.parse(fs.readFileSync("./config/prefixes.json", "utf8"));                               // load server prefixes
        if (message.channel.type === "dm") {                                                                        // load dm prefix
                prefixes['dm'] = {                                                                                   
                prefixes: botconfig.prefix
             };
            var prefix = prefixes['dm'].prefixes;
        }
        else{                                                                                                       // Init Server Prefix if not dm
            if (!prefixes[message.guild.id]) {
                prefixes[message.guild.id] = {
                prefixes: botconfig.prefix
             };
            }
            var prefix = prefixes[message.guild.id].prefixes;
        }                                                                                                           
        if(message.content.startsWith(`<@!${bot.user.id}> `)) var prefix = `<@!${bot.user.id}> `;                     // if used @<bot> <cmd> init this prefix
        if (!message.content.startsWith(prefix)) return;                                                            // if message does not start with prefix => return
        if (cooldown.has(message.author.id)) {                                                                      // check if author still has cooldown 
            message.delete();
            return message.reply(`You have to wait ${botconfig.cooldownseconds} seconds between commands.`)         // if so => return
        }
        if (message.channel.type === "dm") {                                                                        // is in dm => add cooldown
            cooldown.add(message.author.id);
        }
        else{
        if (!message.member.hasPermission("ADMINISTRATOR")) {                                                       // is in server => add cooldown if no admin perm
            cooldown.add(message.author.id);
        }}
        const args = message.content.slice(prefix.length).trim().split(/ +/g);                                      // split args
        const cmd = args.shift().toLowerCase();
        if(message.content.startsWith(`<@${bot.user.id}> `)){
        }
        let commandfile = bot.commands.get(cmd);                                               // get command ( !ping ) and subtract prefix (= ping) and find command
        if (commandfile) {
            if (message.channel.type === "dm") {
                if(commandfile.help.disableindm==true)return message.channel.send("Sorry this Command is not yet supported!")   // check if command is supported in dm if not => return    
                console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} request by ${message.author.username} @ ${message.author.id} `);    // if command can run => log action
            }
            else{
                console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} request by ${message.author.username} @ ${message.guild.name} `);   // if command can run => log action
            }
        if(commandfile.help.botowner==true || commandfile.help.botadmin==true){                                                                        // if command requires bot owner => check
            if(commandfile.help.botowner==true){
                if(hasbotperms.owner(message) != true){                                                                        // if not botowner => return
                    console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} failed!: Not Bot Owner! `);
                    return
                }
            }
            else if(commandfile.help.botadmin==true){
                if(hasbotperms.admin(message) != true){                                                                        // if not botadmin => return
                    console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} failed!: Not Bot Admin! `);
                    return
                }
            }  
        }
        message.channel.startTyping();                                                                               // everyhing is working => start typing
        commandfile.run(bot, message, args).then(message.channel.stopTyping());                                     // run command => then stop typing
        setTimeout(() => {                                                                                          // init cooldown
            cooldown.delete(message.author.id)
        }, botconfig.cooldownseconds * 1000)
    }}


    module.exports.start = (bot, timestamp) => {                                                                    // load commands from command dir
        fs.readdir("./commands/", (err, files) => {                                                                 // read dir
            if(err){                                                                                                // err => 
                if (err.errno == -4058){                                                                            // err code = -4059 => dir not present
                    fs.mkdirSync("./commands");                                                                           // => make dir
                    console.log('Command folder was not found! Creating ./commands/ \n Please restart Bot!');       // => log
                    return process.exit();                                                                          // => return    
                }
                    else{                                                                                           // Unknow Error => 
                    console.log(err)                                                                                // => log
                    return process.exit();                                                                          // => exit
                }
            }
            let jsfile = files.filter(f => f.split(".").pop() === "js")                                             // get all .js files
            if (jsfile.length <= 0) {                                                                               // if no commands present

                console.log(timestamp() + "Couldn't find commands.");                                               // log no commands
                return;                                                                                             // => close commandhandler and start bot
            }
        
            jsfile.forEach((f, i) => {                                                                              // if commands present
                let props = require(`../commands/${f}`);                                                            // => load each one
        
                console.log(`${timestamp()} ${f} loaded!`);                                                         // => log that command got loaded
                help.add(props.help.name, props.help.description, props.help.hideinhelp);                           // => add command info to help
                bot.commands.set(props.help.name, props);                                                           // => add command to command list
            });                                                                                                     // => close commandhandler and start bot
        })
    }
