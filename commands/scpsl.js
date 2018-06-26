

const Discord = require("discord.js");
const colorer = require("../config/color.json")
var request = require('request');
var cheerio = require('cheerio');



module.exports.run = async (bot, message, args) => {
    
    
    
    var $ = require('cheerio')
    
    
    var ip = "185.177.23.120";


    let sicon = message.guild.iconURL;
    let botembed = new Discord.RichEmbed()
    .setThumbnail(sicon)
    .setTimestamp(new Date)
    .setFooter("SCP Server Tracker by @PLASMAchicken#7236 ", bot.user.displayAvatarURL)
    .setAuthor("SCP:SL EU WEST 24/7 Servers", sicon);
    
    request('https://kigen.co/scpsl/browser.php?table=y', function (err, resp, tbody) {
        if (!err) {
            const $ = cheerio.load(tbody);
            var data = $('tr').children().text();
            var datac = $('tr').children().text();
            datac = datac.split(ip);
            if (datac[1] == undefined) {
                botembed.setColor(colorer.red);
                botembed.setTitle("No Servers Online");
            }else{
            var kmdat = (datac[1].slice((datac.indexOf("km") - 4), (datac.indexOf("km")-1))+'km');
            data = data.slice(data.indexOf(ip), data.lastIndexOf(kmdat));
            data = data.split(kmdat);
            var replacer = ['185.177.23.120:', '<size=15>FF</size>', '5.1.1', '2.0.13', '<size=1>SM</size>', '\t', "\t", 'VBEa4xQY', '2.0.13'];

            for (var i = 0; i < replacer.length; i++) {
                for (var ic = 0; ic < data.length; ic++) {

                    data[ic] = data[ic].replace(replacer[i], '');

                }
            }

            var datanaw = []
            for (var ib = 0; ib < data.length; ib++) {

                datanaw[ib] = data[ib].split("|")



                for (var ibb = 0; ibb < datanaw[ib].length; ibb++) {
                    datanaw[ib][ibb] = datanaw[ib][ibb].split("(")



                    for (var ibbb = 0; ibbb < datanaw[ib][ibb].length; ibbb++) {
                        datanaw[ib][ibb][ibbb] = datanaw[ib][ibb][ibbb].split("[")
                        datanaw[ib][ibb][ibbb][1] = "[" + datanaw[ib][ibb][ibbb][1]

                    }
                }
            }



            datanaw.sort();


   
            if (datanaw[0][4] == undefined) {
                

                botembed.setColor(colorer.red);
                botembed.setTitle("No Servers Online");




            } else { 


                botembed.setColor(colorer.dark);
                
               
                for (var ad = 0; ad < data.length; ad++) {
                    botembed.addField(datanaw[ad][0][0][1] + datanaw[ad][4][0][0] + datanaw[ad][4][0][1], datanaw[ad][2][0][0] + datanaw[ad][3][0][0]);
                } 
            }}
            message.channel.send(botembed);
            
                
        }
    });

    }

module.exports.help = {
  name:"scpsl",
  hideinhelp: true,
  disableindm: true
}