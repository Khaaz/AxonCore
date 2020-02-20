/**
 * @type {{
 * RATE_LIMIT: 'rateLimit'
 * READY: 'ready'
 * RESUME: 'resume'
 * GUILD_CREATE: 'guildCreate'
 * GUILD_DELETE: 'guildDelete'
 * GUILD_UPDATE: 'guildUpdate'
 * GUILD_UNAVAILABLE: 'guildUnavailable'
 * GUILD_AVAILABLE: 'guildAvailable'
 * GUILD_MEMBER_ADD: 'guildMemberAdd'
 * GUILD_MEMBER_REMOVE: 'guildMemberRemove'
 * GUILD_MEMBER_UPDATE: 'guildMemberUpdate'
 * GUILD_MEMBER_AVAILABLE: 'guildMemberAvailable'
 * GUILD_MEMBER_SPEAKING: 'guildMemberSpeaking'
 * GUILD_MEMBERS_CHUNK: 'guildMembersChunk'
 * GUILD_INTEGRATIONS_UPDATE: 'guildIntegrationsUpdate'
 * GUILD_ROLE_CREATE: 'roleCreate'
 * GUILD_ROLE_DELETE: 'roleDelete'
 * GUILD_ROLE_UPDATE: 'roleUpdate'
 * GUILD_EMOJI_CREATE: 'emojiCreate'
 * GUILD_EMOJI_DELETE: 'emojiDelete'
 * GUILD_EMOJI_UPDATE: 'emojiUpdate'
 * GUILD_BAN_ADD: 'guildBanAdd'
 * GUILD_BAN_REMOVE: 'guildBanRemove'
 * CHANNEL_CREATE: 'channelCreate'
 * CHANNEL_DELETE: 'channelDelete'
 * CHANNEL_UPDATE: 'channelUpdate'
 * CHANNEL_PINS_UPDATE: 'channelPinsUpdate'
 * MESSAGE_CREATE: 'message'
 * MESSAGE_DELETE: 'messageDelete'
 * MESSAGE_UPDATE: 'messageUpdate'
 * MESSAGE_BULK_DELETE: 'messageDeleteBulk'
 * MESSAGE_REACTION_ADD: 'messageReactionAdd'
 * MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
 * MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll'
 * USER_UPDATE: 'userUpdate'
 * USER_NOTE_UPDATE: 'userNoteUpdate'
 * USER_SETTINGS_UPDATE: 'clientUserSettingsUpdate'
 * USER_GUILD_SETTINGS_UPDATE: 'clientUserGuildSettingsUpdate'
 * PRESENCE_UPDATE: 'presenceUpdate'
 * VOICE_STATE_UPDATE: 'voiceStateUpdate'
 * TYPING_START: 'typingStart'
 * TYPING_STOP: 'typingStop'
 * WEBHOOKS_UPDATE: 'webhookUpdate'
 * DISCONNECT: 'disconnect'
 * RECONNECTING: 'reconnecting'
 * ERROR: 'error'
 * WARN: 'warn'
 * DEBUG: 'debug'
 * }}
 * @enum {String}
 */
export const EVENTS = {
    RATE_LIMIT: 'rateLimit',
    READY: 'ready',
    RESUME: 'resume',
    GUILD_CREATE: 'guildCreate',
    GUILD_DELETE: 'guildDelete',
    GUILD_UPDATE: 'guildUpdate',
    GUILD_UNAVAILABLE: 'guildUnavailable',
    GUILD_AVAILABLE: 'guildAvailable',
    GUILD_MEMBER_ADD: 'guildMemberAdd',
    GUILD_MEMBER_REMOVE: 'guildMemberRemove',
    GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
    GUILD_MEMBER_AVAILABLE: 'guildMemberAvailable',
    GUILD_MEMBER_SPEAKING: 'guildMemberSpeaking',
    GUILD_MEMBERS_CHUNK: 'guildMembersChunk',
    GUILD_INTEGRATIONS_UPDATE: 'guildIntegrationsUpdate',
    GUILD_ROLE_CREATE: 'roleCreate',
    GUILD_ROLE_DELETE: 'roleDelete',
    GUILD_ROLE_UPDATE: 'roleUpdate',
    GUILD_EMOJI_CREATE: 'emojiCreate',
    GUILD_EMOJI_DELETE: 'emojiDelete',
    GUILD_EMOJI_UPDATE: 'emojiUpdate',
    GUILD_BAN_ADD: 'guildBanAdd',
    GUILD_BAN_REMOVE: 'guildBanRemove',
    CHANNEL_CREATE: 'channelCreate',
    CHANNEL_DELETE: 'channelDelete',
    CHANNEL_UPDATE: 'channelUpdate',
    CHANNEL_PINS_UPDATE: 'channelPinsUpdate',
    MESSAGE_CREATE: 'message',
    MESSAGE_DELETE: 'messageDelete',
    MESSAGE_UPDATE: 'messageUpdate',
    MESSAGE_BULK_DELETE: 'messageDeleteBulk',
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
    MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll',
    USER_UPDATE: 'userUpdate',
    USER_NOTE_UPDATE: 'userNoteUpdate',
    USER_SETTINGS_UPDATE: 'clientUserSettingsUpdate',
    USER_GUILD_SETTINGS_UPDATE: 'clientUserGuildSettingsUpdate',
    PRESENCE_UPDATE: 'presenceUpdate',
    VOICE_STATE_UPDATE: 'voiceStateUpdate',
    TYPING_START: 'typingStart',
    TYPING_STOP: 'typingStop',
    WEBHOOKS_UPDATE: 'webhookUpdate',
    DISCONNECT: 'disconnect',
    RECONNECTING: 'reconnecting',
    ERROR: 'error',
    WARN: 'warn',
    DEBUG: 'debug',
};

