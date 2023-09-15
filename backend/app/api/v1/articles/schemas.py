"""
Article Schemas.

This module provides Pydantic models (schemas) for serializing and deserializing
data related to articles.
These schemas are used to validate the structure and data types of input
and output payloads for the API, ensuring that the data adheres
to predefined specifications.
"""

from typing import List
from datetime import datetime

from pydantic import BaseModel


class ArticleBase(BaseModel):
    """
     Base model representing the core attributes of an article.

     Attributes:
         title (str): The title of the article.
         description (str): The description of an article.
         content (str): The main content/body of the article.
     """

    title: str
    description: str
    content: str


class ArticleCreate(ArticleBase):
    """
    Schema for creating a new article. Inherits from ArticleBase.
    """

    pass


class ArticleUpdate(ArticleBase):
    """
    Schema for updating an existing article. Inherits from ArticleBase.
    """

    pass


class ArticleInDB(ArticleBase):
    """
    Schema representing an article retrieved from the database.

    Attributes:
        id (int): The unique identifier of the article.
        created_at (datetime):  The timestamp of the article when it was created.
        updated_at (datetime):  The timestamp of the article when it was updated.
    """

    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        """
        Configuration class for ArticleInDB.

        Configures the model's behavior with the ORM and other utilities.

        Attributes:
            from_attributes (bool): Use attributes directly from the ORM model.
        """

        from_attributes = True


class ArticleResponse(BaseModel):
    """
    Schema representing the response for a paginated list of articles.

    Attributes:
        total (int): The total number of articles.
        page (int): The current page number.
        per_page (int): The number of articles per page.
        items (List[ArticleInDB]): List of article items for the current page.
    """

    total: int
    page: int
    per_page: int
    items: List[ArticleInDB]
