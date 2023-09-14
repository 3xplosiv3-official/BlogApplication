"""
Comment Schemas.

This module contains Pydantic models (schemas) used for comments.
It includes base schemas for comment representation, creation, and updates,
as well as a more specific schema representing a comment as it is stored in the database.
"""

from pydantic import BaseModel


class CommentBase(BaseModel):
    """
    Base model representing the essential fields of a comment.

    Attributes:
    - `content` (str): The actual content or text of the comment.
    """

    content: str


class CommentCreate(CommentBase):
    """
    Model for creating a new comment. Inherits from `CommentBase`.

    Attributes:
    - `article_id` (int): The ID of the article to which the comment belongs.
    """

    article_id: int


class CommentUpdate(CommentBase):
    """
    Model for updating an existing comment. Inherits from `CommentBase`.

    Attributes:
    - `article_id` (int): The ID of the article to which the comment belongs.
    """

    article_id: int


class CommentInDB(CommentBase):
    """
    Model representing a comment as stored in the database.
    Inherits from `CommentBase`.

    Attributes:
    - `id` (int): The unique identifier for the comment.
    - `article_id` (int): The ID of the article to which the comment belongs.
    """

    id: int
    article_id: int

    class Config:
        """
        Configuration class for CommentInDB.

        Configures the model's behavior with the ORM and other utilities.

        Attributes:
            from_attributes (bool): Use attributes directly from the ORM model.
        """

        from_attributes = True

