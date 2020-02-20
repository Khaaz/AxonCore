
export declare class ErisMessage extends Message {
    /**
     * @memberof ErisMessage
     */
    public delete(message: Eris.Message): Promise<void>;
    /**
     * @memberof ErisMessage
     */
    public edit(message: Eris.Message, content: ErisContent): Promise<Eris.Message>;
}
