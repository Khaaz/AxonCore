import {
    AxonClient, Languages, TranslationManager, MessageParser, AxonLanguageResponse,
} from '../../';

/**
 * Holds all messages.
 * Used as an interface to get the message in the correct lang and parse arguments from the message.
 *
 * @author KhaaZ
 *
 * @class MessageManager
 */
export declare class MessageManager {
    private _axon: AxonClient;
    /** All messages (all langs) */
    private _messages: Languages;
    public translation: TranslationManager;
    public parser: MessageParser;

    /**
     * Creates an instance of MessageManager.
     * Dynamically create one method for each message so we can use <this>.MESSAGE_CONSTANT() directly. It will actually call the get method.
     *
     * @memberof MessageManager
     */
    constructor(axonClient: AxonClient, messages: Languages, baseLang: string)

    /**
     * Returns all messages (all langs)
     *
     * @readonly
     * @memberof MessageManager
     */
    readonly messages: Languages;
    /**
     * All message from the given lang (or default lang)
     *
     * @returns Object with all messages
     * @memberof MessageManager
     */
    public getMessages(lang?: string): AxonLanguageResponse;
    /**
     * The message in the given lang (or default lang)
     *
     * @returns The message
     * @memberof MessageManager
     */
    public getMessage(message: string, lang?: string): string;
    /**
     * Get the message in the correct lang, parsed to replace {{key}} with the correct argument
     *
     * @returns The actual message
     * @memberof MessageManager
     */
    public get(message: string, args: AxonLanguageResponse, lang: string): string;
}
