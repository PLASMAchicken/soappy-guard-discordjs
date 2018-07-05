module.exports.run = async (bot, message, args) => {
	const role = message.mentions.roles.first() || message.guild.roles.find('name', args[0]);
	message.guild.channels.forEach(async (channel) => {
		await channel.overwritePermissions(role, {
			CREATE_INSTANT_INVITE: false,
			KICK_MEMBERS: false,
			BAN_MEMBERS: false,
			ADMINISTRATOR: false,
			MANAGE_CHANNELS: false,
			MANAGE_GUILD: false,
			ADD_REACTIONS: false,
			READ_MESSAGES: false,
			SEND_MESSAGES: false,
			SEND_TTS_MESSAGES: false,
			MANAGE_MESSAGES: false,
			EMBED_LINKS: false,
			ATTACH_FILES: false,
			READ_MESSAGE_HISTORY: false,
			MENTION_EVERYONE: false,
			EXTERNAL_EMOJIS: false,
			CONNECT: false,
			SPEAK: false,
			MUTE_MEMBERS: false,
			DEAFEN_MEMBERS: false,
			MOVE_MEMBERS: false,
			USE_VAD: false,
			CHANGE_NICKNAME: false,
			MANAGE_NICKNAMES: false,
			MANAGE_ROLES_OR_PERMISSIONS: false,
			MANAGE_WEBHOOKS: false,
			MANAGE_EMOJIS: false,
		}, `Disabled all permissions for all channels of ${role.name} role`);
	});
	message.channel.send(`Removed all perms from ${role.name}`);
};

module.exports.help = {
	name: 'removeperms',
	description: 'removes perms from everyone role in every channel!',
	usage: 'removeperms',
	disableindm: true,
	botowner: true,
};
