import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

class SchemaGenerator {
    /**
     * Generate 
     * @param {String} type - Mongoose | Sequelize | JSON
     */
    constructor(type = 'json') {
        if (this.constructor === 'SchemaGenerator') {
            throw new NoAbstractInstanceException();
        }
        type = type.toLowerCase();
        switch (type) {
            case 'json':
            default: {
                this._schemType = 'JSON';
                break;
            }

            case 'mongo' | 'mongodb': {
                this._schemType = 'MongoDb';
                break;
            }

            case 'sequelize': {
                this._schemType = 'Sequelize';
                break;
            }
        }
    }

    /**
     * Generates schemas based on provided object and settings.
     * @param {Object<any>} obj - Object to generate schema for.
     */
    generate(obj = null) {
        throw new NotImplementedException();
    }
}

export default SchemaGenerator;