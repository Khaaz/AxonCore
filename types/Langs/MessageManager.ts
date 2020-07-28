import {
    AxonClient, Languages, TranslationManager, MessageParser, AxonLanguageResponse, DefaultLanguageResponse,
} from '..';

/**
 * Holds all messages.
 * Used as an interface to get the message in the correct lang and parse arguments from the message.
 *
 * @author KhaaZ
 *
 * @class MessageManager
 */
export declare class MessageManager<L extends AxonLanguageResponse = DefaultLanguageResponse> {
    private _axon: AxonClient;
    /** All messages (all langs) */
    private _messages: Languages<L>;
    public translation: TranslationManager<L>;
    public parser: MessageParser;

    /**
     * Creates an instance of MessageManager.
     * Dynamically create one method for each message so we can use <this>.MESSAGE_CONSTANT() directly. It will actually call the get method.
     *
     * @memberof MessageManager
     */
    constructor(axonClient: AxonClient, messages: Languages<L>, baseLang: string)

    /**
     * Returns all messages (all langs)
     *
     * @readonly
     * @memberof MessageManager
     */
    readonly messages: Languages<L>;
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
    public getMessage(message: keyof L, lang?: string): string;
    /**
     * Get the message in the correct lang, parsed to replace {{key}} with the correct argument
     *
     * @returns The actual message
     * @memberof MessageManager
     */
    public get(message: keyof L, args: AxonLanguageResponse, lang: string): string;
}

type DynamicMethods<L extends AxonLanguageResponse = DefaultLanguageResponse> = {
    [P in keyof L]: (args: AxonLanguageResponse, lang: string) => string;
}

export declare type MessageManagerType<L extends AxonLanguageResponse = DefaultLanguageResponse> = MessageManager<L> & DynamicMethods<L>;
