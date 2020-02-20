
export declare class DjsChannel extends Channel {
    /**
     * @memberof DjsChannel
     */
    hasPermission(channel: djs.Channel, user: djs.User, perm: DJS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
    /**
     * @memberof DjsChannel
     */
    sendMessage(channel: djs.Channel, content: string | DjsContent): Promise<djs.Message | djs.Message[]>
}
