const regex = {
    userMention: /<@!?[0-9]+>$/,
    roleMention: /<@&[0-9]+>$/,
    channelMention: /<#[0-9]+>$/,
    id: /^[0-9]+$/
};

const other = {};

export default {
    regex,
    other
};
