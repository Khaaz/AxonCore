'use string';
import { Signale } from 'signale';
import figures from 'figures';

const options = {
    types: {
        verbose: {
            badge: figures.info,
            label: 'verbose',
            color: 'gray',
        },
        axon: {
            badge: figures.star,
            label: 'axon',
            color: 'magenta',
        },
        init: {
            badge: figures.play,
            label: 'init',
            color: 'green',
        },
        moduleS: {
            badge: figures.squareSmallFilled,
            label: 'module',
            color: 'cyan',
        },
        command: {
            badge: figures.squareSmall,
            label: 'command',
            color: 'cyanBright',
        },
    },
};

class SignaleLogger extends Signale {
    constructor(options) {
        super(options);

        this.config({
            displayTimestamp: true,
        });
    }

    emerg(input) {
        this.fatal(input);
    }

    notice(input) {
        this.note(input);
    }

    module(input, module) {
        this.moduleS({ prefix: module.label, message: input });
    }
}

export default new SignaleLogger(options);
