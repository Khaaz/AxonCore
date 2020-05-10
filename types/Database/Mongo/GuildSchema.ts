import { Document, Model } from 'mongoose';

export declare interface GuildDocument extends Document {
    guildID: string;
    prefixes: string[];
    modules: string[];
    commands: string[];
    eventListeners: string[];
    createdAt: Date;
    updatedAt: Date;
    ignoredUsers: string[];
    ignoredRoles: string[];
    ignoredChannels: string[];
    modOnly: boolean;
    modRoles: string[];
    modUsers: string[];
}

export declare type GuildSchema = Model<GuildDocument>;
