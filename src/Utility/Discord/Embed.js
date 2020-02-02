import AxonError from '../../Errors/AxonError';
import { EMBED_LIMITS } from '../Constants/DiscordEnums';

/**
 * Embed class to create Embed without without using raw json format
 *
 * @author DutchVanDerLinde
 *
 * @class Embed
 *
 * @prop {String} title
 * @prop {String} url
 * @prop {String} description
 * @prop {String} color
 * @prop {Object} author
 * @prop {String} [author.name]
 * @prop {String} [author.url]
 * @prop {String} [author.icon_url]
 * @prop {Object} thumbnail
 * @prop {String} [thumbnail.url]
 * @prop {Array<Object>} fields - { name: "string", value: "string", inline: boolean }
 * @prop {Object} image
 * @prop {String} [image.url]
 * @prop {Object} footer
 * @prop {String} [footer.text]
 * @prop {String} [footer.icon_url]
 * @prop {String} timestamp
 * @prop {Object} file
 */
class Embed {
    /**
     * An embed to be sent with a message with a fluent interface for creation.
     *
     * @param {Object} [data] Data to set in the rich embed
     * @param {String} [data.title]
     * @param {String} [data.url]
     * @param {String} [data.description]
     * @param {String} [data.color]
     * @param {Object} [data.author]
     * @param {String} [data.author.name]
     * @param {String} [data.author.url]
     * @param {String} [data.author.icon_url]
     * @param {Object} [data.thumbnail]
     * @param {String} [data.thumbnail.url]
     * @param {Array<Object>} [data.fields] - { name: "string", value: "string", inline: boolean }
     * @param {Object} [data.image]
     * @param {String} [data.image.url]
     * @param {Object} [data.footer]
     * @param {String} [data.footer.text]
     * @param {String} [data.footer.icon_url]
     * @param {String} [data.timestamp]
     * @param {Object} [data.file]
     *
     * @memberof Embed
     */
    constructor(data = {} ) {
        this.title = data.title;
        this.url = data.url;
        this.description = data.description;
        this.color = data.color;
        this.author = data.author;
        this.thumbnail = data.thumbnail;
        this.fields = data.fields || [];
        this.image = data.image;
        this.footer = data.footer;
        this.timestamp = data.timestamp;
        this.file = data.file;
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
     * Sets the title of this embed.
     *
     * @param {String} title - The title
     * @returns {Embed} This embed
     * @example Embed.setTitle('My New Embed');
     *
     * @memberof Embed
     */
    setTitle(title) {
        title = this._resolveString(title);
        if (title.length > EMBED_LIMITS.LIMIT_TITLE) {
            throw new AxonError('Embed titles may not exceed 256 characters.');
        }
        this.title = title;
        return this;
    }

    /**
     * Sets the description of this embed.
     *
     * @param {String} description -The description
     * @returns {Embed} This embed
     * @example Embed.setDescription('Hi, this is my description!!!');
     *
     * @memberof Embed
     */
    setDescription(description) {
        description = this._resolveString(description);
        if (description.length > EMBED_LIMITS.LIMIT_DESCRIPTION) {
            throw new AxonError('Embed descriptions may not exceed 2048 characters.');
        }
        this.description = description;
        return this;
    }

    /**
     * @description Sets the URL of this embed.
     * @param {String} url The URL
     * @returns {Embed} This embed
     *
     * @memberof Embed
     */
    setURL(url) {
        this.url = url;
        return this;
    }

    /**
     * Sets the color of this embed.
     *
     * @param {Number} color - The color of the embed
     * @returns {Embed} This embed
     * @example Embed.setColor(0xFFFFF);
     *
     * @memberof Embed
     */
    setColor(color) {
        this.color = color;
        return this;
    }

    /**
     * Sets the author of this embed.
     *
     * @param {String} name - The name of the author
     * @param {String} icon - The icon URL of the author
     * @param {String} url - The URL of the author
     * @returns {Embed} This embed
     * @example Embed.setAuthor('KhaaZ', 'khaaz.png');
     *
     * @memberof Embed
     */
    setAuthor(name, icon, url) {
        const authorName = this._resolveString(name);
        if (authorName.length > EMBED_LIMITS.LIMIT_AUTHOR_NAME) {
            throw new AxonError('Embed footer text may not exceed 2048 characters.');
        }
        this.author = {
            name: authorName, icon_url: icon, url,
        };
        return this;
    }

    /**
     * Sets the timestamp of this embed.
     *
     * @param {Date} [timestamp=new Date()] - The timestamp
     * @returns {Embed} This embed
     *
     * @memberof Embed
     */
    setTimestamp(timestamp = new Date() ) {
        this.timestamp = timestamp;
        return this;
    }

    /**
     * Adds a field to the embed (max 25).
     *
     * @param {String} name - The name of the field
     * @param {String} value - The value of the field
     * @param {Boolean} [inline=false] - Set the field to display inline
     * @returns {Embed} This embed
     * @example Embed.addField('My Field', 'This is a new field!', true);
     *
     * @memberof Embed
     */
    addField(name, value, inline = false) {
        if (this.fields.length >= EMBED_LIMITS.NUMBER_FIELDS) {
            throw new AxonError('Embeds may not exceed 25 fields.');
        }
        name = this._resolveString(name);
        if (name.length > EMBED_LIMITS.LIMIT_FIELD_NAME) {
            throw new AxonError('Embed field names may not exceed 256 characters.');
        }
        if (!/\S/.test(name) ) {
            throw new TypeError('Cannot read property \'embed.fields.name\' of undefined');
        }
        value = this._resolveString(value);
        if (value.length > EMBED_LIMITS.LIMIT_FIELD_VALUE) {
            throw new AxonError('Embed field values may not exceed 1024 characters.');
        }
        if (!/\S/.test(value) ) {
            throw new AxonError('Cannot read property \'embed.fields.value\' of undefined');
        }
        this.fields.push( {
            name, value, inline,
        } );
        return this;
    }

    /**
     * Set the thumbnail of this embed.
     *
     * @param {String} url - The URL of the thumbnail
     * @returns {Embed} This embed
     *
     * @memberof Embed
     */
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }

    /**
     * Sets the image of this embed
     *
     * @param {String} url - The URL of the image
     * @returns {Embed} This embed
     * @example Embed.setImage('myImageUrl.png');
     *
     * @memberof Embed
     */
    setImage(url) {
        this.image = { url };
        return this;
    }

    /**
     * Sets the footer of this embed.
     *
     * @param {String} text - The text of the footer
     * @param {String} [icon] - The icon URL of the footer
     * @returns {Embed} This embed
     * @example Embed.setFooter('My Footer', 'footer.png');
     *
     * @memberof Embed
     */
    setFooter(text, icon) {
        text = this._resolveString(text);
        if (text.length > EMBED_LIMITS.LIMIT_FOOTER_TEXT) {
            throw new AxonError('Embed footer text may not exceed 2048 characters.');
        }
        this.footer = { text, icon_url: icon };
        return this;
    }

    /**
     * Sets the file to upload alongside the embed.
     * This file can be accessed via `attachment://fileName.extension` when setting an embed image or author/footer icons.
     * Only one file may be attached.
     *
     * @param {string} file Local path or URL to the file to attach, or valid FileOptions for a file to attach
     * @returns {Embed} This embed
     *
     * @memberof Embed
     */
    attachFile(file) {
        this.file = file;
        return this;
    }
}

export default Embed;
