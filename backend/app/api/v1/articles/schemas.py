from typing import List

from pydantic import BaseModel


class ArticleBase(BaseModel):
    title: str
    content: str


class ArticleCreate(ArticleBase):

    pass


class ArticleUpdate(ArticleBase):

    pass


class ArticleInDB(ArticleBase):

    id: int

    class Config:

        from_attributes = True


class ArticleResponse(BaseModel):

    total: int
    page: int
    per_page: int
    items: List[ArticleInDB]
