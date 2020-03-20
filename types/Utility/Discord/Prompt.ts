import {
    AxonClient, LibTextableChannel, PromptOptionsData, PromptOptions, LibClient, AxonMSGCont, LibMessage,
} from '../../';
import { EventEmitter } from 'events';

/**
 * Create a Prompt, waiting for specific input before resolving with the message Object
 *
 * @author VoidNull
 *
 * @class Prompt
 * @example let prompt = new Prompt(this.axon, msg.author.id, msg.channel, { timeoutMessage: 'Be quicker next time' });
 */
export declare class Prompt {
    private _axon: AxonClient;
    /**
     * The user ID that is bound to the current prompt
     */
    public userID: string;
    /**
     * The channel where the prompt is running
     */
    public channel: LibTextableChannel;
    private _prompt: string;
    private _options: PromptOptionsData;
    private _actualOptions: PromptOptionsData;
    private _emitter: EventEmitter;
    /**
     * Whether the Prompt timed out
     */
    public timedOut: boolean;
    /**
     * Whether the Prompt ended
     */
    public ended: boolean;
    private _boundEvent(): void;
    constructor(client: AxonClient, uID: string, channel: LibTextableChannel, defaultOptions?: PromptOptions);
    /**
     * @readonly
     */
    readonly axon: AxonClient;
    /**
     * @readonly
     */
    readonly client: LibClient;

    /**
     * Runs the prompt.
     *
     * @param prompt The prompt you would like to send
     * @param options The options for the prompt.
     *
     * @example
     * const output = await prompt.run('Who would you like to wave to?', { timeout: 10000 });
     * this.sendMessage(msg.channel, output.content);
     *
     * @returns The message object, or a reject error if timed out or message was invalid
     */
    public run(prompt: AxonMSGCont, options?: PromptOptions): Promise<LibMessage>;
    private _startTimeout(): void;
    private _deletePrompt(): void;
    /**
     * Checker for this._onMsgCreate
     *
     * @param msg The message object to check against.
     * @returns Whether the check completed successfully
     */
    private _checker(msg: LibMessage): boolean;
    private _onInvalidEnd(): string;
    private _onEnded(msg: LibMessage): LibMessage;
    private _onTimeout(): Promise<void>;
    /**
     * Message event for prompt
     * When a message is created
     *
     * @param msg The message object
     */
    private _onMsgCreate(msg: LibMessage): Promise<void>;
}
