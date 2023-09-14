from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core.config.settings import settings
from app.core.database.connection import database_init
from backend.services.initialization import init_default_admin

# Set up FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """
    Startup event for the FastAPI application.
    """

    await database_init()
    await init_default_admin()

# Entry point for running the application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)