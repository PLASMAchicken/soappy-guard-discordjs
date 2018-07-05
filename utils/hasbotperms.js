let botconfig = require("../config/botconfig.json");

module.exports.owner = (user, message) => {
    for (var i = 0; i < botconfig.botowners.length; i++) {
        if (botconfig.botowners[i] === user.id) return true;
    }
    if (message) message.channel.send("Boi this is only for ma Owna!");
    return false;
}

module.exports.admin = (user, message) => {
    for (var i = 0; i < botconfig.botadmins.length; i++) {
        if (botconfig.botadmins[i] === user.id) return true;
    }
    for (var i = 0; i < botconfig.botowners.length; i++) {
        if (botconfig.botowners[i] === user.id) return true;
    }
    if (message) message.channel.send("Boi this is only for ma Owna or Admins!");
    return false;
}