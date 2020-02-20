
export declare class ErisInterface extends LibraryInterface {
    public user: ErisUser;
    public member: ErisMember;
    public guild: ErisGuild;
    public channel: ErisChannel;
    public message: ErisMessage;
    public resolver: ErisResolver
    public client: ErisClient;
    public type: 0;
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
}
