import { Module } from '../../../../..';

import * as commands from './commands/index';
import * as listeners from './listeners/index';

class Core extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Core';

        this.enabled = true;
        this.serverBypass = true;

        this.infos = {
            name: 'Core',
            description: 'The main module with most basic commands.',
        };
    }

    init() {
        return { commands, listeners };
    }
}

export default Core;
