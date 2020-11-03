import { MessageManager, Languages, AxonLanguageResponse, DefaultLanguageResponse } from '..';

/**
 * Class dedicated to manage translations.
 * Holds all translations and get the message for the default lang or the specified lang.
 *
 * @author KhaaZ
 *
 * @class TranslationManager
 */
export declare class TranslationManager<L extends AxonLanguageResponse = DefaultLanguageResponse> {
    private _manager: MessageManager<L>;
    /** The default lang */
    public lang: string;
    /**
     * Creates an instance of TranslationManager.
     * @memberof TranslationManager
     */
    constructor(manager: MessageManager<L>, lang: string);

    /**
     * Returns all messages (all langs)
     *
     * @readonly
     * @memberof TranslationManager
     */
    readonly messages: Languages<L>;
    /**
     * Return all messages for the specified lang or the default lang if no specified lang.
     *
     * @memberof TranslationManager
     */
    public getMessages(lang: string): L;
    /**
     * Return a specified message for the specified lang or the default lang if no specified lang
     *
     * @memberof TranslationManager
     */
    public getMessage(message: string, lang?: string): string;
}
