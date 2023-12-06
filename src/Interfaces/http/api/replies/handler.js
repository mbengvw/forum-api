/* eslint-disable comma-dangle */
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');
const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');

class RepliesHandler {
  constructor(container) {
    this._container = container;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler(request, h) {
    try {
      const useCasePayload = {
        content: request.payload.content,
        commentId: request.params.commentId,
        threadId: request.params.threadId,
        owner: request.auth.credentials.id,
      };

      const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);

      const addedReply = await addReplyUseCase.execute(useCasePayload);

      const response = h.response({
        status: 'success',
        data: {
          addedReply,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error);
      const response = h.response({
        status: 'fail',
        message: translatedError.message,
      });
      response.code(translatedError.statusCode);
      return response;
    }
  }

  async deleteReplyHandler(request) {
    const useCasePayload = {
      id: request.params.replyId,
      commentId: request.params.commentId,
      threadId: request.params.threadId,
      owner: request.auth.credentials.id,
    };

    const deleteReplyUseCase = this._container.getInstance(
      DeleteReplyUseCase.name
    );
    await deleteReplyUseCase.execute(useCasePayload);

    return {
      status: 'success',
    };
  }
}

module.exports = RepliesHandler;
