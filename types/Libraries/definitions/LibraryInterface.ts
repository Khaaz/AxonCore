import {
    LibClient, LibraryInterfaceStructs, LibMessage, LIBRARY_TYPES,
} from '../../';
import { User } from './User';
import { Member } from './Member';
import { Guild } from './Guild';
import { Channel } from './Channel';
import { Message } from './Message';
import { Resolver } from './Resolver';
import { Client } from './Client';
import { DefaultEnums as Enums } from './Enums';
import { DjsEnums } from '../discordjs/Enums';
import { ErisEnums } from '../eris/Enums';

/**
 * Base class that handle any interaction with the library.
 *
 * @author KhaaZ
 *
 * @class LibraryInterface
 */
export declare class LibraryInterface {
    private _botClient: LibClient;
    public user: User;
    public member: Member;
    public guild: Guild;
    public channel: Channel;
    public message: Message;
    public resolver: Resolver;
    public client: Client;
    public type: LIBRARY_TYPES;
    /**
     * Creates an instance of LibraryInterface
     * @memberof LibraryInterface
     */
    constructor(botClient: LibClient, structs: LibraryInterfaceStructs);
    /**
     * Bot client
     * @readonly
     * @memberof LibraryInterface
     */
    readonly botClient: LibClient;
    /**
     * @memberof LibraryInterface
     */
    public enums: Enums | DjsEnums | ErisEnums;
    /**
     * @memberof LibraryInterface
     */
    public HANDLERS: object;
    /**
     * @memberof LibraryInterface
     */
    public onMessageCreate(func: (message: LibMessage) => void): void; // Not Implemented
    /**
     * @memberof LibraryInterface
     */
    public onceReady(func: () => void): void; // Not Implemented

    /**
     * @memberof LibraryInterface
     */
    public getMessageCreate(func: (msg: LibMessage) => void): Function;

    /**
     * @memberof LibraryInterface
     */
    public getMessageUpdate(func: (oldMsg: LibMessage, msg: LibMessage) => void): Function;

    /**
     * @memberof LibraryInterface
     */
    public getMessageDelete(func: (msg: LibMessage) => void): Function;
}
