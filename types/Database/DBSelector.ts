import {
    ASelector, AxonClient, AxonOptions, InMemoryProvider, JsonProvider, MongoProvider,
} from '..';

/**
 * Database Selector
 * Use require to dynamically load a Database Provider depending on installed dependencies.
 *
 * @author KhaaZ
 *
 * @class DBSelector
 * @extends ASelector
 */
export declare class DBSelector extends ASelector {
    /**
     * Select the DB to use
     * @param axonClient AxonClient
     * @param axonOptions AxonOptions
     */
    select(axonClient: AxonClient, axonOptions: AxonOptions): new (...args: any[] ) => (InMemoryProvider | JsonProvider | MongoProvider);
}
