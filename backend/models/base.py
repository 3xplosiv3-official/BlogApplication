from tortoise import fields
from tortoise.models import Model


class AbstractBaseModel(Model):

    id = fields.IntField(pk=True)

    class Meta:
        abstract = True

    def __str__(self):

        return f"<{self.__class__.__name__} {self.id}>"
