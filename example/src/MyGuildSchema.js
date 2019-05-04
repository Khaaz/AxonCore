import { Schema, model } from 'mongoose';

const guildSchema = new Schema( {
    /** Index */
    guildID: { type: String, required: true, index: true }, // GUILD ID

    prefix: { type: Array, default: [] }, // default e! :: always has @mention when registering guild Prefix

    /**
     * Core
     */
    modules: { type: Array, default: [] }, // Array of disabled modules

    commands: { type: Array, default: [] }, // Arrayd of disabled commands
    events: { type: Array, default: [] }, // Array of disabled events

    /**
     * General infos
     */
    createdAt: { type: Date, default: Date.now }, // date of schema creation (first add of Ease)
    savedAt: { type: Date }, // ?
    updatedAt: { type: Date }, // ?

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
    modRoles: { type: Array, default: [], required: false },
    modUsers: { type: Array, default: [], required: false },

    myParam: { type: String, default: '' }, // example param

    /**
     * \/ Customs \/
     */

}, {
    autoIndex: true,
    minimize: false,
} );

export default model('Guild', guildSchema);
