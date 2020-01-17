import ASelector from '../Structures/ASelector';

import ErisInterface from './eris/ErisInterface';
import DjsInterface from './discordjs/DjsInterface';

import { LIBRARY_TYPES } from '../Utility/Constants/AxonEnums';

/**
 * Library Handler
 * Use eris or discord.js.
 *
 * @author KhaaZ
 *
 * @class LibrarySelector
 * @extends ASelector
 */
class LibrarySelector extends ASelector {
    static select(axon, axonOptions) {
        let libraryInterface;

        // eslint-disable-next-line no-shadow
        const lib = axonOptions.settings ? axonOptions.settings.library : 0;

        switch (lib) {
            // Eris
            case LIBRARY_TYPES.ERIS: {
                libraryInterface = new ErisInterface(axon.botClient);
                axon.log('INFO', 'Selected Library Interface: ERIS.');
                break;
            }

            // Discordjs
            case LIBRARY_TYPES.DISCORDJS: {
                libraryInterface = new DjsInterface(axon.botClient, axonOptions._token);
                axon.log('INFO', 'Selected Library Interface: DISCORD.JS.');
                break;
            }

            default: {
                axon.log('WARN', 'No Selected Library Interface.');
                libraryInterface = new ErisInterface(axon.botClient);
                axon.log('INFO', '[DEFAULT] Selected Library Interface: ERIS.');
            }
        }

        return libraryInterface;
    }
}

export default LibrarySelector;
