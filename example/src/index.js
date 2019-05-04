import Bot from './Bot';
import customConf from './configs/customConf.json';

if (customConf.db === 1) {
    try {
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/AxonCoreDB', {
            useCreateIndex: true,
            autoReconnect: true,
        } )
            .then( () => {
                Bot.Logger.notice('Connected to AxonCore DataBase.');
            } )
            .catch(err => {
                Bot.Logger.emerg(`Could NOT connect to AxonCore DataBase.\n${err.stack}`);
            } );
    } catch (e) {
        Bot.Logger.emerg(`Could NOT connect to AxonCore DataBase.\n${e.stack}`);
    }
}

Bot.start();

Bot.Logger.notice('=== ONLINE ===');
