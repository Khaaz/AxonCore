## Typedefs

<dl>
<dt><a href="#EVENTS">EVENTS</a> : <code>String</code></dt>
<dd><ul>
<li>RATE_LIMIT: &#39;rateLimit&#39;</li>
<li>READY: &#39;ready&#39;</li>
<li>RESUME: &#39;resume&#39;</li>
<li>GUILD_CREATE: &#39;guildCreate&#39;</li>
<li>GUILD_DELETE: &#39;guildDelete&#39;</li>
<li>GUILD_UPDATE: &#39;guildUpdate&#39;</li>
<li>GUILD_UNAVAILABLE: &#39;guildUnavailable&#39;</li>
<li>GUILD_AVAILABLE: &#39;guildAvailable&#39;</li>
<li>GUILD_MEMBER_ADD: &#39;guildMemberAdd&#39;</li>
<li>GUILD_MEMBER_REMOVE: &#39;guildMemberRemove&#39;</li>
<li>GUILD_MEMBER_UPDATE: &#39;guildMemberUpdate&#39;</li>
<li>GUILD_MEMBER_AVAILABLE: &#39;guildMemberAvailable&#39;</li>
<li>GUILD_MEMBER_SPEAKING: &#39;guildMemberSpeaking&#39;</li>
<li>GUILD_MEMBERS_CHUNK: &#39;guildMembersChunk&#39;</li>
<li>GUILD_INTEGRATIONS_UPDATE: &#39;guildIntegrationsUpdate&#39;</li>
<li>GUILD_ROLE_CREATE: &#39;roleCreate&#39;</li>
<li>GUILD_ROLE_DELETE: &#39;roleDelete&#39;</li>
<li>GUILD_ROLE_UPDATE: &#39;roleUpdate&#39;</li>
<li>GUILD_EMOJI_CREATE: &#39;emojiCreate&#39;</li>
<li>GUILD_EMOJI_DELETE: &#39;emojiDelete&#39;</li>
<li>GUILD_EMOJI_UPDATE: &#39;emojiUpdate&#39;</li>
<li>GUILD_BAN_ADD: &#39;guildBanAdd&#39;</li>
<li>GUILD_BAN_REMOVE: &#39;guildBanRemove&#39;</li>
<li>CHANNEL_CREATE: &#39;channelCreate&#39;</li>
<li>CHANNEL_DELETE: &#39;channelDelete&#39;</li>
<li>CHANNEL_UPDATE: &#39;channelUpdate&#39;</li>
<li>CHANNEL_PINS_UPDATE: &#39;channelPinsUpdate&#39;</li>
<li>MESSAGE_CREATE: &#39;message&#39;</li>
<li>MESSAGE_DELETE: &#39;messageDelete&#39;</li>
<li>MESSAGE_UPDATE: &#39;messageUpdate&#39;</li>
<li>MESSAGE_BULK_DELETE: &#39;messageDeleteBulk&#39;</li>
<li>MESSAGE_REACTION_ADD: &#39;messageReactionAdd&#39;</li>
<li>MESSAGE_REACTION_REMOVE: &#39;messageReactionRemove&#39;</li>
<li>MESSAGE_REACTION_REMOVE_ALL: &#39;messageReactionRemoveAll&#39;</li>
<li>USER_UPDATE: &#39;userUpdate&#39;</li>
<li>USER_NOTE_UPDATE: &#39;userNoteUpdate&#39;</li>
<li>USER_SETTINGS_UPDATE: &#39;clientUserSettingsUpdate&#39;</li>
<li>USER_GUILD_SETTINGS_UPDATE: &#39;clientUserGuildSettingsUpdate&#39;</li>
<li>PRESENCE_UPDATE: &#39;presenceUpdate&#39;</li>
<li>VOICE_STATE_UPDATE: &#39;voiceStateUpdate&#39;</li>
<li>TYPING_START: &#39;typingStart&#39;</li>
<li>TYPING_STOP: &#39;typingStop&#39;</li>
<li>WEBHOOKS_UPDATE: &#39;webhookUpdate&#39;</li>
<li>DISCONNECT: &#39;disconnect&#39;</li>
<li>RECONNECTING: &#39;reconnecting&#39;</li>
<li>ERROR: &#39;error&#39;</li>
<li>WARN: &#39;warn&#39;</li>
<li>DEBUG: &#39;debug&#39;</li>
</ul>
</dd>
<dt><a href="#DISCORD_LIB_PERMISSIONS">DISCORD_LIB_PERMISSIONS</a> : <code>String</code></dt>
<dd><ul>
<li>CREATE_INSTANT_INVITE: &#39;CREATE_INSTANT_INVITE&#39;</li>
<li>KICK_MEMBERS: &#39;KICK_MEMBERS&#39;</li>
<li>BAN_MEMBERS: &#39;BAN_MEMBERS&#39;</li>
<li>ADMINISTRATOR: &#39;ADMINISTRATOR&#39;</li>
<li>MANAGE_CHANNELS: &#39;MANAGE_CHANNELS&#39;</li>
<li>MANAGE_GUILD: &#39;MANAGE_GUILD&#39;</li>
<li>ADD_REACTIONS: &#39;ADD_REACTIONS&#39;</li>
<li>VIEW_AUDIT_LOG: &#39;VIEW_AUDIT_LOG&#39;</li>
<li>PRIORITY_SPEAKER: &#39;PRIORITY_SPEAKER&#39;</li>
<li>STREAM: &#39;STREAM&#39;</li>
<li>VIEW_CHANNEL: &#39;VIEW_CHANNEL&#39;</li>
<li>SEND_MESSAGES: &#39;SEND_MESSAGES&#39;</li>
<li>SEND_TTS_MESSAGES: &#39;SEND_TTS_MESSAGES&#39;</li>
<li>MANAGE_MESSAGES: &#39;MANAGE_MESSAGES&#39;</li>
<li>EMBED_LINKS: &#39;EMBED_LINKS&#39;</li>
<li>ATTACH_FILES: &#39;ATTACH_FILES&#39;</li>
<li>READ_MESSAGE_HISTORY: &#39;READ_MESSAGE_HISTORY&#39;</li>
<li>MENTION_EVERYONE: &#39;MENTION_EVERYONE&#39;</li>
<li>USE_EXTERNAL_EMOJIS: &#39;USE_EXTERNAL_EMOJIS&#39;</li>
<li>CONNECT: &#39;CONNECT&#39;</li>
<li>SPEAK: &#39;SPEAK&#39;</li>
<li>MUTE_MEMBERS: &#39;MUTE_MEMBERS&#39;</li>
<li>DEAFEN_MEMBERS: &#39;DEAFEN_MEMBERS&#39;</li>
<li>MOVE_MEMBERS: &#39;MOVE_MEMBERS&#39;</li>
<li>USE_VAD: &#39;USE_VAD&#39;</li>
<li>CHANGE_NICKNAME: &#39;CHANGE_NICKNAME&#39;</li>
<li>MANAGE_NICKNAMES: &#39;MANAGE_NICKNAMES&#39;</li>
<li>MANAGE_ROLES: &#39;MANAGE_ROLES&#39;</li>
<li>MANAGE_WEBHOOKS: &#39;MANAGE_WEBHOOKS&#39;</li>
<li>MANAGE_EMOJIS: &#39;MANAGE_EMOJIS&#39;</li>
</ul>
</dd>
<dt><a href="#PERMISSIONS">PERMISSIONS</a> : <code>Array.&lt;String&gt;</code></dt>
<dd><ul>
<li>&#39;CREATE_INSTANT_INVITE&#39;</li>
<li>&#39;KICK_MEMBERS&#39;</li>
<li>&#39;BAN_MEMBERS&#39;</li>
<li>&#39;ADMINISTRATOR&#39;</li>
<li>&#39;MANAGE_CHANNELS&#39;</li>
<li>&#39;MANAGE_GUILD&#39;</li>
<li>&#39;ADD_REACTIONS&#39;</li>
<li>&#39;VIEW_AUDIT_LOG&#39;</li>
<li>&#39;PRIORITY_SPEAKER&#39;</li>
<li>&#39;STREAM&#39;</li>
<li>&#39;VIEW_CHANNEL&#39;</li>
<li>&#39;SEND_MESSAGES&#39;</li>
<li>&#39;SEND_TTS_MESSAGES&#39;</li>
<li>&#39;MANAGE_MESSAGES&#39;</li>
<li>&#39;EMBED_LINKS&#39;</li>
<li>&#39;ATTACH_FILES&#39;</li>
<li>&#39;READ_MESSAGE_HISTORY&#39;</li>
<li>&#39;MENTION_EVERYONE&#39;</li>
<li>&#39;USE_EXTERNAL_EMOJIS&#39;</li>
<li>&#39;CONNECT&#39;</li>
<li>&#39;SPEAK&#39;</li>
<li>&#39;MUTE_MEMBERS&#39;</li>
<li>&#39;DEAFEN_MEMBERS&#39;</li>
<li>&#39;MOVE_MEMBERS&#39;</li>
<li>&#39;USE_VAD&#39;</li>
<li>&#39;CHANGE_NICKNAME&#39;</li>
<li>&#39;MANAGE_NICKNAMES&#39;</li>
<li>&#39;MANAGE_ROLES&#39;</li>
<li>&#39;MANAGE_WEBHOOKS&#39;</li>
<li>&#39;MANAGE_EMOJIS&#39;</li>
</ul>
</dd>
<dt><a href="#PERMISSIONS_NAMES">PERMISSIONS_NAMES</a> : <code>String</code></dt>
<dd><ul>
<li>CREATE_INSTANT_INVITE: &#39;Create Instant Invite&#39;</li>
<li>KICK_MEMBERS: &#39;Kick Members&#39;</li>
<li>BAN_MEMBERS: &#39;Ban Members&#39;</li>
<li>ADMINISTRATOR: &#39;Administrator&#39;,</li>
<li></li>
<li>MANAGE_CHANNELS: &#39;Manage Channels&#39;</li>
<li>MANAGE_GUILD: &#39;Manage Guild&#39;</li>
<li>ADD_REACTIONS: &#39;Add Reactions&#39;</li>
<li>VIEW_AUDIT_LOG: &#39;View Audit Log&#39;</li>
<li>PRIORITY_SPEAKER: &#39;Priority Speaker&#39;</li>
<li>STREAM: &#39;Stream&#39;,</li>
<li></li>
<li>VIEW_CHANNEL: &#39;Read Messages&#39;</li>
<li>SEND_MESSAGES: &#39;Send Messages&#39;</li>
<li>SEND_TTS_MESSAGES: &#39;Send TTS Messages&#39;</li>
<li>MANAGE_MESSAGES: &#39;Manage Messages&#39;</li>
<li>EMBED_LINKS: &#39;Embed Links&#39;</li>
<li>ATTACH_FILES: &#39;Attach Files&#39;</li>
<li>READ_MESSAGE_HISTORY: &#39;Read Message History&#39;</li>
<li>MENTION_EVERYONE: &#39;Mention Everyone&#39;</li>
<li>USE_EXTERNAL_EMOJIS: &#39;External Emojis&#39;</li>
<li>CONNECT: &#39;Voice Connect&#39;</li>
<li>SPEAK: &#39;Voice Speak&#39;</li>
<li>MUTE_MEMBERS: &#39;Voice Mute Members&#39;</li>
<li>DEAFEN_MEMBERS: &#39;Voice Deafen Members&#39;</li>
<li>MOVE_MEMBERS: &#39;Voice Move Members&#39;</li>
<li>USE_VAD: &#39;Voice Use VAD&#39;</li>
<li>CHANGE_NICKNAME: &#39;Change Nickname&#39;</li>
<li>MANAGE_NICKNAMES: &#39;Manage Nicknames&#39;</li>
<li>MANAGE_ROLES: &#39;Manage Roles&#39;</li>
<li>MANAGE_WEBHOOKS: &#39;Manage Webhooks&#39;</li>
<li>MANAGE_EMOJIS: &#39;Manage Emojis&#39;</li>
</ul>
</dd>
</dl>

