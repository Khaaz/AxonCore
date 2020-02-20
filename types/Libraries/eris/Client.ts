
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
