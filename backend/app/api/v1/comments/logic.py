"""
Logic for Comments.

This module provides asynchronous functions to interact with the database for CRUD
operations related to comments. It abstracts the database access logic and provides
a more high-level API for handling comment-related operations.
"""

from app.api.v1.comments.models import Comment
from app.api.v1.comments.schemas import CommentInDB


async def get_all_comments():
    """
    Retrieve all comments from the database.

    :return: List of all comments.
    :rtype: List[Comment]
    """

    return await Comment.all()


async def get_comment_by_id(comment_id: int):
    """
    Retrieve a specific comment by its ID.

    :param comment_id: The ID of the comment to retrieve.
    :type comment_id: int
    :return: Comment details.
    :rtype: Comment
    """

    return await Comment.get(id=comment_id)


async def get_all_comments_by_article(article):
    """
    Retrieve all comments associated with a specific article.

    :param article: The article object to retrieve comments for.
    :type article: Article
    :return: List of comments for the given article.
    :rtype: List[Comment]
    """

    return await Comment.filter(article=article)


async def create_comment(content: str, article):
    """
    Create a new comment for a specific article.

    :param content: The content/text of the comment.
    :type content: str
    :param article: The article for which the comment is created.
    :type article: Article
    :return: The created comment details.
    :rtype: Comment
    """

    return await Comment.create(content=content, article=article)


async def update_comment(comment: CommentInDB):
    """
    Update an existing comment.

    :param comment: The updated comment details.
    :type comment: CommentInDB
    :return: The updated comment details.
    :rtype: Comment
    """

    db_comment = await Comment.get(id=comment.id)
    for field, value in comment.model_dump().items():
        setattr(db_comment, field, value)
    await db_comment.save()
    return db_comment


async def delete_comment(comment_id: int):
    """
    Delete a specific comment by its ID.

    :param comment_id: The ID of the comment to delete.
    :type comment_id: int
    """

    await Comment.filter(id=comment_id).delete()
