// Packages
const fs = require("fs");
const ms = require("ms");

// Utils
const hasbotperms = require("../utils/hasbotperms.js")
const help = require("../utils/help.js");

// Configs
const botconfig = require("../config/botconfig.json");

const Discord = require("discord.js");


module.exports.run = (message, bot, timestamp) => {                                                                 // commandhandler.run
        if (message.author.bot) return;                                                                             // message author =  bot => return
        if (message.channel.type === "text") {                                                                        
            var guildConf = bot.guildsettings.get(message.guild.id) || bot.defaultguildsettings;
        }
        else{
            var guildConf = bot.defaultguildsettings;
        }            
        const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|\\${guildConf.prefix})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();
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
                if(hasbotperms.owner(message.author, message) != true){                                                                        // if not botowner => return
                    console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} failed!: Not Bot Owner! `);
                    return
                }
            }
            else if(commandfile.help.botadmin==true){
                if(hasbotperms.admin(message.author, message) != true){                                                                        // if not botadmin => return
                    console.log(`${timestamp()} [Ping:${Math.round(bot.ping)}ms] ${cmd} failed!: Not Bot Admin! `);
                    return
                }
            }  
        }
        if (require("util").inspect(bot.cooldowns.get(commandfile.help.name))== '{}' || !bot.cooldowns.has(commandfile.help.name)) {
            bot.cooldowns.set(commandfile.help.name, new Discord.Collection());
            }
            const now = Date.now();
            const timestamps = bot.cooldowns.get(commandfile.help.name);
            const cooldownAmount = ms(commandfile.help.cooldown || botconfig.cooldown);
    
            if (!timestamps.has(message.author.id)) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
            else {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
                if (now < expirationTime) {
                    const timeLeft = ms(expirationTime - now, {long: true})
                    return message.reply(`please wait \`${timeLeft}\` before reusing the \`${commandfile.help.name}\` command.`);
                }
    
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }

        message.channel.startTyping();                                                                               // everyhing is working => start typing
        commandfile.run(bot, message, args, guildConf).then(message.channel.stopTyping(true));                                     // run command => then stop typing
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
