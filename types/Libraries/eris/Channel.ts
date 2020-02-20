
export declare class ErisChannel extends Channel {
    /**
     * @memberof ErisChannel
     */
    public hasPermission(channel: Eris.Channel, user: Eris.User, perm: ERIS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
    /**
     * @memberof ErisChannel
     */
    public sendMessage(channel: Eris.Channel, content: ErisContent): Promise<Eris.Message>;
}
