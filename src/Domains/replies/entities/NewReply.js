/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
class NewReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, commentId, threadId, owner } = payload;

    this.content = content;
    this.commentId = commentId;
    this.threadId = threadId;
    this.owner = owner;
  }

  _verifyPayload({ content, commentId, threadId, owner }) {
    if (!content || !commentId || !threadId || !owner) {
      throw new Error('POST_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof content !== 'string' ||
      typeof commentId !== 'string' ||
      typeof threadId !== 'string' ||
      typeof owner !== 'string'
    ) {
      throw new Error('POST_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewReply;
