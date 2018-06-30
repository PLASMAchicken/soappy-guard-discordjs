const hasbotperms = require("../utils/hasbotperms.js")
let errors = require("../utils/errors.js");
const Discord = require("discord.js");
const request = require('snekfetch');
let botconfig = require("../config/botconfig.json");
const vm = require('vm')

const TIMEOUT = 6000;

const cblockre = /(^```js)|(```$)/g;






module.exports.run = async (bot, message, args) => {

if(hasbotperms.owner(message.author) === true){
    
  try {
    if(args[0] == "secured"){
      args.shift()
      this.secured = true;
    }
    const code = args.join(" ");
    let evaled = eval(code)

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
      await respond(message, evaled, bot, this.secured);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
  }

}else{
  'use strict';
  let content = args.join(" ");
  console.log(content)
  
  if (cblockre.test(content)) {
    content = content.replace(cblockre, '').trim();
  }

  header(message, content);

  try {
    const result = await vm.runInNewContext(content)
    await respond(message, result.toString(), bot);
  } catch (err) {
    header(message, err);
    await respond(message, err.message);
  }
}


}


module.exports.help = {
    name: "eval",
    description: "eval a command!",
    usage: "eval <@>",
}

const header = (m, x) => {
  const H = `========== ${m.id} ==========`;
  console.log(H);
  if (x) {
    console.log(x);
    console.log(H);
  }
};

async function respond(message, result, bot, secured) {
  header(message);
  const wrapped = `${message.author}\n\`\`\`js\n${result}\n\`\`\``;
  if (wrapped.length >= 2000) {
    if(secured == true) return message.reply("message was too long in secured mode!")
    const key = await request.post(bot.haste + '/documents')
      .send(result)
      .then((r) => r.body.key);
    await message.reply(`**Output was too long and was uploaded to ${bot.haste}/${key}.js**`);
    console.log('hasted', `${bot.haste}/${key}.js`);
  } else {
    await message.channel.send(wrapped);
    console.log(result);
  }
  header(message);
}

