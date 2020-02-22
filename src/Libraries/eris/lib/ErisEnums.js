/**
 * @type {{
 * CHANNEL_CREATE: 'channelCreate'
 * CHANNEL_DELETE: 'channelDelete'
 * CHANNEL_UPDATE: 'channelUpdate'
 * CHANNEL_PIN_UPDATE: 'channelPinUpdate'
 * GUILD_AVAILABLE: 'guildAvailable'
 * GUILD_CREATE: 'guildCreate'
 * GUILD_DELETE: 'guildDelete'
 * GUILD_EMOJIS_UPDATE: 'guildEmojisUpdate'
 * GUILD_BAN_ADD: 'guildBanAdd'
 * GUILD_BAN_REMOVE: 'guildBanRemove'
 * GUILD_MEMBER_ADD: 'guildMemberAdd'
 * GUILD_MEMBER_CHUNK: 'guildMemberChunk'
 * GUILD_MEMBER_REMOVE: 'guildMemberRemove'
 * GUILD_MEMBER_UPDATE: 'guildMemberUpdate'
 * GUILD_ROLE_CREATE: 'roleCreate'
 * GUILD_ROLE_DELETE: 'roleDelete'
 * GUILD_ROLE_UPDATE: 'roleUpdate'
 * GUILD_UNAVAILABLE: 'guildUnavailable'
 * GUILD_UPDATE: 'guildUpdate'
 * INVITE_CREATE: 'inviteCreate'
 * INIVTE_DELETE: 'inviteDelete'
 * MESSAGE_CREATE: 'messageCreate'
 * MESSAGE_DELETE_BULK: 'messageDeleteBulk'
 * MESSAGE_DELETE: 'messageDelete'
 * MESSAGE_REACTION_ADD: 'messageReactionAdd'
 * MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
 * MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll'
 * MESSAGE_UPDATE: 'messageUpdate'
 * PRESENCE_UPDATE: 'presenceUpdate'
 * SHARD_DISCONNECT: 'shardDisconnect'
 * SHARD_PRE_READY: 'shardPreReady'
 * SHARD_READY: 'shardReady'
 * SHARD_RESUME: 'shardResume'
 * TYPING_START: 'typingStart'
 * UNAVAILABLE_GUILD_CREATE: 'unavailableGuildCreate'
 * USER_UPDATE: 'userUpdate'
 * VOICE_CHANNEL_JOIN: 'voicecChannelJoin'
 * VOICE_CHANNEL_LEAVE: 'voiceChannelLeave'
 * VOICE_CHANNEL_SWITCH: 'voiceChannelSwitch'
 * VOICE_STATE_UPDATE: 'voiceStateUpdate'
 * WEBHOOKS_UPDATE: 'webhookUpdate'
 * UNKNOWN: 'unknown'
 * CONNECT: 'connect'
 * DISCONNECT: 'disconnect'
 * ERROR: 'error'
 * WARN: 'warn'
 * DEBUG: 'debug'
 * READY: 'ready'
 * HELLO: 'hello'
 * RATE_LIMIT: 'rateLimit'
 * RAW_WS: 'rawWS'
 * }}
 * @enum {String}
 */
export const EVENTS = {
    CHANNEL_CREATE: 'channelCreate',
    CHANNEL_DELETE: 'channelDelete',
    CHANNEL_PIN_UPDATE: 'channelPinUpdate',
    CHANNEL_UPDATE: 'channelUpdate',
    GUILD_AVAILABLE: 'guildAvailable',
    GUILD_BAN_ADD: 'guildBanAdd',
    GUILD_BAN_REMOVE: 'guildBanRemove',
    GUILD_CREATE: 'guildCreate',
    GUILD_DELETE: 'guildDelete',
    GUILD_EMOJIS_UPDATE: 'guildEmojisUpdate',
    GUILD_MEMBER_ADD: 'guildMemberAdd',
    GUILD_MEMBER_CHUNK: 'guildMemberChunk',
    GUILD_MEMBER_REMOVE: 'guildMemberRemove',
    GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
    GUILD_ROLE_CREATE: 'roleCreate',
    GUILD_ROLE_DELETE: 'roleDelete',
    GUILD_ROLE_UPDATE: 'roleUpdate',
    GUILD_UNAVAILABLE: 'guildUnavailable',
    GUILD_UPDATE: 'guildUpdate',
    INVITE_CREATE: 'inviteCreate',
    INIVTE_DELETE: 'inviteDelete',
    MESSAGE_CREATE: 'messageCreate',
    MESSAGE_DELETE_BULK: 'messageDeleteBulk',
    MESSAGE_DELETE: 'messageDelete',
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
    MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll',
    MESSAGE_UPDATE: 'messageUpdate',
    PRESENCE_UPDATE: 'presenceUpdate',
    SHARD_DISCONNECT: 'shardDisconnect',
    SHARD_PRE_READY: 'shardPreReady',
    SHARD_READY: 'shardReady',
    SHARD_RESUME: 'shardResume',
    TYPING_START: 'typingStart',
    UNAVAILABLE_GUILD_CREATE: 'unavailableGuildCreate',
    USER_UPDATE: 'userUpdate',
    VOICE_CHANNEL_JOIN: 'voicecChannelJoin',
    VOICE_CHANNEL_LEAVE: 'voiceChannelLeave',
    VOICE_CHANNEL_SWITCH: 'voiceChannelSwitch',
    VOICE_STATE_UPDATE: 'voiceStateUpdate',
    WEBHOOKS_UPDATE: 'webhookUpdate',
    UNKNOWN: 'unknown',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    ERROR: 'error',
    WARN: 'warn',
    DEBUG: 'debug',
    READY: 'ready',
    HELLO: 'hello',
    RATE_LIMIT: 'rateLimit',
    RAW_WS: 'rawWS',
};

