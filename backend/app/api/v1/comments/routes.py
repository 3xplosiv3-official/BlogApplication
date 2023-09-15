"""
Comments Routes.

This module contains the routes related to comments. It includes CRUD operations
for comments such as listing, retrieving, creating, updating, and deleting.
"""
from typing import List

from fastapi import APIRouter, HTTPException

from app.api.v1.comments import schemas as s_s
from app.api.v1.comments import logic as l_c
from app.api.v1.articles import logic as article_logic

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get(
    "/",
    response_model=List[s_s.CommentInDB],
    summary="List All Comments",
    description=(
        "<b>Retrieve a list of all available comments.</b>\n\n"
        "Return Type: `List[CommentInDB]`."
    ),
    response_description="List of all comments.",
    deprecated=True
)
async def list_comments():
    """
    Retrieve a list of all comments.

    :return: List of all comments.
    :rtype: List[s_s.CommentInDB]
    """

    return await l_c.get_all_comments()


@router.get(
    "/{comment_id}",
    response_model=s_s.CommentInDB,
    summary="Retrieve a Specific Comment",
    description=(
        "<b>Retrieve a specific comment by its ID.</b>\n\n"
        "Return Type: `CommentInDB`."
    ),
    response_description="Details of the specified comment.",
    deprecated=True,
)
async def retrieve_comment(comment_id: int):
    """
    Retrieve a specific comment by its ID.

    :param comment_id: The ID of the comment to retrieve.
    :type comment_id: int
    :return: The comment details.
    :rtype: s_s.CommentInDB
    """

    return await l_c.get_comment_by_id(comment_id)


@router.get(
    "/article/{article_id}",
    response_model=List[s_s.CommentInDB],
    summary="List Comments by Article",
    description=(
        "<b>Retrieve all comments associated with a specific article.</b>\n\n"
        "Return Type: `List[CommentInDB]`."
    ),
    response_description="List of comments for the specified article."
)
async def list_article_comments(article_id: int):
    """
    Retrieve all comments associated with a specific article.

    :param article_id: The ID of the article for which to retrieve comments.
    :type article_id: int
    :return: List of comments related to the specified article.
    :rtype: List[s_s.CommentInDB]
    """

    if not await article_logic.article_exists(article_id):
        raise HTTPException(status_code=404, detail="Article not found")

    article = await article_logic.get_article_by_id(article_id)
    comments = await l_c.get_all_comments_by_article(article)

    return [s_s.CommentInDB.model_validate(comment) for comment in comments]


@router.post(
    "/",
    response_model=s_s.CommentInDB,
    summary="Create New Comment",
    description=(
        "<b>Create a new comment for a specified article.</b>\n\n"
        "Return Type: `CommentInDB`."
    ),
    response_description="The created comment details."
)
async def create_new_comment(comment: s_s.CommentCreate):
    """
    Create a new comment for a specific article.

    :param comment: The comment details to create.
    :type comment: s_s.CommentCreate
    :return: The created comment details.
    :rtype: s_s.CommentInDB
    """

    if not await article_logic.article_exists(comment.article_id):
        raise HTTPException(status_code=404, detail="Article not found")

    article = await article_logic.get_article_by_id(comment.article_id)

    return await l_c.create_comment(comment.content, article)


@router.put(
    "/{comment_id}",
    response_model=s_s.CommentInDB,
    summary="Update Existing Comment",
    description=(
        "<b>Update the details of an existing comment.</b>\n\n"
        "Return Type: `CommentInDB`."
    ),
    response_description="The updated comment details.",
    deprecated=True,
)
async def update_existing_comment(comment: s_s.CommentInDB):
    """
    Update an existing comment.

    :param comment: The updated comment details.
    :type comment: s_s.CommentInDB
    :return: The updated comment details.
    :rtype: s_s.CommentInDB
    """

    return await l_c.update_comment(comment)


@router.delete(
    "/{comment_id}",
    status_code=204,
    summary="Remove Comment",
    description=(
        "<b>Delete a specific comment by its ID.</b>\n\n"
        "No content is returned upon successful deletion."
    ),
    response_description="Comment successfully deleted."
)
async def remove_comment(comment_id: int):
    """
    Delete a specific comment by its ID.

    :param comment_id: The ID of the comment to delete.
    :type comment_id: int
    :return: An empty dictionary.
    :rtype: dict
    """

    await l_c.delete_comment(comment_id)
    return {}
