import { RequestOptions } from 'http';
import {
    LibraryInterface, LibClient, LibUser, LibGuild, LibMember, ErisWebhookContent, DjsWebhookContent, WebhookResponse,
} from '../../';

export declare class Client {
    public lib: LibraryInterface;
    public baseWebhookURL: 'https://discord.com/api/webhooks/';
    /**
     * Creates an instance of Client
     * @memberof Client
     */
    constructor(lib: LibraryInterface);
    /**
     * Bot client
     * @readonly
     * @memberof Client
     */
    readonly client: LibClient;
    /**
     * Bot user ID
     * @memberof Client
     */
    public getID(): string;
    /**
     * Bot username
     * @memberof Client
     */
    public getUsername(): string | null;
    /**
     * Bot mention
     * @memberof Client
     */
    public getMention(): string;
    /**
     * Bot avatar
     * @memberof Client
     */
    public getAvatar(): string | null; // Not Implemented
    /**
     * Bot user
     * @memberof Client
     */
    public getUser(): LibUser;
    /**
     * Bot guild member
     * @memberof Client
     */
    public getMember(guild: LibGuild): LibMember;
    /**
     * Connect the client to the gateway
     * @memberof Client
     */
    public connect(): Promise<void | string>;
    /**
     * Set the bot Presence
     * @memberof Client
     */
    public setPresence(status: string, game: object): Promise<LibUser | void>;
    /**
     * Execute a webhook and send a message
     * @memberof Client
     */
    public triggerWebhook(id: string, token: string, data: ErisWebhookContent | DjsWebhookContent): Promise<WebhookResponse | null>;
    private _request(url: string, params: RequestOptions, postData: any): Promise<any>;
}
