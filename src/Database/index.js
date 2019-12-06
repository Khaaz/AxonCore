import JsonProvider from './JsonProvider';
import SequelizeService from './SequelizeService';

/**
 * Database Handler
 * Use require to dynamically load a Database Provider depending on installed dependencies.
 *
 * @author KhaaZ
 *
 * @class DBHandler
 */
class DBHandler {
    static pickDBProvider(axonOptions, axon) {
        let DBProvider;

        // eslint-disable-next-line no-shadow
        const db = axonOptions.botConfig ? axonOptions.botConfig.db : 0;

        switch (db) {
            // Json Database
            case 0:
            default: {
                DBProvider = new JsonProvider(axon);
                axon.logger.info('Selected Database: JSON DB.');
                break;
            }

            // MongoDB Database
            case 1: {
                try {
                    const MongoService = require('./MongoProvider').default;
                    DBProvider = new MongoService(axon);
                    axon.logger.info('Selected Database: MongoDB.');
                } catch (err) {
                    DBProvider = new JsonProvider(axon);
                    axon.logger.warn('Mongoose wasn\'t found, using JSON DB instead.');
                    axon.logger.info('Selected Database: JSON DB.');
                }
                break;
            }

            // SequelizeService
            case 2: {
                try {
                    let opts = axonOptions.axonConf.sequelize ? axonOptions.axonConf.sequelize : {dialiect: 'mysql'};
                    DBservice = new SequelizeService(axon);
                    DBservice.init(opts);
                    axon.Logger.info('Selected Database: Sequelize');
                } catch (err) {
                    DBservice = new JsonService();
                    axon.Logger.warn('Sequelize wasn\'t found, using JSON DB instead.');
                    axon.Logger.info('Selected Database: JSON DB.');
                }
                break;
            }
        }

        DBProvider.init(axonOptions);
        axon.logger.axon('DB ready.');
        return DBProvider;
    }
}

export default DBHandler;
