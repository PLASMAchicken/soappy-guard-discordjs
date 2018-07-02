const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    const guildConf = bot.guildsettings.get(message.guild.id) || bot.defaultguildsettings;
    const staffRole = message.guild.roles.find("name", guildConf.adminRole);
    if (!staffRole || !message.member.roles.has(staffRole.id)) return errors.noPerms(message, guildConf.staffRole + 'role')
    let sEmbed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle(`Guild Configuration:`)
        .setDescription("```" +  require("util").inspect(guildConf) + "```");
    message.channel.send(sEmbed);

}

module.exports.help = {
    name: "serverconf",
    description: "Lists ServerConf",
    usage: "serverconf",
    disableindm: true
}