
/**
 * Library Handler
 * Use eris or discord.js.
 *
 * @author KhaaZ
 *
 * @class LibrarySelector
 * @extends ASelector
 */
export declare class LibrarySelector extends ASelector {
    static select(axon: AxonClient, axonOptions: AxonOptions): ErisInterface | DjsInterface;
}
