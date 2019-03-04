import JsonService from './JsonService';

/**
 * Database Handler
 * Use require to dynamically load a Database Service depending on installed dependencies.
 *
 * @author KhaaZ
 *
 * @class DBHandler
 */
class DBHandler {
    static pickDBService(axonOptions, axon) {
        let DBservice;

        const db = axonOptions.axonConf ? axonOptions.axonConf.db : 0;

        switch (db) {
            // Json Database
            case 0:
            default: {
                DBservice = new JsonService();
                axon.Logger.info('Selected Database: JSON DB.');
                break;
            }

            // MongoDB Database
            case 1: {
                try {
                    const MongoService = require('./MongoService').default;

                    DBservice = new MongoService(axon);
                    DBservice.init(axonOptions);

                    axon.Logger.info('Selected Database: MongoDB.');
                } catch (err) {
                    DBservice = new JsonService();
                    axon.Logger.warn('MongoDB wasn\'t found, using JSON DB instead.');
                    axon.Logger.info('Selected Database: JSON DB.');
                }
                break;
            }
        }

        axon.Logger.axon('DB ready.');
        return DBservice;
    }
}

export default DBHandler;
