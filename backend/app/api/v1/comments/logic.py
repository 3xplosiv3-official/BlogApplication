from app.api.v1.comments.models import Comment
from app.api.v1.comments.schemas import CommentInDB


async def get_all_comments():

    return await Comment.all()


async def get_comment_by_id(comment_id: int):

    return await Comment.get(id=comment_id)


async def get_all_comments_by_article(article):

    return await Comment.filter(article=article)


async def create_comment(content: str, article):

    return await Comment.create(content=content, article=article)


async def update_comment(comment: CommentInDB):

    db_comment = await Comment.get(id=comment.id)
    for field, value in comment.model_dump().items():
        setattr(db_comment, field, value)
    await db_comment.save()
    return db_comment


async def delete_comment(comment_id: int):

    await Comment.filter(id=comment_id).delete()
