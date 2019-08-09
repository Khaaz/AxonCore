import ErisInterface from './eris/ErisInterface';
import DjsInterface from './discordjs/DjsInterface';

/**
 * Library Handler
 * Use eris or discord.js.
 *
 * @author KhaaZ
 *
 * @class LibraryHandler
 */
class LibraryHandler {
    static pickLibrary(axon, axonOptions) {
        let libraryInterface;

        // eslint-disable-next-line no-shadow
        const lib = axonOptions.botConfig ? axonOptions.botConfig.library : 0;

        switch (lib) {
            // Json Database
            case 0:
            default: {
                libraryInterface = new ErisInterface(axon);
                axon.logger.info('Selected Library Interface: ERIS.');
                break;
            }

            // MongoDB Database
            case 1: {
                libraryInterface = new DjsInterface(axon, axonOptions._token);
                axon.logger.info('Selected Library Interface: DISCORD.JS.');
                break;
            }
        }

        axon.logger.axon('Library Interface ready.');
        return libraryInterface;
    }
}

export default LibraryHandler;
