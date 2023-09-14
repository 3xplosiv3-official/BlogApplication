from pydantic import BaseModel


class CommentBase(BaseModel):

    content: str


class CommentCreate(CommentBase):

    article_id: int


class CommentUpdate(CommentBase):

    article_id: int


class CommentInDB(CommentBase):

    id: int
    article_id: int

    class Config:

        from_attributes = True

