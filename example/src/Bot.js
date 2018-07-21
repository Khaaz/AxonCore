'use strict';

import Client from './Client';

import config from './configs/customConf.json';
import tokenConf from './configs/tokenConf.json';

const Bot = new Client(
    tokenConf.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: true,
        messageLimit: 100,
        restMode: true
    },
    config
);

export default Bot;
