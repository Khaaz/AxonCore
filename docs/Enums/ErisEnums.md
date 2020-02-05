## Typedefs

<dl>
<dt><a href="#EVENTS">EVENTS</a> : <code>String</code></dt>
<dd><ul>
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
<li>GUILD_ROLE_CREATE: &#39;roleCreate&#39;</li>
<li>GUILD_ROLE_DELETE: &#39;roleDelete&#39;</li>
<li>GUILD_ROLE_UPDATE: &#39;roleUpdate&#39;</li>
<li>GUILD_EMOJIS_UPDATE: &#39;guildEmojisUpdate&#39;</li>
<li>GUILD_BAN_ADD: &#39;guildBanAdd&#39;</li>
<li>GUILD_BAN_REMOVE: &#39;guildBanRemove&#39;</li>
<li>UNAVAILABLE_GUILD_CREATE: &#39;unavailableGuildCreate&#39;</li>
<li>CHANNEL_CREATE: &#39;channelCreate&#39;</li>
<li>CHANNEL_DELETE: &#39;channelDelete&#39;</li>
<li>CHANNEL_UPDATE: &#39;channelUpdate&#39;</li>
<li>CHANNEL_PIN_UPDATE: &#39;channelPinUpdate&#39;</li>
<li>MESSAGE_CREATE: &#39;messageCreate&#39;</li>
<li>MESSAGE_DELETE: &#39;messageDelete&#39;</li>
<li>MESSAGE_UPDATE: &#39;messageUpdate&#39;</li>
<li>MESSAGE_DELETE_BULK: &#39;messageDeleteBulk&#39;</li>
<li>MESSAGE_REACTION_ADD: &#39;messageReactionAdd&#39;</li>
<li>MESSAGE_REACTION_REMOVE: &#39;messageReactionRemove&#39;</li>
<li>MESSAGE_REACTION_REMOVE_ALL: &#39;messageReactionRemoveAll&#39;</li>
<li>TYPING_START: &#39;typingStart&#39;</li>
<li>USER_UPDATE: &#39;userUpdate&#39;</li>
<li>PRESENCE_UPDATE: &#39;presenceUpdate&#39;</li>
<li>VOICE_CHANNEL_JOIN: &#39;voicecChannelJoin&#39;</li>
<li>VOICE_CHANNEL_LEAVE: &#39;voiceChannelLeave&#39;</li>
<li>VOICE_CHANNEL_SWITCH: &#39;voiceChannelSwitch&#39;</li>
<li>VOICE_STATE_UPDATE: &#39;voiceStateUpdate&#39;</li>
<li>WEBHOOKS_UPDATE: &#39;webhookUpdate&#39;</li>
<li>SHARD_DISCONNECT: &#39;shardDisconnect&#39;</li>
<li>SHARD_PRE_READY: &#39;shardPreReady&#39;</li>
<li>SHARD_READY: &#39;shardReady&#39;</li>
<li>SHARD_RESUME: &#39;shardResume&#39;</li>
<li>UNKNOWN: &#39;unknown&#39;</li>
<li>CONNECT: &#39;connect&#39;</li>
<li>DISCONNECT: &#39;disconnect&#39;</li>
<li>ERROR: &#39;error&#39;</li>
<li>WARN: &#39;warn&#39;</li>
<li>DEBUG: &#39;debug&#39;</li>
<li>READY: &#39;ready&#39;</li>
<li>HELLO: &#39;hello&#39;</li>
<li>RATE_LIMIT: &#39;rateLimit&#39;</li>
<li>RAW_WS: &#39;rawWS&#39;</li>
</ul>
</dd>
<dt><a href="#DISCORD_LIB_PERMISSIONS">DISCORD_LIB_PERMISSIONS</a> : <code>String</code></dt>
<dd><ul>
<li>CREATE_INSTANT_INVITE: &#39;createInstantInvite&#39;</li>
<li>KICK_MEMBERS: &#39;kickMembers&#39;</li>
<li>BAN_MEMBERS: &#39;banMembers&#39;</li>
<li>ADMINISTRATOR: &#39;administrator&#39;</li>
<li>MANAGE_CHANNELS: &#39;manageChannels&#39;</li>
<li>MANAGE_GUILD: &#39;manageGuild&#39;</li>
<li>ADD_REACTIONS: &#39;addReactions&#39;</li>
<li>VIEW_AUDIT_LOG: &#39;viewAuditLog&#39;</li>
<li>PRIORITY_SPEAKER: &#39;voicePrioritySpeaker&#39;</li>
<li>STREAM: &#39;stream&#39;</li>
<li>VIEW_CHANNEL: &#39;readMessages&#39;</li>
<li>SEND_MESSAGES: &#39;sendMessages&#39;</li>
<li>SEND_TTS_MESSAGES: &#39;sendTTSMessages&#39;</li>
<li>MANAGE_MESSAGES: &#39;manageMessages&#39;</li>
<li>EMBED_LINKS: &#39;embedLinks&#39;</li>
<li>ATTACH_FILES: &#39;attachFiles&#39;</li>
<li>READ_MESSAGE_HISTORY: &#39;readMessageHistory&#39;</li>
<li>MENTION_EVERYONE: &#39;mentionEveryone&#39;</li>
<li>USE_EXTERNAL_EMOJIS: &#39;externalEmojis&#39;</li>
<li>CONNECT: &#39;voiceConnect&#39;</li>
<li>SPEAK: &#39;voiceSpeak&#39;</li>
<li>MUTE_MEMBERS: &#39;voiceMuteMembers&#39;</li>
<li>DEAFEN_MEMBERS: &#39;voiceDeafenMembers&#39;</li>
<li>MOVE_MEMBERS: &#39;voiceMoveMembers&#39;</li>
<li>USE_VAD: &#39;voiceUseVAD&#39;</li>
<li>CHANGE_NICKNAME: &#39;changeNickname&#39;</li>
<li>MANAGE_NICKNAMES: &#39;manageNicknames&#39;</li>
<li>MANAGE_ROLES: &#39;manageRoles&#39;</li>
<li>MANAGE_WEBHOOKS: &#39;manageWebhooks&#39;</li>
<li>MANAGE_EMOJIS: &#39;manageEmojis&#39;</li>
</ul>
</dd>
<dt><a href="#PERMISSIONS">PERMISSIONS</a> : <code>Array.&lt;String&gt;</code></dt>
<dd><ul>
<li>&#39;createInstantInvite&#39;</li>
<li>&#39;kickMembers&#39;</li>
<li>&#39;banMembers&#39;</li>
<li>&#39;administrator&#39;</li>
<li>&#39;manageChannels&#39;</li>
<li>&#39;manageGuild&#39;</li>
<li>&#39;addReactions&#39;</li>
<li>&#39;viewAuditLog&#39;</li>
<li>&#39;voicePrioritySpeaker&#39;</li>
<li>&#39;stream&#39;</li>
<li>&#39;readMessages&#39;</li>
<li>&#39;sendMessages&#39;</li>
<li>&#39;sendTTSMessages&#39;</li>
<li>&#39;manageMessages&#39;</li>
<li>&#39;embedLinks&#39;</li>
<li>&#39;attachFiles&#39;</li>
<li>&#39;readMessageHistory&#39;</li>
<li>&#39;mentionEveryone&#39;</li>
<li>&#39;externalEmojis&#39;</li>
<li>&#39;voiceConnect&#39;</li>
<li>&#39;voiceSpeak&#39;</li>
<li>&#39;voiceMuteMembers&#39;</li>
<li>&#39;voiceDeafenMembers&#39;</li>
<li>&#39;voiceMoveMembers&#39;</li>
<li>&#39;voiceUseVAD&#39;</li>
<li>&#39;changeNickname&#39;</li>
<li>&#39;manageNicknames&#39;</li>
<li>&#39;manageRoles&#39;</li>
<li>&#39;manageWebhooks&#39;</li>
<li>&#39;manageEmojis&#39;</li>
</ul>
</dd>
<dt><a href="#PERMISSIONS_NAMES">PERMISSIONS_NAMES</a> : <code>String</code></dt>
<dd><ul>
<li>createInstantInvite: &#39;Create Instant Invite&#39;</li>
<li>kickMembers: &#39;Kick Members&#39;</li>
<li>banMembers: &#39;Ban Members&#39;</li>
<li>administrator: &#39;Administrator&#39;</li>
<li>manageChannels: &#39;Manage Channels&#39;</li>
<li>manageGuild: &#39;Manage Guild&#39;</li>
<li>addReactions: &#39;Add Reactions&#39;</li>
<li>viewAuditLog: &#39;View Audit Log&#39;</li>
<li>voicePrioritySpeaker: &#39;Priority Speaker&#39;</li>
<li>stream: &#39;Stream&#39;</li>
<li>readMessages: &#39;Read Messages&#39;</li>
<li>sendMessages: &#39;Send Messages&#39;</li>
<li>sendTTSMessages: &#39;Send TTS Messages&#39;</li>
<li>manageMessages: &#39;Manage Messages&#39;</li>
<li>embedLinks: &#39;Embed Links&#39;</li>
<li>attachFiles: &#39;Attach Files&#39;</li>
<li>readMessageHistory: &#39;Read Message History&#39;</li>
<li>mentionEveryone: &#39;Mention Everyone&#39;</li>
<li>externalEmojis: &#39;External Emojis&#39;</li>
<li>voiceConnect: &#39;Voice Connect&#39;</li>
<li>voiceSpeak: &#39;Voice Speak&#39;</li>
<li>voiceMuteMembers: &#39;Voice Mute Members&#39;</li>
<li>voiceDeafenMembers: &#39;Voice Deafen Members&#39;</li>
<li>voiceMoveMembers: &#39;Voice Move Members&#39;</li>
<li>voiceUseVAD: &#39;Voice Use VAD&#39;</li>
<li>changeNickname: &#39;Change Nickname&#39;</li>
<li>manageNicknames: &#39;Manage Nicknames&#39;</li>
<li>manageRoles: &#39;Manage Roles&#39;</li>
<li>manageWebhooks: &#39;Manage Webhooks&#39;</li>
<li>manageEmojis: &#39;Manage Emojis&#39;</li>
</ul>
</dd>
</dl>

