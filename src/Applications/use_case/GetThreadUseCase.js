/* eslint-disable function-paren-newline */
class GetThreadUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);

    if (!thread) {
      throw new Error('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');
    }

    const comments = await this._commentRepository.getCommentsByThreadId(threadId);

    await Promise.all(
      Array.from(comments).map(async (comment) => {
        const replies = await this._replyRepository.getRepliesByCommentId(comment.id);
        comment.setReplies(replies);
      }),
    );

    thread.setComments(comments);

    return thread;
  }
}

module.exports = GetThreadUseCase;
