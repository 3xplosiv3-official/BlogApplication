"""
Password Service.

This module provides utility functions for hashing and verifying
passwords using bcrypt.
bcrypt is a popular password-hashing function designed to build a
cryptographically secure hash of a user's password.
"""

import bcrypt


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using bcrypt.

    Generates a salt using bcrypt and then creates a hashed version of
    the provided password.

    :param password: The plain-text password to hash.
    :type password: str
    :return: The hashed password.
    :rtype: str
    """

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password against its hashed version.

    Compares a plain-text password against a hashed version to check
    if they match.

    :param plain_password: The plain-text password to verify.
    :type plain_password: str
    :param hashed_password: The hashed version of the password to compare against.
    :type hashed_password: str
    :return: True if the passwords match, otherwise False.
    :rtype: bool
    """

    return bcrypt.checkpw(
        plain_password.encode('utf-8'),
        hashed_password.encode('utf-8')
    )
