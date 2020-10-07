import {
    Message, Member, Client, Guild, User, TextableChannel, Role, Channel, PrivateChannel, Permission, PermissionOverwrite, AllowedMentions, Textable, PartialEmoji,
    // @ts-ignore
} from 'eris';

declare type LibMessage<T extends Textable = LibTextableChannel> = Message<T>;
declare type LibMember = Member;
declare type LibClient = Client;
declare type LibGuild = Guild;
declare type LibUser = User;
declare type LibTextableChannel = TextableChannel;
declare type LibRole = Role;
declare type LibChannel = Channel;
declare type LibDMChannel = PrivateChannel;
declare type LibPermission = Permission | PermissionOverwrite;
declare type LibAllowedMentions = AllowedMentions;
declare type LibEmoji = PartialEmoji;

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
    LibEmoji,
};
