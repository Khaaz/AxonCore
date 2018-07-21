import Bot from './Bot';

// packages
import mongoose from 'mongoose';

try {
    mongoose.connect('mongodb://localhost/AxonCoreDB');
    Bot.Logger.notice('Connected to AxonCore DataBase.');
} catch (e) {
    Bot.Logger.emerg('Could NOT connect to AxonCore DataBase.\n' + e.stack);
}

// User ned to Deal with error listener by himself
// where to log etc
// Error Listeners
process.on('uncaughtException', (err) => {
    Bot.Logger.emerg(err.stack);
    
    Bot.emit('error', err);
    
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    Bot.Logger.error(err.stack);

    Bot.emit('error', err);
    
});

Bot.on('error', (err) => {
    Bot.Logger.error(err.stack);
});

Bot.on('warn', (msg) => {
    Bot.Logger.warn(msg);
});

// Connection
Bot.connect();

Bot.Logger.notice('=== ONLINE ===');
