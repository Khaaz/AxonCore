import { Document, Model } from 'mongoose';

export declare interface AxonDocument extends Document {
    id: string;
    prefix: string;
    createdAt: Date;
    updatedAt: Date;
    bannedGuilds: string[];
    bannedUsers: string[];
}

export declare type AxonSchema = Model<AxonDocument>;
