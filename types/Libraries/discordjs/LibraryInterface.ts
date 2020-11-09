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
import { LIBRARY_TYPES, EmojiInfo } from '../..';

export declare class DjsInterface extends LibraryInterface {
    public user: DjsUser;
    public member: DjsMember;
    public message: DjsMessage;
    // @ts-ignore
    public channel: DjsChannel;
    public guild: DjsGuild;
    public resolver: DjsResolver;
    public client: DjsClient;
    public type: LIBRARY_TYPES.DISCORDJS;
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
    public onceReady(func: () => void): void;
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
    /**
     * @memberof DjsInterface
     */
    private _addRawListener(t: string, f: (...args: any[] ) => void): void;
    /**
     * @memberof DjsInterface
     */
    private _removeRawListener(t: string, f: (...args: any[] ) => void): void;
    /**
     * @memberof DjsInterface
     */
    private _handleRaw(): void;
    /**
     * @memberof DjsInterface
     */
    public getMessageReactionAdd(func: (msg: djs.Message, emoji: EmojiInfo, userID: string) => void): Function;
    /**
     * @memberof DjsInterface
     */
    public getMessageReactionRemove(func: (msg: djs.Message, emoji: EmojiInfo, userID: string) => void): Function;
    /**
     * @memberof DjsInterface
     */
    public getMessageReactionRemoveAll(func: (msg: djs.Message, emoji: EmojiInfo, userID: string) => void): Function;
    /**
     * @memberof DjsInterface
     */
    public getMessageReactionRemoveEmoji(func: (msg: djs.Message, emoji: EmojiInfo, userID: string) => void): Function;

    /**
     * @memberof DjsInterface
     */
    public onReactionAdd(func: (msg: djs.Message, emoji: EmojiInfo, userID: string) => void, on?: boolean): void
    /**
     * @memberof DjsInterface
     */
    public onReactionRemove(func: (msg: djs.Message, emoji: EmojiInfo, userID: string) => void, on?: boolean): void
    /**
     * @memberof DjsInterface
     */
    public onReactionRemoveAll(func: (msg: djs.Message) => void, on?: boolean): void
    /**
     * @memberof DjsInterface
     */
    public onReactionRemoveEmoji(func: (msg: djs.Message, emoji: EmojiInfo) => void, on?: boolean): void
}
