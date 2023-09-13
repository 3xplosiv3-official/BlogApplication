from tortoise import Tortoise

from app.core.config.settings import TORTOISE_ORM as T_ORM


async def database_init() -> None:

    await Tortoise.init(T_ORM)
    await Tortoise.generate_schemas()
