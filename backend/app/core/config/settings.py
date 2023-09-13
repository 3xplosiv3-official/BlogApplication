from pydantic.v1 import BaseSettings


class Settings(BaseSettings):
    """
    Application's main settings.

    """
    DATABASE_URL: str = "sqlite://sqlite3.db"

    class Config:
        case_sensitive = True
        env_file = ".env"


# Initialize the settings instance.
settings = Settings()

# Configuration for Tortoise ORM.
TORTOISE_ORM = {
    "connections": {"default": settings.DATABASE_URL},
    "apps": {
        "models": {
            "models": [''],
            "default_connection": "default",
        },
    },
    'use_tz': False,
    'timezone': 'Europe/Moscow'
}
