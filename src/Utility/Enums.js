const permissionsNames = [
    'createInstantInvite',
    'kickMembers',
    'banMembers',
    'administrator',
    'manageChannels',
    'manageGuild',
    'addReactions',
    'readMessages',
    'sendMessages',
    'sendTTSMessages',
    'manageMessages',
    'embedLinks',
    'attachFiles',
    'readMessageHistory',
    'mentionEveryone',
    'externalEmojis',
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

const adminPerms = [
    'administrator',
    'manageGuild',
];

const typeWH = {
    status: 'Status',
    loader: 'Loader',
    error: 'Error',
    misc: 'Misc',
};

const typeError = {
    api: 'DAPI error - failed to retrieve from Discord',
    db: 'DB error - failed to retrieve from the DB',
    internal: 'Internal error - AxonClient/internal methods',
    unexpected: 'Unexpected error',
};

export default {
    permissionsNames,
    adminPerms,
    typeWH,
    typeError,
};
