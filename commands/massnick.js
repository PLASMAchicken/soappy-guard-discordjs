const Discord = require("discord.js");
let errors = require("../utils/errors.js");
let config = require("../config/botconfig.json");

module.exports.run = async (bot, message, args) => {
    var massnick = args.join(" ");
    try{
         message.guild.members.forEach((user, id) => {
             user.setNickname(massnick, 'MassNick').catch(err => err)        
})} catch (err) {
    errors.err(message, err)
 }
    
    message.channel.send(`Finished!`)
}



module.exports.help = {
    name: "massnick",
    description: "Change everybodys nick!",
    usage: "massnick <new name>",
    disableindm: true
}
