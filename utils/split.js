module.exports = (args) => {
	let argsmsg = args.join(' ');
	argsmsg = argsmsg.split(' | ');
	console.log(argsmsg);
	const argsmsgs = [''];
	for (let i = 0; i < argsmsg.length; i++) {
		argsmsgs[i] = argsmsg[i].split('=');
		console.log(argsmsgs[i]);
	}
	return argsmsgs;
};
