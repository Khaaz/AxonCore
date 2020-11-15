import { LibraryInterface } from '../definitions/LibraryInterface';
import { ErisUser } from './User';
import { ErisMember } from './Member';
import { ErisGuild } from './Guild';
import { ErisChannel } from './Channel';
import { ErisMessage } from './Message';
import { ErisResolver } from './Resolver';
import { ErisClient } from './Client';
import { ErisEnums } from './Enums';
// @ts-ignore
import * as Eris from 'eris';
import { LIBRARY_TYPES, EmojiInfo } from '../..';

export declare class ErisInterface extends LibraryInterface {
    public user: ErisUser;
    public member: ErisMember;
    public guild: ErisGuild;
    // @ts-ignore
    public channel: ErisChannel;
    // @ts-ignore
    public message: ErisMessage;
    public resolver: ErisResolver
    public client: ErisClient;
    public type: LIBRARY_TYPES.ERIS;
    /**
     * Creates an instance of ErisInterface
     * @memberof ErisInterface
     */
    constructor(botClient: Eris.Client);
    /**
     * @memberof ErisInterface
     */
    public enums: ErisEnums;
    /**
     * @memberof ErisInterface
     */
    public HANDLERS: object;
    /**
     * @memberof ErisInterface
     */
    public onMessageCreate(func: (message: Eris.Message) => void): void;
    /**
     * @memberof ErisInterface
     */
    public onceReady(func: () => void): void;
    /**
     * @memberof ErisInterface
     */
    public getMessageCreate(func: (msg: Eris.Message) => void): (msg: Eris.Message) => void;
    /**
     * @memberof ErisInterface
     */
    public getMessageUpdate(func: (oldMsg: Eris.Message, msg: Eris.Message) => void): (msg: Eris.Message, oldMsg: Eris.Message) => void;
    /**
     * @memberof ErisInterface
     */
    public getMessageDelete(func: (msg: Eris.Message) => void): (msg: Eris.Message) => void;
    public onReactionAdd(func: (msg: Eris.Message, emoji: EmojiInfo, userID: string) => void, on?: boolean): void
    public onReactionRemove(func: (msg: Eris.Message, emoji: EmojiInfo, userID: string) => void, on?: boolean): void
    public onReactionRemoveAll(func: (msg: Eris.Message) => void, on?: boolean): void
    public onReactionRemoveEmoji(func: (msg: Eris.Message, emoji: EmojiInfo) => void, on?: boolean): void
}
