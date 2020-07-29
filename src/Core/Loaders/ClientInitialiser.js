/**
 * @typedef {import('../../Loggers/ALogger').default} ALogger
 * @typedef {import('../../AxonClient').default} AxonClient
 * @typedef {import('../../AxonOptions').default} AxonOptions
 * @typedef {import('../../Database/ADBProvider').default} ADBProvider
 * @typedef {import('../Models/GuildConfig').default} GuildConfig
 * @typedef {import('../Models/AxonConfig').default} AxonConfig
 * @typedef {{
 * Utils: Utils, DBProvider: ADBProvider, AxonConfig: AxonConfig, GuildConfig: GuildConfig, DBLocation: String
 * }} Extensions
 */

import Utils from '../../Utility/Utils';
import ADBProvider from '../../Database/ADBProvider';
import DBSelector from '../../Database';
import AxonConfig from '../Models/AxonConfig';
import GuildConfig from '../Models/GuildConfig';

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
     * Initialise AxonStaff from the configuration file.
     *
     * @static
     * @param {Object.<string, Array<{id: String, name: String}>} staffConfig
     * @param {ALogger} logger
     * @returns {Object.<string, Array<String>} Axon staff newly created.
     * @memberof ClientInitialiser
     */
    static initStaff(staffConfig, logger) {
        const staff = {};

        for (const s of Object.keys(staffConfig) ) {
            staff[s] = staffConfig[s].map(o => o.id);
        }
        logger.info('Bot-Staff engaged!');

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
     * @param {AxonClient} axon
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
        axon.axonConfig = axonConf; // We have to do it here and not return the value because we need to unwrap the promise and actually assign the value.
        
        axon.logger.info('[INIT] Axon config initialised!');
    }

    /**
     * Initialise AxonOptions Extensions.
     * Returns uninstantiated classes without logger. These values should then be instantiated
     * @param {AxonClient} axon - AxonClient
     * @param {AxonOptions} axonOptions - AxonOptions
     * @returns {Extensions} extensions
     */
    static initExtensions(axon, axonOptions) {
        const extensions = {};

        if (axonOptions.extensions.utils && axonOptions.extensions.utils.prototype instanceof Utils) {
            extensions.Utils = axonOptions.extensions.utils;
        } else {
            extensions.Utils = Utils;
        }

        if (axonOptions.extensions.DBProvider && axonOptions.extensions.DBProvider.prototype instanceof ADBProvider) {
            extensions.DBProvider = axonOptions.extensions.DBProvider;
        } else {
            extensions.DBProvider = DBSelector.select(axon, axonOptions);
        }

        if (axonOptions.extensions.axonConfig && axonOptions.extensions.axonConfig.prototype instanceof AxonConfig) {
            extensions.AxonConfig = axonOptions.extensions.axonConfig;
        } else {
            extensions.AxonConfig = AxonConfig;
        }

        if (axonOptions.extensions.guildConfig && axonOptions.extensions.guildConfig.prototype instanceof GuildConfig) {
            extensions.GuildConfig = axonOptions.extensions.guildConfig;
        } else {
            extensions.GuildConfig = GuildConfig;
        }

        extensions.DBLocation = axonOptions.extensions.DBLocation || null;

        return extensions;
    }
}

export default ClientInitialiser;
