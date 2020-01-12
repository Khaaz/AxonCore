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
    static select(axonOptions, axon) {
        let DBProvider;

        // eslint-disable-next-line no-shadow
        const { db } = axonOptions.settings;

        switch (db) {
            // No database
            case DB_TYPES.DBLESS:
            default: {
                const InMemoryProvider = require('./InMemoryProvider').default;
                DBProvider = new InMemoryProvider(axon);
                axon.log('INFO', 'Selected Database: Database-Less');
                axon.log('WARN', 'Configs will not change.');
                break;
            }

            // Json Database
            case DB_TYPES.JSON: {
                DBProvider = new JsonProvider(axon);
                axon.log('INFO', 'Selected Database: JSON DB.');
                break;
            }

            // MongoDB Database
            case DB_TYPES.MONGO: {
                try {
                    const MongoService = require('./MongoProvider').default;
                    DBProvider = new MongoService(axon);
                    axon.log('INFO', 'Selected Database: MongoDB.');
                } catch (err) {
                    DBProvider = new JsonProvider(axon);
                    axon.log('WARN', 'Mongoose wasn\'t found, using JSON DB instead.');
                    axon.log('INFO', 'Selected Database: JSON DB.');
                }
                break;
            }
        }

        DBProvider.init(axonOptions);
        axon.log('NOTICE', 'DB ready.');
        return DBProvider;
    }
}

export default DBSelector;
