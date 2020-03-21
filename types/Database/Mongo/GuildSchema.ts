import { Document } from 'mongoose';

export declare interface GuildSchema extends Document {
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
