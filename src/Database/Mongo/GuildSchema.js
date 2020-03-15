import { Schema, model } from 'mongoose';

const guildSchema = new Schema( {
    /** Index */
    guildID: { type: String, required: true, index: true }, // GUILD ID

    prefixes: { type: Array, default: [], required: true },

    /**
     * Core
     */
    modules: { type: Array, default: [] }, // Array of disabled modules (labels)
    commands: { type: Array, default: [] }, // Array of disabled commands (labels)
    eventListeners: { type: Array, default: [] }, // Array of disabled listeners (labels)

    /**
     * General info
     */
    createdAt: { type: Date, default: Date.now }, // date of schema creation
    updatedAt: { type: Date, default: Date.now }, // data of last DB update

    /**
     * Ignore
     */
    ignoredUsers: { type: Array, default: [] }, // ids
    ignoredRoles: { type: Array, default: [] }, // ids
    ignoredChannels: { type: Array, default: [] }, // ids

    /**
     * Moderation
     */
    modOnly: { type: Boolean, default: false },
    modRoles: { type: Array, default: [] },
    modUsers: { type: Array, default: [] },

}, {
    autoIndex: true,
    minimize: false,
} );

export default model('Guild', guildSchema);
