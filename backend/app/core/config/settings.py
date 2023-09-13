from pydantic.v1 import BaseSettings


class Settings(BaseSettings):
    """
    Application's main settings.

    """

    PROJECT_NAME: str = "ENIGMA BLOG APPLICATION"
    PROJECT_DESCRIPTION: str = "Backend of blog app for the test task at LZT forum"
    PROJECT_VERSION: str = "7.7.7"
    API_V1_ENDPOINT: str = "/api/v1"

    DATABASE_URL: str = "sqlite://sqlite3.db"

    class Config:
        case_sensitive = True
        env_file = ".env"


# Initialize the settings instance.
settings = Settings()

# List of models for Tortoise ORM.
ORM_MODELS = [
    "app.api.v1.articles.models",
    "app.api.v1.comments.models",
    "app.api.v1.users.models"
]

# Configuration for Tortoise ORM.
TORTOISE_ORM = {
    "connections": {"default": settings.DATABASE_URL},
    "apps": {
        "models": {
            "models": ORM_MODELS,
            "default_connection": "default",
        },
    },
    'use_tz': False,
    'timezone': 'Europe/Moscow'
}
