module.exports = (args) => {
	let argsmsg = args.join(' ');
	argsmsg = argsmsg.split(' | ');
	const argsmsgs = [''];
	for (let i = 0; i < argsmsg.length; i++) {
		argsmsgs[i] = argsmsg[i].split('=');
		console.log(argsmsgs[i]);
	}
	return argsmsgs;
};
