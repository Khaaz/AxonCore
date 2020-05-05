import { MessageManager, Languages, AxonLanguageResponse } from '..';

/**
 * Class dedicated to manage translations.
 * Holds all translations and get the message for the default lang or the specified lang.
 *
 * @author KhaaZ
 *
 * @class TranslationManager
 */
export declare class TranslationManager {
    private _manager: MessageManager;
    /** The default lang */
    public lang: string;
    /**
     * Creates an instance of TranslationManager.
     * @memberof TranslationManager
     */
    constructor(manager: MessageManager, lang: string);

    /**
     * Returns all messages (all langs)
     *
     * @readonly
     * @memberof TranslationManager
     */
    readonly messages: Languages;
    /**
     * Return all messages for the specified lang or the default lang if no specified lang.
     *
     * @memberof TranslationManager
     */
    public getMessages(lang: string): AxonLanguageResponse;
    /**
     * Return a specified message for the specified lang or the default lang if no specified lang
     *
     * @memberof TranslationManager
     */
    public getMessage(message: string, lang: string): string;
}
