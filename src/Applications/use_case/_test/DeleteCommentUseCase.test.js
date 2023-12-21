/* eslint-disable comma-dangle */
const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('DeleteCommentUsecase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'this is a comment',
      owner: 'user-123',
      threadId: 'thread-321',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockCommentRepository.isCommentExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockCommentRepository.isCommentOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockCommentRepository.deleteComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.isCommentExist).toHaveBeenCalledWith(
      useCasePayload.id
    );
    expect(mockCommentRepository.isCommentOwner).toHaveBeenCalledWith(
      useCasePayload.id,
      useCasePayload.owner
    );
    expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(
      useCasePayload.id
    );
  });
});
