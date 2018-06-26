const Discord = require("discord.js");
const botconfig = require("../config/botconfig.json");
const colorer = require("../config/color.json");

let tempembed = new Discord.RichEmbed()
    .setTitle("TempEmbed")
    .setTimestamp(new Date)
    .setColor(colorer.temp);
    
    module.exports = (message, tempmsg) => {
      tempembed.setDescription(tempmsg);
    message.channel.send(tempembed)
     .then(message => setTimeout(() => message.delete(), botconfig.tempmsg));
} 