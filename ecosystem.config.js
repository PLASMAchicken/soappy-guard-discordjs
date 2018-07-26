module.exports = {
	apps : [{
		name      : 'soappy-guard-discordjs-bot',
		script    : 'start.js',
		env: {
			NODE_ENV: 'development',
		},
		env_production : {
			NODE_ENV: 'production',
		},
	}],

	deploy : {
		production : {
			user : 'node',
			ref  : 'origin/master',
			repo : 'git@github.com:PLASMAchicken/soappy-guard-discordjs.git',
		},
	},
};
