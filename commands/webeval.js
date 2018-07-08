function clean(text) {
	if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
	else {return text;}
}
const errors = require('../utils/errors.js');

const message = [];
const bot = [];
const args = [];
const whitelist = [];

module.exports.run = async (bote, messagee, argsee) => {
	require('crypto').randomBytes(100, function(err, buffer) {
		const evalid = buffer.toString('hex');
		bot[evalid] = bote;
		message[evalid] = messagee;
		args[evalid] = argsee;
		message[evalid].author.send(`Server is running on http://localhost:27015/eval/?evalid=${evalid}`);
		message[evalid].channel.send('Started Server');
		whitelist.shift();
		whitelist.push(evalid);
	});


};

const Discord = require('discord.js');


const express = require('express');
const evalRouter = express.Router();

evalRouter.get('/', function(req, res, next) {
	if (whitelist.indexOf(req.query.evalid) > -1) {
		res.render('eval', {
			evalid: req.query.evalid,
			channel: message[req.query.evalid].channel.type == 'dm' ? message[req.query.evalid].author.tag : '#' + message[req.query.evalid].channel.name,
		});
	}
	else {
		res.end('Wrong Eval ID!');
	}

});

evalRouter.get('/exec', function(req, res, next) {
	if (whitelist.indexOf(req.query.evalid) > -1) {

		const response = {
			code : req.query.code,
			evalid : req.query.evalid,
			stealth: req.query.stealth,
		};
		console.log(response);
		try {
			let code = response.code;
			code = code.replace(/message/g, 'message[response.evalid]');
			code = code.replace(/bot/g, 'bot[response.evalid]');
			code = code.replace(/msg/g, 'message[response.evalid]');
			code = code.replace(/client/g, 'bot[response.evalid]');
			let evaled = eval(code);

			if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}

			res.end(clean(evaled), { code:'xl' }).catch(err => errors.err(message, err));
		}
		catch (err) {
			res.end(`ERROR\n${clean(err)}`);
		}
	}
	else {
		res.end('Wrong Eval ID!');
	}


});
module.exports.evalRouter = evalRouter;


module.exports.help = {
	name: 'webeval',
	description: 'eval a command!',
	usage: 'webeval',
	botowner: true,
	aliases: ['we'],
};
