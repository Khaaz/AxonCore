import ASelector from '../Structures/ASelector';
import JsonProvider from './JsonProvider';

import { DB_TYPES } from './../Utility/Constants/AxonEnums';

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
    static select(axonClient, axonOptions) {
        let DBProvider;

        // eslint-disable-next-line no-shadow
        const { db } = axonOptions.settings;

        switch (db) {
            // No database
            case DB_TYPES.DBLESS:
            default: {
                const InMemoryProvider = require('./InMemoryProvider').default;
                DBProvider = new InMemoryProvider(axonClient);
                axonClient.log('INFO', 'Selected Database: Database-Less');
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

        DBProvider.init(axonOptions);
        axonClient.log('NOTICE', 'DB ready.');
        return DBProvider;
    }
}

export default DBSelector;
