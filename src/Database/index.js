'use strict';

import JsonService from './JsonService';

/**
 * Logger Handler
 * Use require to dunamically load a Logger regarding dependencies
 *
 * @author Eleos, KhaaZ
 *
 * @class DBHandler
 */
class DBHandler {
    static pickDBService(config, logger) {
        let DBservice;

        switch (config.db) {
            // Json Database
            case 0:
            default: {
                DBservice = JsonService;
                logger.info('Database: JSON DB.');
                break;
            }

            // MongoDB Database
            case 1: {
                try {
                    DBservice = require('./MongoService').default;
                    logger.info('Database: Mongo DB.');
                } catch (err) {
                    DBservice = JsonService;
                    logger.warn('Mongo fail, Json DB');
                    logger.info('Database: JSON DB.');
                }
                break;
            }
        }

        return DBservice;
    }
}

export default DBHandler;
