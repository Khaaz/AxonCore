import { DjsPresenceGame, DjsWebhookContent, WebhookResponse } from '../../';
import { DjsInterface } from './LibraryInterface';
import { Client } from '../definitions/Client';
// @ts-ignore
import * as djs from 'discord.js';

export declare class DjsClient extends Client {
    private _token: string;
    /**
     * Creates an instance of DjsClient
     * @memberof DjsClient
     */
    constructor(lib: DjsInterface, token: string);
    /**
     * @readonly
     * @memberof DjsClient
     */
    readonly client: djs.Client;
    /**
     * @memberof DjsClient
     */
    public getAvatar(): string | null;
    /**
     * @memberof DjsClient
     */
    public getMember(guild: djs.Guild): djs.GuildMember;
    /**
     * @memberof DjsClient
     */
    public connect(): Promise<string>;
    /**
     * @memberof DjsClient
     */
    public setPresence(status: djs.PresenceStatus, game: DjsPresenceGame): Promise<djs.ClientUser>;
    /**
     * @memberof DjsClient
     */
    public triggerWebhook(id: string, token: string, data: DjsWebhookContent): Promise<WebhookResponse>;
}
