from pydantic.v1 import BaseSettings


class Settings(BaseSettings):
    """
    Application's main settings.

    Attributes:
        PROJECT_NAME (str): Name of the project.
        PROJECT_DESCRIPTION (str): Description of the project.
        PROJECT_VERSION (str): Actual version of the project.
        API_V1_ENDPOINT (str): Base endpoint for version 1 of the API.

        DATABASE_URL (str): Connection URL for the database.

        SECRET_KEY (str): Secret key for encoding and decoding JWT tokens.
        ALGORITHM (str): Algorithm to be used for JWT.
        ACCESS_TOKEN_EXPIRE_MINUTES (int): Token expiration time.

        DEFAULT_ADMIN_USERNAME (str): Default admin username.
        DEFAULT_ADMIN_PASSWORD (str): Default admin password.

        SERVER_HOST (str): Host of the uvicorn server.
        SERVER_PORT (int): Port of the uvicorn server.

    """

    PROJECT_NAME: str = "ENIGMA BLOG APPLICATION"
    PROJECT_DESCRIPTION: str = "Backend of blog app for the test task at LZT forum"
    PROJECT_VERSION: str = "7.7.7"
    API_V1_ENDPOINT: str = "/api/v1"

    DATABASE_URL: str = "sqlite://sqlite3.db"

    SECRET_KEY: str = 'ENIGMALANCEVERYHIGHSECURITYKEY'
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    DEFAULT_ADMIN_USERNAME: str = 'admin'
    DEFAULT_ADMIN_PASSWORD: str = 'admin1'

    SERVER_HOST: str = '0.0.0.0'
    SERVER_PORT: int = 8228

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
