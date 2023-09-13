from tortoise import fields

from app.models.base import AbstractBaseModel
from app.models.timestamp import TimestampMixin


class User(AbstractBaseModel, TimestampMixin):

    username = fields.CharField(max_length=50, unique=True)
    status = fields.IntField(default=0)
    hashed_password = fields.CharField(max_length=255)
    is_active = fields.BooleanField(default=True)

