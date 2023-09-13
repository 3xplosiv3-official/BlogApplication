from fastapi import APIRouter

from app.api.v1.articles.routes import router as articles_router
from app.api.v1.comments.routes import router as comments_router
from app.api.v1.users.routes import router as users_router

# Initialize the main API router.
main_api_router = APIRouter()

# List of individual routers to be included in the main API router.
api_routers = [articles_router, comments_router, users_router]

# Include each router from the list into the main API router.
for api_router in api_routers:

    main_api_router.include_router(api_router)
