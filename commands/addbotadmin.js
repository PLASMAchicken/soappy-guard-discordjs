const Discord = require("discord.js");
const fs = require('fs');


module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(kUser){
        var obj = require('../config/botconfig.json');
        
        obj.botadminid[obj.botadminid.length] = kUser.id
        fs.writeFile('../config/botconfig.json', JSON.stringify(obj, null, 4), function (err) {
        if(err) console.log(err);
        if(!err) return message.reply(`Added ${kUser} to Bot Admin List!`)
   })}else
   {message.channel.send('Specify User!')}
}

module.exports.help = {
    name: "addbotadmin",
    description: "Add Bot Admin!",
    usage: "addbotadmin <@>",
    botowner: true
}
