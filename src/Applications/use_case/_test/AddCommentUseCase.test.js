/* eslint-disable comma-dangle */
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'this is a comment',
      owner: 'user-123',
      threadId: 'thread-321',
    };
    const mockAddedComment = new AddedComment({
      id: 'comment-_pby2_tmXV6bcvcdev8xk',
      content: 'this is a comment',
      owner: 'user-123',
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockCommentRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));

    /** creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const createdComment = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(createdComment).toStrictEqual(
      new AddedComment({
        id: 'comment-_pby2_tmXV6bcvcdev8xk',
        content: 'this is a comment',
        owner: 'user-123',
      })
    );

    expect(mockCommentRepository.addComment).toBeCalledWith(
      new NewComment({
        content: useCasePayload.content,
        owner: useCasePayload.owner,
        threadId: useCasePayload.threadId,
      })
    );
  });
});
