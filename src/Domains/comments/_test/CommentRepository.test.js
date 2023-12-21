/* eslint-disable comma-dangle */
const CommentRepository = require('../CommentRepository');

describe('CommentRepository abstract', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action
    const addComment = commentRepository.addComment({});
    const isCommentExist = commentRepository.isCommentExist('');
    const isCommentOwner = commentRepository.isCommentOwner('');
    const deleteComment = commentRepository.deleteComment('');
    const getCommentsByThreadId = commentRepository.getCommentsByThreadId('');

    // and Assert
    expect(addComment).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    expect(isCommentExist).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    expect(isCommentOwner).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    expect(deleteComment).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    expect(getCommentsByThreadId).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
