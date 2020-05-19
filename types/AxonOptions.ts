import {
    AxonOptionsPrefixes, AOptionsSettings, Languages, AxonOptionsInfo, AxonOptionsStaff, AxonTemplate, Webhooks, AxonOptionsExtensions, AxonOptionsBase,
} from './';

export declare class AxonOptions {
    /**
     * The discord token to automatically connect the bot client
     */
    private _token: string;
    /**
     * Bot prefixes
     */
    public prefixes: AxonOptionsPrefixes;
    /**
     * Bot settings
     */
    public settings: AOptionsSettings;
    /**
     * Translation file
     */
    public lang: Languages;
    /**
     * Custom function that will log a custom logo on startup
     */
    public logo: ( (packageJSONversion: string) => void) | null;
    /**
     * General info about the bot
     */
    public info: AxonOptionsInfo;
    /**
     * The bot staff (owner, admins)
     */
    public staff: AxonOptionsStaff;
    /**
     * Template information (colours / formatting / emojis)
     */
    public template: AxonTemplate;
    /**
     * Custom configs that can be provided
     */
    public custom: object | null;
    /**
     * Webhooks tokens / id
     */
    public webhooks: Webhooks;
    /**
     * Classes overrides
     */
    public extensions: AxonOptionsExtensions;
    /**
     * Creates an instance of AxonOptions.
     *
     * @param data - AxonOptions data
     * @param webhooks - Webhooks tokens / id
     * @param extensions - Classes overrides
     * @memberof AxonOptions
     */
    constructor(data?: AxonOptionsBase | {}, webhooks?: Webhooks | {}, extensions?: AxonOptionsExtensions | {} )
}
