'use strict';

import JsonService from './JsonService';

/**
 * Database Handler
 * Use require to dynamically load a Database Service regarding dependencies
 *
 * @author KhaaZ
 *
 * @class DBHandler
 */
class DBHandler {
    static pickDBService(axonOptions, axon) {
        let DBservice;

        switch (axonOptions.axonConf.db) {
            // Json Database
            case 0:
            default: {
                DBservice = JsonService;
                axon.Logger.info('Database: JSON DB.');
                break;
            }

            // MongoDB Database
            case 1: {
                try {
                    const MongoService = require('./MongoService').default;

                    DBservice = new MongoService(axon);
                    DBservice.init(axonOptions);

                    axon.Logger.info('Database: Mongo DB.');
                } catch (err) {
                    DBservice = JsonService;
                    axon.Logger.warn('Mongo fail, Json DB');
                    axon.Logger.info('Database: JSON DB.');
                }
                break;
            }
        }

        axon.Logger.axon('DB ready');
        return DBservice;
    }
}

export default DBHandler;
