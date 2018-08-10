'use strict';
import Bot from './Bot';

// packages
import mongoose from 'mongoose';
try {
    mongoose.connect('mongodb://localhost/AxonCoreDB');
    Bot.Logger.notice('Connected to AxonCore DataBase.');
} catch (e) {
    Bot.Logger.emerg('Could NOT connect to AxonCore DataBase.\n' + e.stack);
}

Bot.start();

Bot.Logger.notice('=== ONLINE ===');