/**
 * @type {{
 * CREATE_INSTANT_INVITE: 'CREATE_INSTANT_INVITE',
 * KICK_MEMBERS: 'KICK_MEMBERS',
 * BAN_MEMBERS: 'BAN_MEMBERS',
 * ADMINISTRATOR: 'ADMINISTRATOR',
 * MANAGE_CHANNELS: 'MANAGE_CHANNELS',
 * MANAGE_GUILD: 'MANAGE_GUILD',
 * ADD_REACTIONS: 'ADD_REACTIONS',
 * VIEW_AUDIT_LOG: 'VIEW_AUDIT_LOG',
 * PRIORITY_SPEAKER: 'PRIORITY_SPEAKER',
 * STREAM: 'STREAM',
 * VIEW_CHANNEL: 'VIEW_CHANNEL',
 * SEND_MESSAGES: 'SEND_MESSAGES',
 * SEND_TTS_MESSAGES: 'SEND_TTS_MESSAGES',
 * MANAGE_MESSAGES: 'MANAGE_MESSAGES',
 * EMBED_LINKS: 'EMBED_LINKS',
 * ATTACH_FILES: 'ATTACH_FILES',
 * READ_MESSAGE_HISTORY: 'READ_MESSAGE_HISTORY',
 * MENTION_EVERYONE: 'MENTION_EVERYONE',
 * USE_EXTERNAL_EMOJIS: 'USE_EXTERNAL_EMOJIS',
 * VIEW_GUILD_ANALYTICS: 'VIEW_GUILD_ANALYTICS',
 * CONNECT: 'CONNECT',
 * SPEAK: 'SPEAK',
 * MUTE_MEMBERS: 'MUTE_MEMBERS',
 * DEAFEN_MEMBERS: 'DEAFEN_MEMBERS',
 * MOVE_MEMBERS: 'MOVE_MEMBERS',
 * USE_VAD: 'USE_VAD',
 * CHANGE_NICKNAME: 'CHANGE_NICKNAME',
 * MANAGE_NICKNAMES: 'MANAGE_NICKNAMES',
 * MANAGE_ROLES: 'MANAGE_ROLES',
 * MANAGE_WEBHOOKS: 'MANAGE_WEBHOOKS',
 * MANAGE_EMOJIS: 'MANAGE_EMOJIS',
 * }}
 * @enum {String}
 */
export const DISCORD_LIB_PERMISSIONS = {
    CREATE_INSTANT_INVITE: 'CREATE_INSTANT_INVITE',
    KICK_MEMBERS: 'KICK_MEMBERS',
    BAN_MEMBERS: 'BAN_MEMBERS',
    ADMINISTRATOR: 'ADMINISTRATOR',
    MANAGE_CHANNELS: 'MANAGE_CHANNELS',
    MANAGE_GUILD: 'MANAGE_GUILD',
    ADD_REACTIONS: 'ADD_REACTIONS',
    VIEW_AUDIT_LOG: 'VIEW_AUDIT_LOG',
    PRIORITY_SPEAKER: 'PRIORITY_SPEAKER',
    STREAM: 'STREAM',
    VIEW_CHANNEL: 'VIEW_CHANNEL',
    SEND_MESSAGES: 'SEND_MESSAGES',
    SEND_TTS_MESSAGES: 'SEND_TTS_MESSAGES',
    MANAGE_MESSAGES: 'MANAGE_MESSAGES',
    EMBED_LINKS: 'EMBED_LINKS',
    ATTACH_FILES: 'ATTACH_FILES',
    READ_MESSAGE_HISTORY: 'READ_MESSAGE_HISTORY',
    MENTION_EVERYONE: 'MENTION_EVERYONE',
    USE_EXTERNAL_EMOJIS: 'USE_EXTERNAL_EMOJIS',
    VIEW_GUILD_ANALYTICS: 'VIEW_GUILD_ANALYTICS',
    CONNECT: 'CONNECT',
    SPEAK: 'SPEAK',
    MUTE_MEMBERS: 'MUTE_MEMBERS',
    DEAFEN_MEMBERS: 'DEAFEN_MEMBERS',
    MOVE_MEMBERS: 'MOVE_MEMBERS',
    USE_VAD: 'USE_VAD',
    CHANGE_NICKNAME: 'CHANGE_NICKNAME',
    MANAGE_NICKNAMES: 'MANAGE_NICKNAMES',
    MANAGE_ROLES: 'MANAGE_ROLES',
    MANAGE_WEBHOOKS: 'MANAGE_WEBHOOKS',
    MANAGE_EMOJIS: 'MANAGE_EMOJIS',
};