<a name="EVENTS"></a>

## EVENTS : <code>String</code>
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

**Kind**: global typedef  
<a name="DISCORD_LIB_PERMISSIONS"></a>

## DISCORD\_LIB\_PERMISSIONS : <code>String</code>
* CREATE_INSTANT_INVITE: 'CREATE_INSTANT_INVITE'
* KICK_MEMBERS: 'KICK_MEMBERS'
* BAN_MEMBERS: 'BAN_MEMBERS'
* ADMINISTRATOR: 'ADMINISTRATOR'
* MANAGE_CHANNELS: 'MANAGE_CHANNELS'
* MANAGE_GUILD: 'MANAGE_GUILD'
* ADD_REACTIONS: 'ADD_REACTIONS'
* VIEW_AUDIT_LOG: 'VIEW_AUDIT_LOG'
* PRIORITY_SPEAKER: 'PRIORITY_SPEAKER'
* STREAM: 'STREAM'
* VIEW_CHANNEL: 'VIEW_CHANNEL'
* SEND_MESSAGES: 'SEND_MESSAGES'
* SEND_TTS_MESSAGES: 'SEND_TTS_MESSAGES'
* MANAGE_MESSAGES: 'MANAGE_MESSAGES'
* EMBED_LINKS: 'EMBED_LINKS'
* ATTACH_FILES: 'ATTACH_FILES'
* READ_MESSAGE_HISTORY: 'READ_MESSAGE_HISTORY'
* MENTION_EVERYONE: 'MENTION_EVERYONE'
* USE_EXTERNAL_EMOJIS: 'USE_EXTERNAL_EMOJIS'
* CONNECT: 'CONNECT'
* SPEAK: 'SPEAK'
* MUTE_MEMBERS: 'MUTE_MEMBERS'
* DEAFEN_MEMBERS: 'DEAFEN_MEMBERS'
* MOVE_MEMBERS: 'MOVE_MEMBERS'
* USE_VAD: 'USE_VAD'
* CHANGE_NICKNAME: 'CHANGE_NICKNAME'
* MANAGE_NICKNAMES: 'MANAGE_NICKNAMES'
* MANAGE_ROLES: 'MANAGE_ROLES'
* MANAGE_WEBHOOKS: 'MANAGE_WEBHOOKS'
* MANAGE_EMOJIS: 'MANAGE_EMOJIS'

