
const botconfig = require("../config/botconfig.json");
const Discord = require("discord.js");
const reactions = require("../utils/reactions.js");
const tempmessage = require('../utils/tempmessage.js');

var data = [];


    module.exports.handle = async (messageReaction, user, bot) => {
        let menu = data[messageReaction.message.id]
        if (!menu) return; // No event for this message: stop
        if (user.id != menu[1]) 
        {
            if(user.id != bot.user.id){
            messageReaction.remove(user);
            return tempmessage(messageReaction.message, "Please do not select things in other peoples menu! <@" + user.id + ">" );
        }else return;
    };                                        
        exec(messageReaction, user, menu, bot);                                       // Found event for Message => get emoji to text => exec it
    }

    module.exports.add = async (message, event, authorid) => {
        data[message.id] = [],[];
        data[message.id][0] = event;
        data[message.id][1] = authorid;
    }

    function exec(messageReaction, user, menu, bot) {
        console.log(menu)
        let eventtoexec = bot.commands.get(menu[0]);
        if(eventtoexec){
        switch(messageReaction.emoji.name) {
            case reactions.one.emoji:
                if(eventtoexec.one) eventtoexec.one(messageReaction, user);
                break;
            case reactions.two.emoji:
                if(eventtoexec.two) eventtoexec.two(messageReaction, user);
                break;
            case reactions.three.emoji:
                if(eventtoexec.three) eventtoexec.three(messageReaction, user);
                break;
            case reactions.four.emoji:
                if(eventtoexec.four) eventtoexec.four(messageReaction, user);
                break;
            case reactions.five.emoji:
                if(eventtoexec.five) eventtoexec.five(messageReaction, user);
                break;                
            case reactions.six.emoji:
                if(eventtoexec.six) eventtoexec.six(messageReaction, user);
                break;
            case reactions.seven.emoji:
                if(eventtoexec.seven) eventtoexec.seven(messageReaction, user);
                break;
            case reactions.eight.emoji:
                if(eventtoexec.eight) eventtoexec.eight(messageReaction, user);
                break;
            case reactions.nine.emoji:
                if(eventtoexec.nine) eventtoexec.nine(messageReaction, user);
                break;
            default:
                return messageReaction, user.message.channel.send("FAILED")
        }}
        
    }