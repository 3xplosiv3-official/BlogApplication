"""
Users Routes.

This module contains the routes related to user authentication, primarily for generating
access tokens. It uses OAuth2 password flow for authentication.
"""

from typing import Annotated

from fastapi import APIRouter, Response, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.api.v1.users import schemas as s_s
from app.api.v1.users import logic as l_c

router = APIRouter(prefix="/users", tags=["users"])


@router.post(
    "/token/",
    response_model=s_s.UserToken,
    summary="Generate Access Token",
    description=(
        "<b>Authenticate user using OAuth2 password flow and "
        "generate an access token.\n\n"
        "On successful authentication, an access token is set "
        "in the HTTP cookies and also "
        "returned in the response.</b>\n\n"
        "Return Type: `UserToken`."
    ),
    response_description=(
            "A dictionary containing the access token and token type."
    )
)
async def login_for_access_token(
        response: Response,
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    """
    Generate an access token for valid user credentials.

    Uses OAuth2 password flow to authenticate the user.
    On successful authentication, an access token is set in the HTTP cookies and
    also returned in the response.

    :param response: Used to set cookies.
    :type response: Response
    :param form_data: OAuth2 password request form data, which contains
    the username and password.
    :type form_data: OAuth2PasswordRequestForm
    :return: A dictionary containing the access token and token type.
    :rtype: dict
    :raises HTTPException: Raises 401 error if authentication fails.
    """

    access_token = await l_c.user_login(
        http_exception=HTTPException,
        status=status.HTTP_401_UNAUTHORIZED,
        username=form_data.username,
        password=form_data.password
    )

    response.set_cookie(key="access_token", value=access_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer"}
