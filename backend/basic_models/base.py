"""
Abstract Base Model.

This module provides an abstract base model to be used by other models in the application.
It includes a primary key field and a string representation method.
"""

from tortoise import fields
from tortoise.models import Model


class AbstractBaseModel(Model):
    """
    An abstract base model with a primary key field.

    This model provides a foundation for other models to extend. It includes a
    primary key field (`id`) and a string representation method.

    Attributes:
        id (int): The primary key field. Auto-incremented.
    """

    id = fields.IntField(pk=True)

    class Meta:
        """
        Metadata for the model.

        Specifies that this model should be treated as abstract, and therefore,
        not mapped to a database table. Only child models that inherit from this
        model will be mapped to database tables.
        """
        abstract = True

    def __str__(self):
        """
        Return a string representation of the model instance.

        :rtype: str
        """
        return f"<{self.__class__.__name__} {self.id}>"
