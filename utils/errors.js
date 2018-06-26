const Discord = require("discord.js");
let colorer = require("../config/color.json");
let codeblock = "```";

let errorembed = new Discord.RichEmbed()
errorembed.setColor(colorer.error)
errorembed.setTitle("While exectuting the last command a Error occured!")
errorembed.setFooter('Error occured')
errorembed.setTimestamp( new Date);


module.exports.noPerms = (message, perm) => {
    errorembed.setDescription(`Permission needed!\n${codeblock}Markdown\n# You are missing ${perm} to do this action!${codeblock}`);
    message.channel.send(errorembed);
}

module.exports.equalPerms = (message, user, perms) => {
    errorembed.setDescription(`${user} has perms`, perms);
    message.channel.send(errorembed);
}

module.exports.botuser = (message, action) => {
    errorembed.setDescription(`You cannot ${action} a bot. \n${codeblock}Markdown\n# You tried to ${action} a bot!${codeblock}`)
    message.channel.send(errorembed);
}

module.exports.cantfindUser = (message, invaliduser) => {
    errorembed.setDescription(`User was not found!\n${codeblock}Markdown\n# User ${invaliduser} was not found!${codeblock}`);
    message.channel.send(errorembed);
}

module.exports.noReason = (message) => {
    errorembed.setDescription(`Reason cannot be emtpy!\n${codeblock}Markdown\n# The reason cannot be empty!\n# Please supply a reason!${codeblock}`);
    message.channel.send(errorembed)
    }
module.exports.err = (message, err) =>{
    errorembed.setDescription(`Unexpected error!\n\t Please contact Bot developer!\n${codeblock}Markdown\n# Error caused by ${err.name} : ${err.message}!${codeblock}`);
    message.channel.send(errorembed);
}
module.exports.dm = (message, err) =>{
    errorembed.setDescription(`Unexpected error!\n\t Please contact Bot developer!\n${codeblock}Markdown\n# Error caused by ${err.name} : ${err.message}!${codeblock}`);
    message.send(errorembed);
}