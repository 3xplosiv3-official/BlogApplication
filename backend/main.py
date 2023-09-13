from fastapi import FastAPI

from app.core.config.settings import settings
from app.core.database.connection import database_init


# Set up FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)


@app.on_event("startup")
async def startup_event():
    """
    Startup event for the FastAPI application.
    """

    await database_init()


# Entry point for running the application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)