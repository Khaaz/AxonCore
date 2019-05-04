import { Schema, model } from 'mongoose';

const axonSchema = new Schema( {
    /** Index */
    ID: { type: String, required: true, index: true }, // ID
    prefix: { type: String, default: 'e!' },

    prefixes: { type: Object, default: {} }, // Object {guildID: [Array of prefix]} => into Map Object || (save for prefix?) (currenctly running with prefix in guildSchema)

    /**
     * ?? Module/Commands ??
     */
    modules: { type: Array, default: [] }, // array of modules Object or label?
    commands: { type: Array, default: [] }, // array of commands Object or label?
    events: { type: Array, default: [] }, // array of events Object or label?

    webhooks: { type: Object, default: {} }, // not used atm

    /**
     * Global banned
     */
    bannedGuilds: { type: Array, default: [] }, // array of ids => cache into Set
    bannedUsers: { type: Array, default: [] }, // array of ids => cache into Set

    /**
     * \/ Customs \/
     */

}, {
    strict: false,
    minimize: false,
} );

export default model('Axon', axonSchema);
