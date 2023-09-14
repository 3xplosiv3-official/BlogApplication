from tortoise import fields
from app.models.base import AbstractBaseModel
from app.models.timestamp import TimestampMixin


class Comment(AbstractBaseModel, TimestampMixin):

    content = fields.TextField()
    article = fields.ForeignKeyField("models.Article", related_name="comments")
