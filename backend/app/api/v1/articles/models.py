from tortoise import fields

from app.models.base import AbstractBaseModel
from app.models.timestamp import TimestampMixin


class Article(AbstractBaseModel, TimestampMixin):

    title = fields.CharField(max_length=255)
    content = fields.TextField()
    comments = fields.ReverseRelation["Comment"]