<a name="EVENTS"></a>

## EVENTS : <code>String</code>
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
* GUILD_ROLE_CREATE: 'roleCreate'
* GUILD_ROLE_DELETE: 'roleDelete'
* GUILD_ROLE_UPDATE: 'roleUpdate'
* GUILD_EMOJIS_UPDATE: 'guildEmojisUpdate'
* GUILD_BAN_ADD: 'guildBanAdd'
* GUILD_BAN_REMOVE: 'guildBanRemove'
* UNAVAILABLE_GUILD_CREATE: 'unavailableGuildCreate'
* CHANNEL_CREATE: 'channelCreate'
* CHANNEL_DELETE: 'channelDelete'
* CHANNEL_UPDATE: 'channelUpdate'
* CHANNEL_PIN_UPDATE: 'channelPinUpdate'
* MESSAGE_CREATE: 'messageCreate'
* MESSAGE_DELETE: 'messageDelete'
* MESSAGE_UPDATE: 'messageUpdate'
* MESSAGE_DELETE_BULK: 'messageDeleteBulk'
* MESSAGE_REACTION_ADD: 'messageReactionAdd'
* MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
* MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll'
* TYPING_START: 'typingStart'
* USER_UPDATE: 'userUpdate'
* PRESENCE_UPDATE: 'presenceUpdate'
* VOICE_CHANNEL_JOIN: 'voicecChannelJoin'
* VOICE_CHANNEL_LEAVE: 'voiceChannelLeave'
* VOICE_CHANNEL_SWITCH: 'voiceChannelSwitch'
* VOICE_STATE_UPDATE: 'voiceStateUpdate'
* WEBHOOKS_UPDATE: 'webhookUpdate'
* SHARD_DISCONNECT: 'shardDisconnect'
* SHARD_PRE_READY: 'shardPreReady'
* SHARD_READY: 'shardReady'
* SHARD_RESUME: 'shardResume'
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