/**
 * @type {{
 * CREATE_INSTANT_INVITE: 'createInstantInvite'
 * KICK_MEMBERS: 'kickMembers'
 * BAN_MEMBERS: 'banMembers'
 * ADMINISTRATOR: 'administrator'
 * MANAGE_CHANNELS: 'manageChannels'
 * MANAGE_GUILD: 'manageGuild'
 * ADD_REACTIONS: 'addReactions'
 * VIEW_AUDIT_LOG: 'viewAuditLog'
 * PRIORITY_SPEAKER: 'voicePrioritySpeaker'
 * STREAM: 'stream'
 * VIEW_CHANNEL: 'readMessages'
 * SEND_MESSAGES: 'sendMessages'
 * SEND_TTS_MESSAGES: 'sendTTSMessages'
 * MANAGE_MESSAGES: 'manageMessages'
 * EMBED_LINKS: 'embedLinks'
 * ATTACH_FILES: 'attachFiles'
 * READ_MESSAGE_HISTORY: 'readMessageHistory'
 * MENTION_EVERYONE: 'mentionEveryone'
 * USE_EXTERNAL_EMOJIS: 'externalEmojis'
 * VIEW_GUILD_ANALYTICS: 'viewGuildAnalytics'
 * CONNECT: 'voiceConnect'
 * SPEAK: 'voiceSpeak'
 * MUTE_MEMBERS: 'voiceMuteMembers'
 * DEAFEN_MEMBERS: 'voiceDeafenMembers'
 * MOVE_MEMBERS: 'voiceMoveMembers'
 * USE_VAD: 'voiceUseVAD'
 * CHANGE_NICKNAME: 'changeNickname'
 * MANAGE_NICKNAMES: 'manageNicknames'
 * MANAGE_ROLES: 'manageRoles'
 * MANAGE_WEBHOOKS: 'manageWebhooks'
 * MANAGE_EMOJIS: 'manageEmojis'
 * }}
 * @enum {String}
 */
export const DISCORD_LIB_PERMISSIONS = {
    CREATE_INSTANT_INVITE: 'createInstantInvite',
    KICK_MEMBERS: 'kickMembers',
    BAN_MEMBERS: 'banMembers',
    ADMINISTRATOR: 'administrator',
    MANAGE_CHANNELS: 'manageChannels',
    MANAGE_GUILD: 'manageGuild',
    ADD_REACTIONS: 'addReactions',
    VIEW_AUDIT_LOG: 'viewAuditLog',
    PRIORITY_SPEAKER: 'voicePrioritySpeaker',
    STREAM: 'stream',
    VIEW_CHANNEL: 'readMessages',
    SEND_MESSAGES: 'sendMessages',
    SEND_TTS_MESSAGES: 'sendTTSMessages',
    MANAGE_MESSAGES: 'manageMessages',
    EMBED_LINKS: 'embedLinks',
    ATTACH_FILES: 'attachFiles',
    READ_MESSAGE_HISTORY: 'readMessageHistory',
    MENTION_EVERYONE: 'mentionEveryone',
    USE_EXTERNAL_EMOJIS: 'externalEmojis',
    VIEW_GUILD_ANALYTICS: 'viewGuildAnalytics',
    CONNECT: 'voiceConnect',
    SPEAK: 'voiceSpeak',
    MUTE_MEMBERS: 'voiceMuteMembers',
    DEAFEN_MEMBERS: 'voiceDeafenMembers',
    MOVE_MEMBERS: 'voiceMoveMembers',
    USE_VAD: 'voiceUseVAD',
    CHANGE_NICKNAME: 'changeNickname',
    MANAGE_NICKNAMES: 'manageNicknames',
    MANAGE_ROLES: 'manageRoles',
    MANAGE_WEBHOOKS: 'manageWebhooks',
    MANAGE_EMOJIS: 'manageEmojis',
};

