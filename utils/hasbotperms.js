let botconfig = require("../config/botconfig.json");

module.exports.owner = (user, message) => {
    for (var i = 0; i < botconfig.botownerid.length; i++) {
        if (botconfig.botownerid[i] === user.id) return true;
    }
    if (message) message.channel.send("Boi this is only for ma Owna or Admins!");
    return false;
}

module.exports.admin = (user, message) => {
    for (var i = 0; i < botconfig.botadminid.length; i++) {
        if (botconfig.botadminid[i] === user.id) return true;
    }
    for (var i = 0; i < botconfig.botownerid.length; i++) {
        if (botconfig.botownerid[i] === user.id) return true;
    }
    if (message) message.channel.send("Boi this is only for ma Owna or Admins!");
    return false;
}