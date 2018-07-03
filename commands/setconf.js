const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args, guildConf) => {
    const adminRole = message.guild.roles.find("name", guildConf.adminRole);
    if (!adminRole || !message.member.roles.has(adminRole.id)) return errors.noPerms(message, guildConf.adminRole + 'role')
    if (!args[0] || args[0 == "help"]) return message.reply(`Usage: ${this.help.name} <key> <new value>`);
    const key = args.shift();
    const value = args.join(' ')
    if(!guildConf.hasOwnProperty(key)) return message.reply("This key is not in the configuration.");
    guildConf[key] = value;
    bot.guildsettings.set(message.guild.id, guildConf)
    let sEmbed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle(`${key} set!`)
        .setDescription(`Guild configuration item ${key} has been changed to:\n\`\`\`${value}\`\`\``);
    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "setconf",
    description: "Sets the ServerSpecific Settings",
    usage: "setconf <key> <new value>",
    disableindm: true
}