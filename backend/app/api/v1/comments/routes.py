from typing import List

from fastapi import APIRouter, HTTPException

from app.api.v1.comments import schemas as s_s
from app.api.v1.comments import logic as l_c
from app.api.v1.articles import logic as article_logic

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get(
    "/",
    response_model=List[s_s.CommentInDB],
)
async def list_comments():

    return await l_c.get_all_comments()


@router.get(
    "/{comment_id}",
    response_model=s_s.CommentInDB,
)
async def retrieve_comment(comment_id: int):

    return await l_c.get_comment_by_id(comment_id)


@router.get(
    "/article/{article_id}",
    response_model=List[s_s.CommentInDB],
)
async def list_article_comments(article_id: int):

    if not await article_logic.article_exists(article_id):
        raise HTTPException(status_code=404, detail="Article not found")

    article = await article_logic.get_article_by_id(article_id)
    comments = await l_c.get_all_comments_by_article(article)

    return [s_s.CommentInDB.model_validate(comment) for comment in comments]


@router.post(
    "/",
    response_model=s_s.CommentInDB,
)
async def create_new_comment(comment: s_s.CommentCreate):

    if not await article_logic.article_exists(comment.article_id):
        raise HTTPException(status_code=404, detail="Article not found")

    article = await article_logic.get_article_by_id(comment.article_id)

    return await l_c.create_comment(comment.content, article)


@router.put(
    "/{comment_id}",
    response_model=s_s.CommentInDB,
)
async def update_existing_comment(comment: s_s.CommentInDB):

    return await l_c.update_comment(comment)


@router.delete(
    "/{comment_id}",
    status_code=204,
)
async def remove_comment(comment_id: int):

    await l_c.delete_comment(comment_id)
    return {}
