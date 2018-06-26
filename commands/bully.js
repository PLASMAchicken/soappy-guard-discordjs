const Discord = require("discord.js");
const ms = require("ms");
let errors = require("../utils/errors.js");
let config = require("../config/botconfig.json");

module.exports.run = async (bot, message, args) => {
    try {
    let time = config.bullytime
    let tobully = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tobully) return errors.cantfindUser(message, args[0])

    args[0] = '';
    
    tobully.tempnickname = args.join(" ");
    tobully.oldnickname = tobully.nickname;
    await(tobully.setNickname(tobully.tempnickname, 'Temp Nick Change'));
    message.channel.send(`${tobully.oldnickname} is now ${tobully.nickname} for ${ms(ms(time))}`);
    
    setTimeout(function(){
        tobully.setNickname(tobully.oldnickname);
        message.channel.send(`${tobully.tempnickname} is now ${tobully.oldnickname} again!`);
    }, ms(time));

    } catch (err) {
        errors.err(message, err)
     }

    }

module.exports.help = {
    name: "bully",
    description: "Change somebodys nick for a short time",
    usage: "bully <@> <new name>",
    disableindm: true
}
