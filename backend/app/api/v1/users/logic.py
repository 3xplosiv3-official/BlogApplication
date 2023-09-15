"""
Users Logic.

This module contains the logic for user authentication. It offers
a utility function to handle user login, verify credentials, and generate
a JWT access token for authenticated users.
"""
from app.api.v1.users.models import User
from services.jwt import create_access_token


async def user_login(http_exception, status, username: str, password: str):
    """
    Authenticate a user and return an access token.

    :param http_exception: Exception to raise if authentication fails.
    :type http_exception: HTTPException
    :param status: HTTP status code for the exception.
    :type status: int
    :param username: Username of the user trying to log in.
    :type username: str
    :param password: Raw password provided by the user.
    :type password: str
    :return: JWT access token for authenticated user and User object.
    :rtype: tuple
    :raises: http_exception: If the username or password is incorrect.
    """

    user = await User.get_or_none(username=username)
    if not user or not user.verify_password(password):
        raise http_exception(
            status_code=status,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.id})

    return access_token, user
