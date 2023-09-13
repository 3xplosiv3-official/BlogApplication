from app.api.v1.users.models import User
from app.services.jwt import create_access_token


async def user_login(http_exception, status, username: str, password: str):

    user = await User.get_or_none(username=username)
    if not user or not user.verify_password(password):
        raise http_exception(
            status_code=status,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.id})

    return access_token
