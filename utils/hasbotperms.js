let botconfig = require("../config/botconfig.json");

module.exports.owner = (message) => {
        for (var i = 0; i < botconfig.botownerid.length; i++) {
            if (botconfig.botownerid[i] === message.author.id) return true;
        }
        return message.channel.send("Boi this is only for ma Owna!");
}

module.exports.admin = (message) => {
    for (var i = 0; i < botconfig.botadminid.length; i++) {
        if (botconfig.botadminid[i] === message.author.id) return true;
    }
    for (var i = 0; i < botconfig.botownerid.length; i++) {
        if (botconfig.botownerid[i] === message.author.id) return true;
    }
    return message.channel.send("Boi this is only for ma Owna or Admins!");
}