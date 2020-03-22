const pm2 = require('pm2');

// Start process
console.log('>> Starting AxonCore');
pm2.connect( (err) => {
    if (err) {
        console.error(err);
        process.exit(2);
    }
    pm2.start( {
        script: 'index.js',
        args: ['--color'],
        name: 'AxonCore.detritus',
        exec_mode: 'fork',
        max_memory_restart: '1G',
        cwd: 'example/src',
        error: '../logs/error.err',
        output: '../../logs/output.log',
        pid: '../../logs/pid.pid',
        node_args: '-r esm',
        autorestart: true,
        wait_ready: true,
    }, (e) => {
        pm2.disconnect();
        if (e) {
            throw e;
        }
    } );
} );
//
