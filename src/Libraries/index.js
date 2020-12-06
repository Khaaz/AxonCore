import ASelector from '../Core/ASelector';

import ErisInterface from './eris/ErisInterface';
import DjsInterface from './discordjs/DjsInterface';
import DetritusInterface from './detritusjs/DetritusInterface';


import { LIBRARY_TYPES } from '../Utility/Constants/AxonEnums';

/**
 * @typedef {import('../AxonClient').default} AxonClient
 * @typedef {import('../AxonOptions').default} AxonOptions
 */

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
    /**
     * @param {AxonClient} axon
     * @param {AxonOptions} axonOptions
     */
    static select(axon, axonOptions) {
        let libraryInterface;

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

            case LIBRARY_TYPES.DETRITUSJS: {
                libraryInterface = new DetritusInterface(axon.botClient);
                axon.log('INFO', 'Selected Library Interface: DETRITUS.JS.');
                break;
            }

            default: {
                axon.log('WARN', 'No Selected Library Interface.');
                libraryInterface = new ErisInterface(axon.botClient);
                axon.log('INFO', '[DEFAULT] Selected Library Interface: ERIS.');
            }
        }

        axon.log('NOTICE', `Library Interface ready. [TYPE: ${libraryInterface.type}]`);
        return libraryInterface;
    }
}

export default LibrarySelector;
