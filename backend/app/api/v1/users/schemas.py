from pydantic import BaseModel


class UserBase(BaseModel):

    username: str
    password: str


class UserToken(BaseModel):

    access_token: str
    token_type: str


class UserInDB(UserBase):

    id: int

    class Config:

        from_attributes = True
