"""
Models for Comments.

This module defines the Comment model, which represents comments made on articles.
Each comment is linked to a specific article via a ForeignKey relationship.
"""

from tortoise import fields
from app.models.base import AbstractBaseModel
from app.models.timestamp import TimestampMixin


class Comment(AbstractBaseModel, TimestampMixin):
    """
    Comment Model.

    Represents a comment made on an article.
    Each comment has content and is linked to an article.

    Attributes:
    - content (str): The text content of the comment.
    - article (ForeignKeyField): ForeignKey relation linking the comment to an article.
    """

    content = fields.TextField()
    article = fields.ForeignKeyField("models.Article", related_name="comments")
