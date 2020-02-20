import { Document } from 'mongoose';

export declare interface AxonSchema extends Document {
    id: string;
    prefix: string;
    createdAt: Date;
    updatedAt: Date;
    bannedGuilds: string[];
    bannedUsers: string[];
}
