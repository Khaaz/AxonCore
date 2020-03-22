import Bot from './Bot';
import customConf from './configs/customConfig.json';

if (customConf.db === 1) {
    try {
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/AxonCoreDB', {
            useCreateIndex: true,
            autoReconnect: true,
        } )
            .then( () => {
                Bot.logger.notice('Connected to AxonCore DataBase.');
            } )
            .catch(err => {
                Bot.logger.fatal(`Could NOT connect to AxonCore DataBase.\n${err.stack}`);
            } );
    } catch (e) {
        Bot.logger.fatal(`Could NOT connect to AxonCore DataBase.\n${e.stack}`);
    }
}

Bot.start();

Bot.logger.notice('=== ONLINE ===');
