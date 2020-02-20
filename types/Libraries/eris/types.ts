import {
    Message, Member, Client, Guild, User, TextableChannel, Role, Channel, PrivateChannel, Permission, PermissionOverwrite,
} from 'eris';

declare type LibMessage = Message;
declare type LibMember = Member;
declare type LibClient = Client;
declare type LibGuild = Guild;
declare type LibUser = User;
declare type LibTextableChannel = TextableChannel;
declare type LibRole = Role;
declare type LibChannel = Channel;
declare type LibDMChannel = PrivateChannel;
declare type LibPermission = Permission | PermissionOverwrite;

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
};
