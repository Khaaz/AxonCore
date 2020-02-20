import { LibClient } from './types';
import { User } from './User';
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
    public enums: Enums;
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
}
