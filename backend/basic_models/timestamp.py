"""
Timestamp Mixin.

This module provides a mixin to be used by models that require timestamp fields.
It includes fields for tracking when an instance was created and last modified.
"""

from tortoise import fields


class TimestampMixin:
    """
    A mixin for models that need timestamp fields.

    This mixin provides fields to track when a model instance is created and
    last modified. It can be used to extend Tortoise ORM models to automatically
    include these timestamp fields.

    Attributes:
        created_at (datetime): The timestamp when the model instance was created.
            It's automatically set on the instance creation and cannot be modified.
        updated_at (datetime): The timestamp when the model instance was last
            updated_at. It's automatically updated whenever the model instance is saved.
    """

    created_at = fields.DatetimeField(null=True, auto_now_add=True)
    updated_at = fields.DatetimeField(null=True, auto_now=True)
