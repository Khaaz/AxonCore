import Eris from 'eris';

import { AxonOptions } from '../../..';

import Client from './Client';

import botConfig from './configs/customConfig.json';
import tokenConfig from '../../tokenConfig.json';
import lang from './configs/lang.json';

import MyUtils from './MyUtils';

const axonOptions = new AxonOptions( {
    prefixes: botConfig.prefixes,
    settings: botConfig.settings,
    lang,
    logo: null,

    info: botConfig.info,
    staff: botConfig.staff,
    template: botConfig.template,
    custom: {
        param: 1,
    },
},
tokenConfig.webhooks,
{
    utils: MyUtils, // use your own Utils
    logger: null, // custom Logger
    DBProvider: null, // custom DB Service
    DBLocation: `${__dirname}/Database/`,

    axonConfig: null,
    guildConfig: null,
} );

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const client = new Eris.Client(
    tokenConfig.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: false,
        messageLimit: 100,
        restMode: true,
        disableEvents: {
            TYPING_START: true,
        },
    },
);

const Bot = new Client(
    client,
    axonOptions,
);

export default Bot;
