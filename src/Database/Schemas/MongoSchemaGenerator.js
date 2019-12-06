import SchemaGenerator from './SchemaGenerator';
import { Schema } from 'mongoose';

class MongoSchemaGenerator extends SchemaGenerator {
    constructor() {
        super('mongo');
    }

    /**
     * Convert object to mongoose schema.
     * @param {Object<any>} obj - Object to convert into mongoschema.
     */
    generate(obj, indexKey = 'id', required = []) {
        const keys = Object.keys(obj);
        const schema = {};

        if (!obj || typeof obj !== 'object') return {};

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = obj[key];
            schema[key] = {};

            if (indexKey !== null && indexKey === key) {
                schema[key].index = true;
                schema[key].required = true;
            }

            if (required.includes(key)) {
                schema[key].required = true;
            }

            if (value instanceof Array) {
                schema[key].type = Array;
            }

            if (value instanceof Date) {
                schema[key].type = Date;
            }

            if (value instanceof Buffer) {
                schema[key].type = Buffer;
            }

            if (value instanceof Map) {
                schema[key].type = Map;
            }

            if (typeof value === 'number') {
                schema[key].type = Number;
            }

            if (typeof value === 'string') {
                schema[key].type = String;
            }

            if (typeof value === 'boolean') {
                schema[key].type = Boolean;
            }

            if (typeof value === 'object') {
                schema[key].type = Schema.Types.Mixed;
            }

            continue;
        }

        return schema;
    }
}

export default MongoSchemaGenerator;