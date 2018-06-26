const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("PING IS GETTING REQUESTED PLEASE STAND BY!");
        await m.edit(`DISCORDJS.PLAY:Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`).then(m => m.channel.send(`Latency between receiving and sending is ${m.editedTimestamp - message.createdTimestamp}ms`))
}

module.exports.help = {
    name: "ping",
    description: "Pong!",
    usage: "ping"
}
