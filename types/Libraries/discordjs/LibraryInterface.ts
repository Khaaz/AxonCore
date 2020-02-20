
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
    public enums: DjsEnums;
    public HANDLERS: object; // Not going to list them all
    public onMessageCreate(func: (message: djs.Message) => void): void;
}
