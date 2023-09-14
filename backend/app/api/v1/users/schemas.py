"""
Users Schemas.

This module contains the data models or Pydantic models for the User entity.
These models serve as data validation and serialization for user related operations.
"""

from pydantic import BaseModel


class UserBase(BaseModel):
    """
    Schema representing the base user model.

    Attributes:
        username (str): The username of the user.
        password (str): The password for the user.
    """

    username: str
    password: str


class UserToken(BaseModel):
    """
    Schema representing the user's authentication token.

    Attributes:
        access_token (str): The JWT token for user authentication.
        token_type (str): The type of the token, typically "bearer".
        user_id (int): The id of the user in DB.
        username (str): The username of the user in DB.
        status (int): The status of the user in DB.
    """

    access_token: str
    token_type: str
    user_id: int
    username: str
    status: int


class UserInDB(UserBase):
    """
    Schema representing a user in the database.

    Attributes:
        id (int): Unique identifier for the user.
    """

    id: int

    class Config:
        """
        Configuration class for UserInDB.

        Configures the model's behavior with the ORM and other utilities.

        Attributes:
            from_attributes (bool): Use attributes directly from the ORM model.
        """

        from_attributes = True
