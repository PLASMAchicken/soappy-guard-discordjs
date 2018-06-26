const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setDescription(`[[Invite Bot]](https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`)
    message.channel.send(embed)
}

module.exports.help = {
    name: "invite",
    description: "Add Bot to Server!",
    usage: "invite",
    botowner: true
}
