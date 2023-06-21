class BlueshiftInboxMessage {
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
  constructor(
    id,
    messageId,
    title,
    details,
    imageUrl,
    status,
    data,
    createdAt
  ) {
    this.id = id;
    this.messageId = messageId;
    this.title = title;
    this.details = details;
    this.imageUrl = imageUrl;
    this.status = status;
    this.data = data;
    this.createdAt = createdAt;
  }

  toObject() {
    return {
      id: this.id,
      messageId: this.messageId,
      title: this.title,
      details: this.details,
      imageUrl: this.imageUrl,
      status: this.status,
      data: this.data,
      createdAt: Math.floor(this.createdAt.getTime() / 1000), // converts to seconds
    };
  }

  static fromJSON(json) {
    return new BlueshiftnboxMessage(
      json.id,
      json.messageId,
      json.title,
      json.details,
      json.imageUrl,
      json.status,
      json.data,
      new Date(json.createdAt * 1000) //uses miliseconds
    );
  }
}
