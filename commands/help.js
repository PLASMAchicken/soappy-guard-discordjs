
const botconfig = require("../config/botconfig.json");
const colorer = require("../config/color.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({});

const helpembed = require("../utils/help.js");



module.exports.run = async (bot, message, args) => {
   helpembed.send(message)
}

module.exports.help = {
    name: "help",
    description: "Shows Help Page",
    usage: "help"
}
