"""
Models for Articles.

This module provides the Tortoise-ORM model for managing articles in the system.
The primary model here is the `Article`, which represents a blog article
with its associated properties.
"""

from tortoise import fields

from basic_models.base import AbstractBaseModel
from basic_models.timestamp import TimestampMixin


class Article(AbstractBaseModel, TimestampMixin):
    """
    ORM model representing a blog article.

    Each article has a title, content and can have multiple associated comments.

    Attributes:
    - title: The title or headline of the article.
    - description: The preview description or short content of the article.
    - content: The main content or body of the article.
    - comments: Reverse relation to the comments associated with the article.
    """

    title = fields.CharField(max_length=255)
    description = fields.CharField(max_length=155)
    content = fields.TextField()
    comments = fields.ReverseRelation["Comment"]

