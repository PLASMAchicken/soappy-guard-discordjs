const Discord = require("discord.js");
const tempmessage = require('../utils/tempmessage.js');
const colorer = require("../config/color.json");
const botconfig = require("../config/botconfig.json");
const agree = "✅";
const disagree = "❎";


let poolembed = new Discord.RichEmbed()
        .setTitle("Pool")
        .setFooter(`Use ${agree} or ${disagree} reactions to vote`)
        .setColor(colorer.pool);




module.exports.run = async (bot, message, args) => {
    var pool = args.join(' ');
  if (!pool) return tempmessage(message, "Please provide a pool to vote on!");
    poolembed.setDescription(pool);

   let msg = await message.channel.send(poolembed);
   await msg.react(agree);
   await msg.react(disagree);

   const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 16000});

var agreec = reactions.get(agree).count-1;
var disagreec = reactions.get(disagree).count-1;

   poolembed.setDescription(`Voting complete! \n\n${agree}: ${agreec}\n${disagree}: ${disagreec}`);
    msg.edit(poolembed);
    msg.clearReactions();



}
module.exports.help = {
    name: "pool",
    description: "Creates a Pool for People to vote on!",
    usage: "pool <pool>",
    disableindm: true
}
