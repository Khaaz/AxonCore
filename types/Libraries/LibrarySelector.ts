import { ASelector, AxonClient, AxonOptions } from '../';
import { ErisInterface } from './eris/LibraryInterface';
import { DjsInterface } from './discordjs/LibraryInterface';

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
