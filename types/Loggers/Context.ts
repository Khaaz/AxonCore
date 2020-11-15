import { LibGuild, LibUser } from '../';

/**
 * Construct a context object to use as a string when logging.
 *
 * @author KhaaZ
 * @class Context
 */
export declare class Context {
    public guild?: string;
    public cmd?: string;
    public user?: string;

    /**
     * Creates an instance of Context.
     * @memberof Context
     */
    constructor(guild?: string | LibGuild, cmd?: string, user?: LibUser | string);

    /**
     * @static
     * @returns A new instance of Context
     * @memberof Context
     */
    static from(ctx?: { guild?: string | LibGuild; cmd?: string; user?: string | LibUser; } ): Context;
    public get(): string;
}