**Kind**: global typedef  
<a name="PERMISSIONS"></a>

## PERMISSIONS : <code>Array.&lt;String&gt;</code>
* 'CREATE_INSTANT_INVITE'
* 'KICK_MEMBERS'
* 'BAN_MEMBERS'
* 'ADMINISTRATOR'
* 'MANAGE_CHANNELS'
* 'MANAGE_GUILD'
* 'ADD_REACTIONS'
* 'VIEW_AUDIT_LOG'
* 'PRIORITY_SPEAKER'
* 'STREAM'
* 'VIEW_CHANNEL'
* 'SEND_MESSAGES'
* 'SEND_TTS_MESSAGES'
* 'MANAGE_MESSAGES'
* 'EMBED_LINKS'
* 'ATTACH_FILES'
* 'READ_MESSAGE_HISTORY'
* 'MENTION_EVERYONE'
* 'USE_EXTERNAL_EMOJIS'
* 'CONNECT'
* 'SPEAK'
* 'MUTE_MEMBERS'
* 'DEAFEN_MEMBERS'
* 'MOVE_MEMBERS'
* 'USE_VAD'
* 'CHANGE_NICKNAME'
* 'MANAGE_NICKNAMES'
* 'MANAGE_ROLES'
* 'MANAGE_WEBHOOKS'
* 'MANAGE_EMOJIS'

