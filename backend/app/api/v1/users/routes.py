from typing import Annotated

from fastapi import APIRouter, Response, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.api.v1.users import schemas as s_s
from app.api.v1.users import logic as l_c

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/token/", response_model=s_s.UserToken)
async def login_for_access_token(
        response: Response,
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):

    access_token = await l_c.user_login(
        http_exception=HTTPException,
        status=status.HTTP_401_UNAUTHORIZED,
        username=form_data.username,
        password=form_data.password
    )

    response.set_cookie(key="access_token", value=access_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer"}

