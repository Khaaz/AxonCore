/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Client } from '../definitions/Client';
// @ts-ignore
import * as Eris from 'eris';
import { ErisPresenceGame, ErisWebhookContent, WebhookResponse } from '../../';

export declare class ErisClient extends Client {
    /**
     * @readonly
     * @memberof ErisClient
     */
    readonly client: Eris.Client;
    /**
     * @memberof ErisClient
     */
    public getMember(guild: Eris.Guild): Eris.Member;
    /**
     * @memberof ErisClient
     */
    public connect(): Promise<void>;
    /**
     * @memberof ErisClient
     */
    public setPresence(status: 'online' | 'idle' | 'dnd' | 'invisible', game: ErisPresenceGame): Promise<void>;
    /**
     * @memberof ErisClient
     */
    public triggerWebhook(id: string, token: string, data: ErisWebhookContent): Promise<WebhookResponse>;
}
