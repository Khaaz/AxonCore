/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { LibraryInterface } from '../definitions/LibraryInterface';
import { DjsUser } from './User';
import { DjsMember } from './Member';
import { DjsMessage } from './Message';
import { DjsChannel } from './Channel';
import { DjsGuild } from './Guild';
import { DjsResolver } from './Resolver';
import { DjsClient } from './Client';
import { DjsEnums } from './Enums';
// @ts-ignore
import * as djs from 'discord.js';

export declare class DjsInterface extends LibraryInterface {
    public user: DjsUser;
    public member: DjsMember;
    public message: DjsMessage;
    public channel: DjsChannel;
    public guild: DjsGuild;
    public resolver: DjsResolver;
    public client: DjsClient;
    public type: 1;
    /**
     * Creats an instance of DjsInterface
     * @memberof DjsInterface
     */
    constructor(botClient: djs.Client, token: string);
    /**
     * @memberof DjsInterface
     */
    public enums: DjsEnums;
    /**
     * @memberof DjsInterface
     */
    public HANDLERS: object; // Not going to list them all
    /**
     * @memberof DjsInterface
     */
    public onMessageCreate(func: (message: djs.Message) => void): void;
    /**
     * @memberof DjsInterface
     */
    public getMessageCreate(func: (msg: djs.Message) => void): (msg: djs.Message) => void;
    /**
     * @memberof DjsInterface
     */
    public getMessageUpdate(func: (oldMsg: djs.Message, msg: djs.Message) => void): (oldMsg: djs.Message, msg: djs.Message) => void;
    /**
     * @memberof DjsInterface
     */
    public getMessageDelete(func: (msg: djs.Message) => void): (msg: djs.Message) => void;
}
