from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.api.v1.users.models import User
from app.services.jwt import decode_jwt_token

# Define the OAuth2 password-based scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/users/token")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:

    payload = decode_jwt_token(token)
    print(payload)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid token content")

    user = await User.get_or_none(id=user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
