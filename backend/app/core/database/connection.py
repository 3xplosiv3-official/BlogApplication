"""
Database Connection.

This module contains functions to initialize and set up the database
for the application.
The configurations are fetched from the core settings module.
"""

from tortoise import Tortoise

from app.core.config.settings import TORTOISE_ORM as T_ORM


async def database_init() -> None:
    """
    Initialize the database and generate schemas.

    Using the configurations from the settings module, this function sets up
    the connection to the database and initializes the necessary schemas.

    :rtype: None
    """

    await Tortoise.init(T_ORM)
    await Tortoise.generate_schemas()
