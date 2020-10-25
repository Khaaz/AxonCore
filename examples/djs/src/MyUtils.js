import { Utils } from 'axoncore';

class MyUtils extends Utils {
    constructor(...args) {
        super(...args);
        this.invite = /^(discord.gg\/|discordapp.com|discord.com\/invite\/)([a-z0-9]+)$/gi;
    }

    /**
     * Convert a hex code into a rgb code
     *
     * @param {Number/String} float -  The base10 number to convert OR the base10 number as a String
     * @returns {String} rgb color code (xxx, xxx, xxx)
     */
    hexTOrgb(hex) {
        let num = hex.replace('#', '');
        num = parseInt(num, 16);
        return [num >> 16, num >> 8 & 255, num & 255]; // eslint-disable-line
    }

    /**
     * Convert a rgb code into a hex code
     *
     * @param {Number/String} float -  the rgb color code
     * @returns {String} Hex color code (6 char) (without #)
     */
    rgbTOhex(red, green, blue) {
        return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1); // eslint-disable-line
    }
}

export default MyUtils;
