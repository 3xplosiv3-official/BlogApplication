from tortoise import fields

from app.models.base import AbstractBaseModel
from app.models.timestamp import TimestampMixin

from services.password import hash_password, verify_password


class User(AbstractBaseModel, TimestampMixin):

    username = fields.CharField(max_length=50, unique=True)
    status = fields.IntField(default=0)
    hashed_password = fields.CharField(max_length=255)
    is_active = fields.BooleanField(default=True)

    def set_password(self, password: str):

        self.hashed_password = hash_password(password)

    def verify_password(self, password: str) -> bool:

        return verify_password(password, self.hashed_password)
