'use strict';
import fs from 'fs';

const schematic = require('./AxonSchem.json');
async function fetchDatabase () {
        var guilds = {};
        await fs.readdir('./database/guilds', (err, files) => {
            if(err) return undefined;
            let guildFiles = files.filter(file => file.split(".").pop() == "json");
            var i = 0;
            guildFiles.forEach(guild => {
                let tempCache = read(`${guild}.json`);
                guilds[tempCache.gID] = tempcache;
                return i++;
            })
        })
        return await guilds;
}
export async function write (location, opts) {
 try {
    if(location == 'guild') {
        let guild = (opts.parent) ? opts.parent : undefined;
        let option = (opts.child) ? opts.child : undefined;
        let newData = (opts.value) ? opts.value : undefined;
        /* Checking and rejecting */
        if(!guild) return undefined;
        if(typeof(guild) != 'string') return undefined;
        if(!newData) return undefined;
        if(!option) {
            let guilds = await fetchDatabase();

            //Guild does not exist
            if(!Object.keys(guilds).includes(guild)) {
                return fs.writeFileSync(`./database/guilds/${guild}.json`, JSON.stringify(schematic, null, 2), (err) => {
                    if(err) return err;
                });
            }

            //Guild does exist
            return fs.writeFileSync(`./database/guilds/${guild}.json`, JSON.stringify(newData, null, 2), (err) => {
                if(err) return err;
            });
        } else {
            let guilds = await fetchDatabase();
            
            //Guild does not exist
            if(!Object.keys(guilds).includes(guild)) {
                return fs.writeFileSync(`./database/guilds/${guild}.json`, JSON.stringify(schematic, null, 2), (err) => {
                    if(err) return err;
                });
            }

            //Guild does exist
            let cache = guilds[guild];
            cache[option] = value;
            
            //Check if there is an error Stringifying   
            return fs.writeFileSync(`./database/guilds/${guild}.json`, JSON.stringify(cache, null, 2), (err) => {
                if(err) return err;
            });
        }
    } else if (location != 'blacklist/users' || location != 'blacklist/guilds') return undefined;

     else {
        let locat = location.split('blacklist/')[1];
        if(typeof(opts) != 'object') return undefined;
        return fs.writeFileSync(`./database/blacklist/${locat}.json`, JSON.stringify(opts), (err) => {
            if (err) return err;
        });
     }
 } catch (err) {
     return err;
 }
} 
export async function read (guild) {
    if(typeof(guild) != 'string') return undefined;
    let fileDir = `./database/guilds/${guild}.json`;
    if(!fs.existsSync(fileDir)) return undefined;
    return fs.readFile(fileDir, 'utf8', (error, contents) => {
        if(error) return error;
        return contents;
    });
}
