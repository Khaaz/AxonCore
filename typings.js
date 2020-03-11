const { prompt } = require('inquirer');
const fs = require('fs');
let config;

async function promptTypings() {
    const answer = await prompt( [
        {
            name: 'usesTS',
            type: 'list',
            message: 'Does your AxonCore project use TypeScript or JavaScript?',
            choices: ['JavaScript', 'TypeScript'],
            filter: (input) => input === 'TypeScript',
        },
        {
            name: 'library',
            type: 'list',
            message: 'Which library does your AxonCore project use?',
            choices: [
                'Eris',
                'Discord.JS',
                {
                    name: 'Detritus',
                    disabled: 'Detritus is not yet available for AxonCore!',
                },
            ],
            filter: (input) => input.toLowerCase().replace('.', ''),
            when: (answers) => answers.usesTS,
        },
    ] );
    config = answer;
}

const libraries = [
    'eris',
    'discordjs',
    'detritus',
];

async function checkConfig() {
    try {
        config = require('../../.axoncorerc.json');
        if (!config.usesTS && config.usesTS !== false) {
            throw new Error();
        }
        
        if (!libraries.includes(config.library) ) {
            throw new Error();
        }
    } catch (error) {
        console.error('Could not find a valid AxonCore configuration file. Please complete the prompts below to set up AxonCore.');
        await promptTypings();
    }

    if (!config.usesTS) {
        console.log('AxonCore project does not use TypeScript. Documentation installation complete.');
        process.exit(0);
    }
    if (config.library === 'detritus') {
        console.warn('Detritus support for AxonCore is not yet available. Please consider using another library, or keep a look out on the AxonCore repository.');
        process.exit(1);
    }

    console.log(`Copying documentation for the ${config.library} library...`);
    fs.copyFileSync(`./types/Libraries/${config.library}.ts`, `./types/Libraries/index.ts`);
    console.log(`Library documentation copying complete. Saving configuration file...`);
    fs.writeFileSync('../../.axoncorerc.json', JSON.stringify(config) );
}

console.log('Thank you for installing AxonCore.');

checkConfig();
