import defaultBotConfig from '../../Configs/botConfig.json';
import defaultTemplateConfig from '../../Configs/templateConfig.json';
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
     * @param {Object} { axonConfig, templateConfig, tokenConfig }
     * @returns {Object} The newly created configs object
     * @memberof ClientInitialiser
     */
    static initConfigs( { botConfig, templateConfig, tokenConfig } ) {
        const configs = {};

        /** Axon Config */
        if (botConfig && Utils.compareObject(defaultBotConfig, botConfig) ) {
            configs.bot = botConfig;
        } else {
            configs.bot = defaultBotConfig;
            DefaultLogger.error('Couldn\'t init custom axon config: Invalid format. Uused default values instead.');
        }

        /** Template Config */
        if (templateConfig && Utils.compareObject(defaultTemplateConfig, templateConfig) ) {
            configs.template = templateConfig;
        } else {
            configs.template = defaultTemplateConfig;
            DefaultLogger.warn('Couldn\'t init custom template config: Invalid format. Uused default values instead.');
        }

        /** Token Config */
        if (tokenConfig && Utils.compareObject(defaultTokenConfig, tokenConfig) ) {
            configs._tokens = tokenConfig;
        } else {
            configs._tokens = defaultTokenConfig;
            DefaultLogger.warn('Couldn\'t init custom token config: Invalid format. Uused default values instead.');
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
        
        axon.axonConfig = axonConf;
        axon.logger.init('[INIT] Axon config initialised!');
    }
}

export default ClientInitialiser;
