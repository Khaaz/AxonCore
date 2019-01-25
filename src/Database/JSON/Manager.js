'use strict';

/**
 * @author Olybear9
 * 
 * @description Manager for JSON Database.
 * 
 * @class Manager
 */

import fs from 'fs';

class Manager {
    constructor() {
        this.AxonDefault = this.readFile('./AxonSchemaDefault.json').toJSON();
        this.Axon = this.readFile('./AxonSchema.json').toJSON();
        this.GuildDefault = this.readFile('./GuildSchemaDefault.json').toJSON();
        this.GuildSchema = this.readFile('./GuildSchema.json').toJSON(); // Last cache of Guild database
    }
    async fetchDefault() {
        return await this.AxonDefault;
    }
    async fetchAxonSchema() {
        return await this.Axon;
    }

    async fetchGuild(id) {
        let database = this.readDatabase(1);
        let guildIds = [];
        
        await database.forEach(g => {
            return guildIds.push(g.id); //Object entries was too large, using old method instead :)
        });

        if(!guildIds.includes(id)) return null;
        else {
            return await database[guildIds.indexOf(id)];
        }
    }

    async updateAxonSchema() {
        this.Axon = this.readFile('./AxonSchema.json').toJSON();
        return this.Axon;
    }

    async updateGuildKey(id, key, value) {
        let database = this.readDatabase(4);
        if(!database[id]) return null;
        let guild = database[id];
        guild[key] = value;
        await this.updateGuild(id, guild);
        return this.updateGuildSchema();
    }
    
    async createGuild(id) {
        await this.updateGuild(id, this.GuildDefault);
        return await this.updateGuildSchema();
    };

    async updateUserBlacklist(arr) {
        let cache = arr;
        arr = JSON.stringify(arr);
        await fs.writeFileSync(`./Database/Blacklists/users.json`, arr, (err) => {if (err) return null;});
        return await this.updateAxonSchem(arr, "bannedUsers");
    }

    async updateGuildBlacklist(arr) {
        let cache = arr;
        arr = JSON.stringify(arr);
        await fs.writeFileSync(`./Database/Blacklists/guilds.json`, arr, (err) => {if (err) return null;});
        return await this.updateAxonSchem(arr, "bannedGuilds");
    }

    async updateAxonSchem(arr, key) {
        let cache = this.Axon;
        cache[key] = arr;
        await fs.writeFileSync('./AxonSchema.json', cache, (err) => {if (err) return null;});
        return await this.updateAxonSchema();
    }
    async updateGuildSchema() {
        let guildDatabase = readDatabase(1);
        await fs.writeFileSync('./GuildSchema.json', guildDatabase, (err) => {if (err) return null;});
        this.GuildSchema = readFile('./GuildSchema.json').toJSON();
        return this.GuildSchema;
    }

    updateGuild(id, obj) {
        obj = JSON.stringify(obj);
        fs.writeFileSync(`./Database/Guilds/${id}.json`, obj, (err) => {if (err) return null;});
        return obj;
    }

    isCorrupt(string) {
        let conversion = JSON.stringify(string);
        try {
            JSON.parse(conversion);
            return false;
        } catch (e) {
            return true;
        }
    }

    readFile(dir) {
        if(!dir) return null;
        if(dir.search('.json') == -1) return null;
        if(!fs.existsSync(dir)) return null;
        else {
            let read = fs.readFileSync(dir).toString();
            return read;
        }
    }
    toJSON(string) {
        string = JSON.stringify(string);
        try {
            return JSON.parse(string);
        } catch (e) {return string};
    }
    readDatabase(type) {
        if(type == 1) {
            //Guilds (Array)
            let database = [];
            util.promisfy(fs.readdir('./Database/Guilds', async (err, files) => {
                if (err) console.error(err);
                let guilds = files.filter(f => f.split(".").pop()  === "json");

                for(let i = 0; i < guilds.length; i++) {
                    let g = guilds[g].replace(".json", "");
                    let guild = readFile(`./Database/Guilds/${g}.json`);
                    if(this.isCorrupt(guild)) {
                        updateGuild(g, this.GuildDefault);
                        database.push(this.GuildDefault);
                        return;
                    } else {
                        database.push(guild.toJSON());
                        return;
                    };
                }
            }));
            return database;
        }
        if(type == 2) {
            //Blacklisted users.
            let database = this.readFile('./Database/Blacklists/users.json');
            if(this.isCorrupt(database)) {
                this.updateUserBlacklist([]);
            } else return JSON.parse(database);
        }
        if(type == 3) {
            //Blacklisted guilds.
            let database = this.readFile('./Database/Blacklists/guilds.json');
            if(this.isCorrupt(database)) {
                this.updateUserBlacklist([]);
            } else return JSON.parse(database);
        }
        if(type == 4) {
            //Guilds (Object)
            let database = [];
            fs.readdir('./Database/Guilds', async (err, files) => {
                if (err) console.error(err);
                let guilds = files.filter(f => f.split(".").pop()  === "json");

                for(let i = 0; i < guilds.length; i++) {
                    let g = guilds[g].replace(".json", "");
                    let guild = readFile(`./Database/Guilds/${g}.json`);
                    if(this.isCorrupt(guild)) {
                        updateGuild(g, this.GuildDefault);
                        database[g] = this.GuildDefault;
                        return;
                    } else {
                        database[g] = guild.toJSON();
                        return;
                    };
                }
            });
            return database;
        }
    }
}
export default new Manager();