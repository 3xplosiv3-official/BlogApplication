"""
JWT Services.

This module provides utility functions for creating and decoding JWT tokens.
These tokens are used for secure authentication and authorization mechanisms
in the system.
"""

from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional
from app.core.config.settings import settings


def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Create a JWT access token.

    Generate a JWT token based on the provided data.
    The token will have an expiration time either based on the provided timedelta
    or a default value from the settings.

    :param data: A dictionary containing the data payload for the token.
    :type data: dict
    :param expires_delta: Optional timedelta for custom token expiration.
    :type expires_delta: timedelta, default=None
    :return: The encoded JWT token.
    :rtype: str
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode.update({"exp": expire})
    to_encode["sub"] = str(to_encode["sub"])
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def decode_jwt_token(token: str) -> Optional[dict]:
    """
    Decode a JWT token.

    Decodes the provided JWT token and extracts the payload.
    Returns None if the token is invalid or has expired.

    :param token: The JWT token to decode.
    :type token: str
    :return: The decoded payload if the token is valid, otherwise None.
    :rtype: Optional[dict]
    """
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY,
            algorithms=settings.ALGORITHM
        )
        return payload
    except JWTError:
        return None