/**
 * @type {[
    'createInstantInvite',
    'kickMembers',
    'banMembers',
    'administrator',
    'manageChannels',
    'manageGuild',
    'addReactions',
    'viewAuditLog',
    'voicePrioritySpeaker',
    'stream',
    'readMessages',
    'sendMessages',
    'sendTTSMessages',
    'manageMessages',
    'embedLinks',
    'attachFiles',
    'readMessageHistory',
    'mentionEveryone',
    'externalEmojis',
    'viewGuildAnalytics',
    'voiceConnect',
    'voiceSpeak',
    'voiceMuteMembers',
    'voiceDeafenMembers',
    'voiceMoveMembers',
    'voiceUseVAD',
    'changeNickname',
    'manageNicknames',
    'manageRoles',
    'manageWebhooks',
    'manageEmojis',
 * ]}
 */
export const PERMISSIONS = [
    'createInstantInvite',
    'kickMembers',
    'banMembers',
    'administrator',
    'manageChannels',
    'manageGuild',
    'addReactions',
    'viewAuditLog',
    'voicePrioritySpeaker',
    'stream',
    'readMessages',
    'sendMessages',
    'sendTTSMessages',
    'manageMessages',
    'embedLinks',
    'attachFiles',
    'readMessageHistory',
    'mentionEveryone',
    'externalEmojis',
    'viewGuildAnalytics',
    'voiceConnect',
    'voiceSpeak',
    'voiceMuteMembers',
    'voiceDeafenMembers',
    'voiceMoveMembers',
    'voiceUseVAD',
    'changeNickname',
    'manageNicknames',
    'manageRoles',
    'manageWebhooks',
    'manageEmojis',
];

/**
 * @type {{
 * createInstantInvite: 'Create Instant Invite'
 * kickMembers: 'Kick Members'
 * banMembers: 'Ban Members'
 * administrator: 'Administrator'
 * manageChannels: 'Manage Channels'
 * manageGuild: 'Manage Guild'
 * addReactions: 'Add Reactions'
 * viewAuditLog: 'View Audit Log'
 * voicePrioritySpeaker: 'Priority Speaker'
 * stream: 'Stream'
 * readMessages: 'Read Messages'
 * sendMessages: 'Send Messages'
 * sendTTSMessages: 'Send TTS Messages'
 * manageMessages: 'Manage Messages'
 * embedLinks: 'Embed Links'
 * attachFiles: 'Attach Files'
 * readMessageHistory: 'Read Message History'
 * mentionEveryone: 'Mention Everyone'
 * externalEmojis: 'External Emojis'
 * viewGuildAnalytics: 'View Guild Analytics'
 * voiceConnect: 'Voice Connect'
 * voiceSpeak: 'Voice Speak'
 * voiceMuteMembers: 'Voice Mute Members'
 * voiceDeafenMembers: 'Voice Deafen Members'
 * voiceMoveMembers: 'Voice Move Members'
 * voiceUseVAD: 'Voice Use VAD'
 * changeNickname: 'Change Nickname'
 * manageNicknames: 'Manage Nicknames'
 * manageRoles: 'Manage Roles'
 * manageWebhooks: 'Manage Webhooks'
 * manageEmojis: 'Manage Emojis'
 * }}
 * @enum {String}
 */
export const PERMISSIONS_NAMES = {
    createInstantInvite: 'Create Instant Invite',
    kickMembers: 'Kick Members',
    banMembers: 'Ban Members',
    administrator: 'Administrator',
    manageChannels: 'Manage Channels',
    manageGuild: 'Manage Guild',
    addReactions: 'Add Reactions',
    viewAuditLog: 'View Audit Log',
    voicePrioritySpeaker: 'Priority Speaker',
    stream: 'Stream',
    readMessages: 'Read Messages',
    sendMessages: 'Send Messages',
    sendTTSMessages: 'Send TTS Messages',
    manageMessages: 'Manage Messages',
    embedLinks: 'Embed Links',
    attachFiles: 'Attach Files',
    readMessageHistory: 'Read Message History',
    mentionEveryone: 'Mention Everyone',
    externalEmojis: 'External Emojis',
    viewGuildAnalytics: 'View Guild Analytics',
    voiceConnect: 'Voice Connect',
    voiceSpeak: 'Voice Speak',
    voiceMuteMembers: 'Voice Mute Members',
    voiceDeafenMembers: 'Voice Deafen Members',
    voiceMoveMembers: 'Voice Move Members',
    voiceUseVAD: 'Voice Use VAD',
    changeNickname: 'Change Nickname',
    manageNicknames: 'Manage Nicknames',
    manageRoles: 'Manage Roles',
    manageWebhooks: 'Manage Webhooks',
    manageEmojis: 'Manage Emojis',
};

export default {
    EVENTS,
    DISCORD_LIB_PERMISSIONS,
    PERMISSIONS,
    PERMISSIONS_NAMES,
};