**Kind**: global typedef  
<a name="DISCORD_LIB_PERMISSIONS"></a>

## DISCORD\_LIB\_PERMISSIONS : <code>String</code>
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

**Kind**: global typedef  
<a name="PERMISSIONS"></a>

## PERMISSIONS : <code>Array.&lt;String&gt;</code>
* 'createInstantInvite'
* 'kickMembers'
* 'banMembers'
* 'administrator'
* 'manageChannels'
* 'manageGuild'
* 'addReactions'
* 'viewAuditLog'
* 'voicePrioritySpeaker'
* 'stream'
* 'readMessages'
* 'sendMessages'
* 'sendTTSMessages'
* 'manageMessages'
* 'embedLinks'
* 'attachFiles'
* 'readMessageHistory'
* 'mentionEveryone'
* 'externalEmojis'
* 'voiceConnect'
* 'voiceSpeak'
* 'voiceMuteMembers'
* 'voiceDeafenMembers'
* 'voiceMoveMembers'
* 'voiceUseVAD'
* 'changeNickname'
* 'manageNicknames'
* 'manageRoles'
* 'manageWebhooks'
* 'manageEmojis'

**Kind**: global typedef  
<a name="PERMISSIONS_NAMES"></a>

## PERMISSIONS\_NAMES : <code>String</code>
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

**Kind**: global typedef  
