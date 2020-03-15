import { Schema, model } from 'mongoose';

const axonSchema = new Schema( {
    /** Index */
    id: { type: String, required: true, index: true }, // ID
    prefix: { type: String, default: 'a!' },

    /**
     * General info
     */
    createdAt: { type: Date, default: Date.now }, // date of schema creation
    updatedAt: { type: Date, default: Date.now }, // data of last DB update

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
