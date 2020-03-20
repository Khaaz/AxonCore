import {
    Message, GuildMember, Client, Guild, User, TextChannel, Role, Channel, DMChannel, PermissionOverwrites, MessageMentionOptions,
} from 'discord.js';

declare type LibMessage = Message;
declare type LibMember = GuildMember;
declare type LibClient = Client;
declare type LibGuild = Guild;
declare type LibUser = User;
declare type LibTextableChannel = TextChannel;
declare type LibRole = Role;
declare type LibChannel = Channel;
declare type LibDMChannel = DMChannel;
declare type LibPermission = PermissionOverwrites;
declare type LibAllowedMentions = MessageMentionOptions;

export {
    LibMessage,
    LibMember,
    LibClient,
    LibGuild,
    LibUser,
    LibTextableChannel,
    LibRole,
    LibChannel,
    LibDMChannel,
    LibPermission,
    LibAllowedMentions,
};
