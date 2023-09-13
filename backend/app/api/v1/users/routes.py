from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/token/")
async def login_for_access_token():
    return {}

