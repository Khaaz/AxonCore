import defaultBotConfig from '../../Configs/botConfig.json';
import defaultTokenConfig from '../../Configs/tokenConfig.json';

import Utils from '../../Utility/Utils';
import DefaultLogger from '../../Loggers/Logger';

/**
 * Loads the AxonClient.
 *
 * @author KhaaZ
 *
 * @static
 * @class ClientInitialiser
 */
class ClientInitialiser {
    /**
     * Create a config object from configs given in parameters.
     * Ensure config validity by comparing to the default one. Make sure the config has all required fields.
     *
     * @static
     * @param {Object} { axonConfig, tokenConfig }
     * @returns {Object} The newly created configs object
     * @memberof ClientInitialiser
     */
    static initConfigs( { botConfig, tokenConfig } ) {
        const configs = {};

        /** Axon Config */
        if (botConfig && Utils.compareObject(defaultBotConfig, botConfig) ) {
            configs.bot = botConfig;
        } else {
            configs.bot = defaultBotConfig;
            DefaultLogger.error('Couldn\'t init custom axon config: Invalid format. Used default values instead.');
        }

        /** Token Config */
        if (tokenConfig && Utils.compareObject(defaultTokenConfig, tokenConfig) ) {
            configs._tokens = tokenConfig;
        } else {
            configs._tokens = defaultTokenConfig;
            DefaultLogger.warn('Couldn\'t init custom token config: Invalid format. Used default values instead.');
        }

        DefaultLogger.init('Configs initialised!');
        return configs;
    }

    /**
     * Initialise AxonStaff from the configuration file.
     *
     * @static
     * @param {Object} botConfig
     * @param {Object} logger
     * @returns {Object} Axon staff newly created.
     * @memberof ClientInitialiser
     */
    static initStaff(botConfig, logger) {
        const staff = {};

        for (const s of Object.keys(botConfig.staff) ) {
            staff[s] = botConfig.staff[s].map(o => o.id);
        }
        logger.init('Bot-Staff engaged!');

        return staff;
    }

    /**
     * Initialise AxonConfig from the DB.
     * Either create or fetch it.
     *
     * This method needs to directly add the axonConfig to axonClient.
     * Otherwise the return value is a promise.
     *
     * @static
     * @param {Object<AxonClient>} axon
     * @memberof ClientInitialiser
     */
    static async initAxon(axon) {
        let axonConf;
        try {
            axonConf = await axon.DBProvider.fetchAxon();
            if (!axonConf) {
                axonConf = await axon.DBProvider.initAxon();
            }
        } catch (err) {
            axonConf = await axon.DBProvider.initAxon();
        }
        
        // eslint-disable-next-line require-atomic-updates
        axon.axonConfig = axonConf; // We have to do it here and not return the value because we need to unwap the promise and actually assign the value.
        
        axon.logger.init('[INIT] Axon config initialised!');
    }
}

export default ClientInitialiser;
