"""
Users Models.

Defines the User model which represents users in the system.
This module provides functions to set and verify user passwords using hashed methods.
"""
from tortoise import fields

from app.models.base import AbstractBaseModel
from app.models.timestamp import TimestampMixin
from app.services.password import hash_password, verify_password


class User(AbstractBaseModel, TimestampMixin):
    """
    User model representing a user in the system.

    Attributes:
    - username: A unique username for the user.
    - status: Indicates the role of the user. (0 - default user, 1 - admin)
    - hashed_password: Stored hashed password for security.
    - is_active: Indicates if the user is active or not.
    """

    username = fields.CharField(max_length=50, unique=True)
    status = fields.IntField(default=0)
    hashed_password = fields.CharField(max_length=255)
    is_active = fields.BooleanField(default=True)

    def set_password(self, password: str):
        """
        Set a new password for the user.

        The password is hashed before storage.

        :param password: Raw password to be set.
        :type password: str
        """

        self.hashed_password = hash_password(password)

    def verify_password(self, password: str) -> bool:
        """
        Verify if the provided password matches the stored hashed password.

        :param password: Raw password to be verified.
        :type password: str
        :return: True if password is correct, False otherwise.
        :rtype: bool
        """

        return verify_password(password, self.hashed_password)

