from typing import Annotated

from fastapi import Query, Depends, APIRouter

from app.api.v1.articles import schemas as s_s
from app.api.v1.articles import logic as l_c
from app.api.v1.users.models import User
from app.services.authentication import get_current_user

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get(
    "/",
    response_model=s_s.ArticleResponse,
)
async def list_articles(
        skip: int = Query(
            1, alias="page",
            ge=1
        ),
        limit: int = Query(
            10,
            le=100
        )):

    articles, total = await l_c.get_all_articles(
        skip=skip,
        limit=limit
    )

    return {
        "total": total,
        "page": skip,
        "per_page": limit,
        "items": articles
    }


@router.get(
    "/{article_id}",
    response_model=s_s.ArticleInDB,
)
async def retrieve_article(article_id: int):

    return await l_c.get_article_by_id(article_id)


@router.post(
    "/",
    response_model=s_s.ArticleInDB,
)
async def create_new_article(
        article: s_s.ArticleCreate,
        current_user: Annotated[User, Depends(get_current_user)]):

    return await l_c.create_article(article)


@router.put(
    "/{article_id}",
    response_model=s_s.ArticleInDB,
)
async def update_existing_article(
        article: s_s.ArticleInDB,
        current_user: Annotated[User, Depends(get_current_user)]
):

    return await l_c.update_article(article)


@router.delete(
    "/{article_id}",
    status_code=204,
)
async def remove_article(
        article_id: int,
        current_user: Annotated[User, Depends(get_current_user)]
):

    await l_c.delete_article(article_id)

    return {}
