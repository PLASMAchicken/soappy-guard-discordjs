let botconfig = require("../config/botconfig.json");
const errors = require("../utils/errors.js"); // Error Handler

module.exports = (bot, notify, err) => {
    botconfig[notify].forEach(notify => {
        bot.fetchUser(notify).then((dm) => errors.dm(dm, err)).catch(err => {
            console.error(`${notify} could not been notified because of ${err}!`)
            throw process.exit()
        })
    });
}