'use strict';

import { Module } from '../../../..';

import * as commands from './commands/index';
//import * as events from './commands/index';

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

        this.init(commands);
    }
}

export default Core;