**Kind**: global typedef  
<a name="PERMISSIONS_NAMES"></a>

## PERMISSIONS\_NAMES : <code>String</code>
* CREATE_INSTANT_INVITE: 'Create Instant Invite'
* KICK_MEMBERS: 'Kick Members'
* BAN_MEMBERS: 'Ban Members'
* ADMINISTRATOR: 'Administrator',
*
* MANAGE_CHANNELS: 'Manage Channels'
* MANAGE_GUILD: 'Manage Guild'
* ADD_REACTIONS: 'Add Reactions'
* VIEW_AUDIT_LOG: 'View Audit Log'
* PRIORITY_SPEAKER: 'Priority Speaker'
* STREAM: 'Stream',
*
* VIEW_CHANNEL: 'Read Messages'
* SEND_MESSAGES: 'Send Messages'
* SEND_TTS_MESSAGES: 'Send TTS Messages'
* MANAGE_MESSAGES: 'Manage Messages'
* EMBED_LINKS: 'Embed Links'
* ATTACH_FILES: 'Attach Files'
* READ_MESSAGE_HISTORY: 'Read Message History'
* MENTION_EVERYONE: 'Mention Everyone'
* USE_EXTERNAL_EMOJIS: 'External Emojis'
* CONNECT: 'Voice Connect'
* SPEAK: 'Voice Speak'
* MUTE_MEMBERS: 'Voice Mute Members'
* DEAFEN_MEMBERS: 'Voice Deafen Members'
* MOVE_MEMBERS: 'Voice Move Members'
* USE_VAD: 'Voice Use VAD'
* CHANGE_NICKNAME: 'Change Nickname'
* MANAGE_NICKNAMES: 'Manage Nicknames'
* MANAGE_ROLES: 'Manage Roles'
* MANAGE_WEBHOOKS: 'Manage Webhooks'
* MANAGE_EMOJIS: 'Manage Emojis'

**Kind**: global typedef  
