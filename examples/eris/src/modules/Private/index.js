import { Module, CommandPermissions } from '../../../../..';

import * as commands from './commands/index';
// import * as events from './commands/index';

class Private extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Private';

        this.enabled = true;
        this.serverBypass = true;

        this.infos = {
            name: 'Private',
            description: 'Very Private. Much Dev. Wow.',
        };

        this.permissions = new CommandPermissions(this, {}, true);

        this.init(commands);
    }
}

export default Private;
