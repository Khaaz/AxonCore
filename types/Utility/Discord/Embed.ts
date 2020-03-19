import {
    EmbedData, EmbedAuthor, EmbedThumbnail, EmbedFields, EmbedImage, EmbedFooter,
} from '../../';

/**
 * Embed class to create Embed without without using raw json format
 *
 * @author DutchVanDerLinde
 *
 * @class Embed
 */
export declare class Embed implements EmbedData {
    public title?: string;
    public url?: string;
    public description?: string;
    public color?: number;
    public author?: EmbedAuthor;
    public thumbnail?: EmbedThumbnail
    public fields: EmbedFields[];
    public image?: EmbedImage;
    public footer?: EmbedFooter
    public timestamp?: Date;

    constructor(data?: EmbedData);
    private _resolveString(data): string;

    /**
     * Sets the title of this embed.
     *
     * @param title - The title
     * @returns This embed
     * @example Embed.setTitle('My New Embed');
     * @memberof Embed
     */
    public setTitle(title: string): this;
    /**
     * Sets the description of this embed.
     *
     * @param description -The description
     * @returns This embed
     * @example Embed.setDescription('Hi, this is my description!!!');
     * @memberof Embed
     */
    public setDescription(description: string): this;
    /**
     * @description Sets the URL of this embed.
     * @param url The URL
     * @returns This embed
     * @memberof Embed
     */
    public setURL(url: string): this;
    /**
     * Sets the color of this embed.
     *
     * @param color - The color of the embed
     * @returns This embed
     * @example Embed.setColor(0xFFFFFF);
     * @memberof Embed
     */
    public setColor(color: number): this;
    /**
     * Sets the author of this embed.
     *
     * @param name - The name of the author
     * @param icon - The icon URL of the author
     * @param url - The URL of the author
     * @returns This embed
     * @example Embed.setAuthor('KhaaZ', 'https://www.image.com/khaaz.png');
     * @memberof Embed
     */
    public setAuthor(name: string, icon?: string, url?: string): this;
    /**
     * Sets the timestamp of this embed.
     *
     * @param timestamp - The timestamp
     * @returns This embed
     * @memberof Embed
     */
    public setTimestamp(timestamp?: Date): this;
    /**
     * Adds a field to the embed (max 25).
     *
     * @param name - The name of the field
     * @param value - The value of the field
     * @param inline - Set the field to display inline
     * @returns This embed
     * @example Embed.addField('My Field', 'This is a new field!', true);
     * @memberof Embed
     */
    public addField(name: string, value: string, inline?: boolean): this;
    /**
     * Set the thumbnail of this embed.
     *
     * @param url - The URL of the thumbnail
     * @returns This embed
     * @memberof Embed
     */
    public setThumbnail(url: string): this;
    /**
     * Sets the image of this embed
     *
     * @param url - The URL of the image
     * @returns This embed
     * @example Embed.setImage('https://www.image.com/myImageUrl.png');
     * @memberof Embed
     */
    public setImage(url: string): this;
    /**
     * Sets the footer of this embed.
     *
     * @param text - The text of the footer
     * @param icon - The icon URL of the footer
     * @returns This embed
     * @example Embed.setFooter('My Footer', 'https://www.image.com/footer.png');
     * @memberof Embed
     */
    public setFooter(text: string, icon?: string): this;
}
