import ASelector from '../Core/ASelector';
import JsonProvider from './JsonProvider';

import { DB_TYPES } from './../Utility/Constants/AxonEnums';

/**
 * @typedef {import('../AxonClient').default} AxonClient
 * @typedef {import('../AxonOptions').default} AxonOptions
 */

/**
 * Database Selector
 * Use require to dynamically load a Database Provider depending on installed dependencies.
 *
 * @author KhaaZ
 *
 * @class DBSelector
 * @extends ASelector
 */
class DBSelector extends ASelector {
    /**
     * Select the DB to use
     * @param {AxonClient} axonClient AxonClient
     * @param {AxonOptions} axonOptions AxonOptions
     */
    static select(axonClient, axonOptions) {
        let DBProvider;

        const dbType = axonOptions.settings.db;

        switch (dbType) {
            // No database
            case DB_TYPES.IN_MEMORY:
            default: {
                const InMemoryProvider = require('./InMemoryProvider').default;
                DBProvider = new InMemoryProvider(axonClient);
                axonClient.log('INFO', 'Selected Database: In-Memory');
                axonClient.log('WARN', 'Configs will not change.');
                break;
            }

            // Json Database
            case DB_TYPES.JSON: {
                DBProvider = new JsonProvider(axonClient);
                axonClient.log('INFO', 'Selected Database: JSON DB.');
                break;
            }

            // MongoDB Database
            case DB_TYPES.MONGO: {
                try {
                    const MongoService = require('./MongoProvider').default;
                    DBProvider = new MongoService(axonClient);
                    axonClient.log('INFO', 'Selected Database: MongoDB.');
                } catch (err) {
                    DBProvider = new JsonProvider(axonClient);
                    axonClient.log('WARN', 'Mongoose wasn\'t found, using JSON DB instead.');
                    axonClient.log('INFO', 'Selected Database: JSON DB.');
                }
                break;
            }
        }
        return DBProvider;
    }
}

export default DBSelector;
