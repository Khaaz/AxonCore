/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import * as Eris from 'eris';
// @ts-ignore
import * as Djs from 'discord.js';

declare type LibMessage = Eris.Message | Djs.Message;
declare type LibMember = Eris.Member | Djs.GuildMember;
declare type LibClient = Eris.Client | Djs.Client;
declare type LibGuild = Eris.Guild | Djs.Guild;
declare type LibUser = Eris.User | Djs.User;
declare type LibTextableChannel = Eris.TextableChannel | Djs.TextChannel;
declare type LibRole = Eris.Role | Djs.Role;
declare type LibChannel = Eris.Channel | Djs.Channel;
declare type LibDMChannel = Eris.PrivateChannel | Djs.DMChannel;
declare type LibPermission = Eris.Permission | Eris.PermissionOverwrite | Djs.PermissionOverwrites;
declare type LibAllowedMentions = Eris.AllowedMentions | Djs.MessageMentionOptions;

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
