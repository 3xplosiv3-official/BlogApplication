"""
Article Routes.

This module contains the routes related to articles. It includes CRUD operations
for articles, such as listing, retrieving, creating, updating, and deleting.
Each route ensures appropriate permission checks using the current user's context.
"""

from typing import Annotated

from fastapi import Query, Depends, APIRouter

from app.api.v1.articles import schemas as s_s
from app.api.v1.articles import logic as l_c
from app.api.v1.users.models import User
from app.services.authentication import get_current_user

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get(
    "/",
    response_model=s_s.ArticleResponse,
    summary="List Articles",
    description=(
            "<b>Fetch a paginated list of all "
            "available articles.\n\n"
            "The number of articles to skip and "
            "the maximum number "
            "to return can be adjusted using the "
            "skip and limit parameters.</b>\n\n"
            "Return Type: `ArticleResponse`."
    ),
    response_description="A list of articles along with pagination details."
)
async def list_articles(
        skip: int = Query(
            1, alias="page",
            ge=1
        ),
        limit: int = Query(
            10,
            le=100
        )):
    """
    Retrieve a paginated list of articles.

    :param skip: The number of articles to skip.
    :type skip: int
    :param limit: The maximum number of articles to return.
    :type limit: int
    :return: A dictionary containing total, page, per_page, and items.
    :rtype: dict
    """

    articles, total = await l_c.get_all_articles(
        skip=skip,
        limit=limit
    )

    return {
        "total": total,
        "page": skip,
        "per_page": limit,
        "items": articles
    }


@router.get(
    "/{article_id}",
    response_model=s_s.ArticleInDB,
    summary="Retrieve Article",
    description=(
            "<b>Fetch a detailed view of a specific "
            "article using its ID.</b>\n\n"
            "Return Type: `ArticleInDB`."
    ),
    response_description="Details of the requested article."
)
async def retrieve_article(article_id: int):
    """
    Retrieve a specific article by its ID.

    :param article_id: The ID of the article to retrieve.
    :type article_id: int
    :return: The article details.
    :rtype: s_s.ArticleInDB
    """

    return await l_c.get_article_by_id(article_id)


@router.post(
    "/",
    response_model=s_s.ArticleInDB,
    summary="Create New Article",
    description=(
            "<b>Submit details to create a new article.\n\n"
            "The created article's details will be returned.</b>\n\n"
            "Return Type: `ArticleInDB`."
    ),
    response_description="Details of the created article."
)
async def create_new_article(
        article: s_s.ArticleCreate,
        current_user: Annotated[User, Depends(get_current_user)]):
    """
    Create a new article.

    :param article: The article details to create.
    :type article: s_s.ArticleCreate
    :param current_user: The current logged-in user.
    :type current_user: User
    :return: The created article details.
    :rtype: s_s.ArticleInDB
    """

    return await l_c.create_article(article)


@router.put(
    "/{article_id}",
    response_model=s_s.ArticleInDB,
    summary="Update Article",
    description=(
            "<b>Update details of an existing article using its ID.\n\n"
            "The updated article's details will be returned.</b>\n\n"
            "Return Type: `ArticleInDB`."
    ),
    response_description="Details of the updated article."
)
async def update_existing_article(
        article: s_s.ArticleInDB,
        current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Update an existing article.

    :param article: The updated article details.
    :type article: s_s.ArticleInDB
    :param current_user: The current logged-in user.
    :type current_user: User
    :return: The updated article details.
    :rtype: s_s.ArticleInDB
    """

    return await l_c.update_article(article)


@router.delete(
    "/{article_id}",
    status_code=204,
    summary="Delete Article",
    description=(
            "<b>Delete a specific article using its ID.\n\n"
            "No content will be returned upon successful deletion.</b>\n\n"
            "Return Type: `None`."
    ),
    response_description="No content returned upon successful deletion."
)
async def remove_article(
        article_id: int,
        current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Delete a specific article by its ID.

    :param article_id: The ID of the article to delete.
    :type article_id: int
    :param current_user: The current logged-in user.
    :type current_user: User
    :return: An empty dictionary.
    :rtype: dict
    """

    await l_c.delete_article(article_id)

    return {}
