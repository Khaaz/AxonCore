import { AxonClient } from 'axoncore';

import * as modules from './modules/index';

/**
 * Example - Client constructor
 *
 * @author KhaaZ
 *
 * @class Client
 * @extends AxonCore.AxonClient
 */
class Client extends AxonClient {
    constructor(client, axonOptions) {
        super(client, axonOptions, modules);

        this.param = 1; // personal stuff
        this._param = 2; // personal hidden stuff
    }

    onInit() {
        this.staff.contributors = [];
    }

    onStart() {
        return Promise.resolve(true);
    }

    onReady() {
        return Promise.resolve(true);
    }

    initStatus() {
        // called after ready event
        // overrides default editStatus
        // used to setup custom status
        this.botClient.gateway.setPresence( {
            game: {
                name: `AxonCore | ${this.settings.prefixes[0]}help`,
                type: 0,
            },
            status: '',
        } );
    }

    // disabled
    // eslint-disable-next-line no-unused-vars
    $sendFullHelp(msg, guildConfig) {
        // override sendFullHelp method
        return this.axonUtils.sendMessage(msg.channel, 'Full Help override');
    }

    // disabled
    // eslint-disable-next-line no-unused-vars
    $sendHelp(command, env) {
        // override sendHelp method
        return this.axonUtils.sendMessage(env.msg.channel, `Help override for ${command.label}`);
    }
}

export default Client;
