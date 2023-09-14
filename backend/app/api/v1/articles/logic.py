"""
Logic for Articles.

This module contains all the logic needed to manage articles
in the system, such as creating, updating, deleting, and
retrieving articles. It interfaces with the database models
and provides helper functions to be used by the routers.
"""

from app.api.v1.articles.models import Article
from app.api.v1.articles.schemas import ArticleCreate, ArticleInDB


async def article_exists(article_id: int) -> bool:
    """
    Check if an article exists based on its ID.

    :param article_id: Unique identifier of the article.
    :type article_id: int
    :return: Boolean indicating existence of the article.
    :rtype: bool
    """

    return await Article.filter(id=article_id).exists()


async def get_all_articles(skip: int = 1, limit: int = 10):
    """
    Retrieve a limited set of articles, supporting pagination.

    :param skip: Number of records to skip for pagination.
    :type skip: int
    :param limit: Maximum number of records to retrieve.
    :type limit: int
    :return: A tuple containing the list of articles and the total article count.
    :rtype: tuple
    """

    articles = await Article.all().order_by(
        '-id'
    ).offset(
        (skip - 1) * limit
    ).limit(
        limit
    )

    total = await Article.all().count()
    return articles, total


async def get_article_by_id(article_id: int):
    """
    Fetch a single article by its unique ID.

    :param article_id: Unique identifier of the article to fetch.
    :type article_id: int
    :return: Article object if found, None otherwise.
    :rtype: Article
    """

    return await Article.get(id=article_id)


async def create_article(article: ArticleCreate):
    """
    Create a new article in the system.

    :param article: Data for the article to be created.
    :type article: ArticleCreate
    :return: Newly created article.
    :rtype: Article
    """

    return await Article.create(**article.dict())


async def update_article(article: ArticleInDB):
    """
    Update an existing article's information.

    :param article: Updated article data, including its ID.
    :type article: ArticleInDB
    :return: Updated article object.
    :rtype: Article
    """

    db_article = await Article.get(id=article.id)
    for field, value in article.dict().items():
        setattr(db_article, field, value)
    await db_article.save()
    return db_article


async def delete_article(article_id: int):
    """
    Remove an article from the system based on its ID.

    :param article_id: Unique identifier of the article to be deleted.
    :type article_id: int
    """

    await Article.filter(id=article_id).delete()