declare class BlueshiftInboxMessage {
    static fromJSON(json: any): any;
    /**
     * Constructs a BlueshiftInboxMessage object.
     * @param {number} id - The ID of the message.
     * @param {string} messageId - The unique identifier of the message.
     * @param {string} title - The title of the message.
     * @param {string} details - The details of the message.
     * @param {string} imageUrl - The URL of the message image.
     * @param {string} status - The read status of the message.
     * @param {Object} data - Additional message data associated with the message.
     * @param {Date} createdAt - The date and time when the message was created.
     */
    constructor(id: number, messageId: string, title: string, details: string, imageUrl: string, status: string, data: any, createdAt: Date);
    id: number;
    messageId: string;
    title: string;
    details: string;
    imageUrl: string;
    status: string;
    data: any;
    createdAt: Date;
    toObject(): {
        id: number;
        messageId: string;
        title: string;
        details: string;
        imageUrl: string;
        status: string;
        data: any;
        createdAt: number;
    };
}
