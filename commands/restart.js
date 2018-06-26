const botconfig = require("../config/botconfig.json");
//const tokenfile = require("../config/token.json");
const Discord = require("discord.js");
const color = require("../config/color.json");
const bot = new Discord.Client({});



module.exports.run = async (bot, message, args) => {
    let restartembed = new Discord.RichEmbed()
        .setColor(color.restart)
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Status")
        .setDescription(`Please wait ${bot.user.username} is restarting`);
    message.channel.send(restartembed);




    bot.destroy()
        .then(() => bot.login(process.env.token));


   
    restartembed.setDescription(`${bot.user.username} has restarted!`);
    message.channel.send(restartembed)



}

module.exports.help = {
    name: "restart",
    description: "Restarts the Bot",
    usage: "restart",
    botowner: true
}