/**
 * @type {[
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_ANALYTICS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
 ]}
 */
export const PERMISSIONS = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_ANALYTICS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
];

/**
 * @type {{
 * CREATE_INSTANT_INVITE: 'Create Instant Invite',
 * KICK_MEMBERS: 'Kick Members',
 * BAN_MEMBERS: 'Ban Members',
 * ADMINISTRATOR: 'Administrator',
 * MANAGE_CHANNELS: 'Manage Channels',
 * MANAGE_GUILD: 'Manage Guild',
 * ADD_REACTIONS: 'Add Reactions',
 * VIEW_AUDIT_LOG: 'View Audit Log',
 * PRIORITY_SPEAKER: 'Priority Speaker',
 * STREAM: 'Stream',
 * VIEW_CHANNEL: 'Read Messages',
 * SEND_MESSAGES: 'Send Messages',
 * SEND_TTS_MESSAGES: 'Send TTS Messages',
 * MANAGE_MESSAGES: 'Manage Messages',
 * EMBED_LINKS: 'Embed Links',
 * ATTACH_FILES: 'Attach Files',
 * READ_MESSAGE_HISTORY: 'Read Message History',
 * MENTION_EVERYONE: 'Mention Everyone',
 * USE_EXTERNAL_EMOJIS: 'External Emojis',
 * VIEW_GUILD_ANALYTICS: 'View Guild Analytics',
 * CONNECT: 'Voice Connect',
 * SPEAK: 'Voice Speak',
 * MUTE_MEMBERS: 'Voice Mute Members',
 * DEAFEN_MEMBERS: 'Voice Deafen Members',
 * MOVE_MEMBERS: 'Voice Move Members',
 * USE_VAD: 'Voice Use VAD',
 * CHANGE_NICKNAME: 'Change Nickname',
 * MANAGE_NICKNAMES: 'Manage Nicknames',
 * MANAGE_ROLES: 'Manage Roles',
 * MANAGE_WEBHOOKS: 'Manage Webhooks',
 * MANAGE_EMOJIS: 'Manage Emojis',
 * }}
 */
export const PERMISSIONS_NAMES = {
    CREATE_INSTANT_INVITE: 'Create Instant Invite',
    KICK_MEMBERS: 'Kick Members',
    BAN_MEMBERS: 'Ban Members',
    ADMINISTRATOR: 'Administrator',
    MANAGE_CHANNELS: 'Manage Channels',
    MANAGE_GUILD: 'Manage Guild',
    ADD_REACTIONS: 'Add Reactions',
    VIEW_AUDIT_LOG: 'View Audit Log',
    PRIORITY_SPEAKER: 'Priority Speaker',
    STREAM: 'Stream',
    VIEW_CHANNEL: 'Read Messages',
    SEND_MESSAGES: 'Send Messages',
    SEND_TTS_MESSAGES: 'Send TTS Messages',
    MANAGE_MESSAGES: 'Manage Messages',
    EMBED_LINKS: 'Embed Links',
    ATTACH_FILES: 'Attach Files',
    READ_MESSAGE_HISTORY: 'Read Message History',
    MENTION_EVERYONE: 'Mention Everyone',
    USE_EXTERNAL_EMOJIS: 'External Emojis',
    VIEW_GUILD_ANALYTICS: 'View Guild Analytics',
    CONNECT: 'Voice Connect',
    SPEAK: 'Voice Speak',
    MUTE_MEMBERS: 'Voice Mute Members',
    DEAFEN_MEMBERS: 'Voice Deafen Members',
    MOVE_MEMBERS: 'Voice Move Members',
    USE_VAD: 'Voice Use VAD',
    CHANGE_NICKNAME: 'Change Nickname',
    MANAGE_NICKNAMES: 'Manage Nicknames',
    MANAGE_ROLES: 'Manage Roles',
    MANAGE_WEBHOOKS: 'Manage Webhooks',
    MANAGE_EMOJIS: 'Manage Emojis',
};

export default {
    EVENTS,
    DISCORD_LIB_PERMISSIONS,
    PERMISSIONS,
    PERMISSIONS_NAMES,
};
