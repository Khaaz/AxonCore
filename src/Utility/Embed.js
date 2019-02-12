'use strict';
import AxonError from '../Errors/AxonError';

/**
 * Embed class to create Embed without without using raw json format
 *
 * @author DutchVanDerLinde
 *
 * @class Embed
 */
class Embed {
    /**
 * A rich embed to be sent with a message with a fluent interface for creation.
 * @param {Object} [data] Data to set in the rich embed
 */
    constructor(data = {}) {
        /**
       * @type {string}
       */
        this.title = data.title;

        /**
       * @type {string}
       */
        this.description = data.description;

        /**
       * @type {string}
       */
        this.url = data.url;

        /**
       * @type {number}
       */
        this.color = data.color;

        /**
       * @type {Object}
       */
        this.author = data.author;

        /**
       * @type {Date}
       */
        this.timestamp = data.timestamp;

        /**
       * @type {Object[]}
       */
        this.fields = data.fields || [];

        /**
       * @type {Object}
       */
        this.thumbnail = data.thumbnail;

        /**
       * @type {Object}
       */
        this.image = data.image;

        /**
       * @type {Object}
       */
        this.footer = data.footer;

        /**
       * @type {string}
       */
        this.file = data.file;

        /**
       * @type {Array<string>}
       */
        this.files = [];
    }

    _resolveString(data) {
        if (typeof data === 'string') {
            return data;
        }
        if (data instanceof Array) {
            return data.join('\n');
        }
        return String(data);
    }

    /**
     * @description Sets the title of this embed.
     * @param {string} title The title
     * @returns {Embed} This embed
     * @example Embed.setTitle('My New Embed');
     */
    setTitle(title) {
        title = this._resolveString(title);
        if (title.length > 256) {
            throw new AxonError('Embed titles may not exceed 256 characters.');
        }
        this.title = title;
        return this;
    }

    /**
     * @description Sets the description of this embed.
     * @param {string} description The description
     * @returns {Embed} This embed
     * @example Embed.setDescription('Hi, this is my description!!!');
     */
    setDescription(description) {
        description = this._resolveString(description);
        if (description.length > 2048) {
            throw new AxonError('Embed descriptions may not exceed 2048 characters.');
        }
        this.description = description;
        return this;
    }

    /**
     * @description Sets the URL of this embed.
     * @param {string} url The URL
     * @returns {Embed} This embed
     */
    setURL(url) {
        this.url = url;
        return this;
    }

    /**
     * @description Sets the color of this embed.
     * @param {number} color The color of the embed
     * @returns {Embed} This embed
     * @example Embed.setColor(0xFFFFF);
     */
    setColor(color) {
        this.color = color;
        return this;
    }

    /**
     * @description Sets the author of this embed.
     * @param {string} name The name of the author
     * @param {string} [icon] The icon URL of the author
     * @param {string} [url] The URL of the author
     * @returns {Embed} This embed
     * @example Embed.setAuthor('KhaaZ', 'khaaz.png');
     */
    setAuthor(name, icon, url) {
        this.author = { name: this._resolveString(name), icon_url: icon, url };
        return this;
    }

    /**
     * Sets the timestamp of this embed.
     * @param {Date} [timestamp=new Date()] The timestamp
     * @returns {Embed} This embed
     */
    setTimestamp(timestamp = new Date()) {
        this.timestamp = timestamp;
        return this;
    }

    /**
     * @description Adds a field to the embed (max 25).
     * @param {string} name The name of the field
     * @param {string} value The value of the field
     * @param {boolean} [inline=false] Set the field to display inline
     * @returns {Embed} This embed
     * @example Embed.addField('My Field', 'This is a new field!', true);
     */
    addField(name, value, inline = false) {
        if (this.fields.length >= 25) {
            throw new AxonError('Embeds may not exceed 25 fields.');
        }
        name = this._resolveString(name);
        if (name.length > 256) {
            throw new AxonError('Embed field names may not exceed 256 characters.');
        }
        if (!/\S/.test(name)) {
            throw new TypeError('Cannot read property \'embed.fields.name\' of undefined');
        }
        value = this._resolveString(value);
        if (value.length > 1024) {
            throw new AxonError('Embed field values may not exceed 1024 characters.');
        }
        if (!/\S/.test(value)) {
            throw new AxonError('Cannot read property \'embed.fields.value\' of undefined');
        }
        this.fields.push({ name, value, inline });
        return this;
    }

    /**
     * @description Set the thumbnail of this embed.
     * @param {string} url The URL of the thumbnail
     * @returns {Embed} This embed
     */
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }

    /**
     * @description Sets the image of this embed
     * @param {string} url The URL of the image
     * @returns {Embed} This embed
     * @example Embed.setImage('myImageUrl.png');
     */
    setImage(url) {
        this.image = { url };
        return this;
    }

    /**
     * @description Sets the footer of this embed.
     * @param {string} text The text of the footer
     * @param {string} [icon] The icon URL of the footer
     * @returns {Embed} This embed
     * @example Embed.setFooter('My Footer', 'footer.png');
     */
    setFooter(text, icon) {
        text = this._resolveString(text);
        if (text.length > 2048) {
            throw new AxonError('Embed footer text may not exceed 2048 characters.');
        }
        this.footer = { text, icon_url: icon };
        return this;
    }

    /**
     * @description Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
     * setting an embed image or author/footer icons. Only one file may be attached.
     * @param {string} file Local path or URL to the file to attach,
     * or valid FileOptions for a file to attach
     * @returns {Embed} This embed
     */
    attachFile(file) {
        this.file = file;
        return this;
    }
}

export default Embed;
