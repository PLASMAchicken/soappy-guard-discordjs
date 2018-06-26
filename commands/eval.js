function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
let errors = require("../utils/errors.js");
module.exports.run = async (bot, message, args) => {
  try {
    const code = args.join(" ");
    let evaled = eval(code)

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"xl"}).catch(err => errors.err(message, err));
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

}

module.exports.help = {
    name: "eval",
    description: "eval a command!",
    usage: "eval <@>",
    botowner: true
}
