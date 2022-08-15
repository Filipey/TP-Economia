from typing import List

from pydantic import BaseModel

from .item import Item


class UserBase(BaseModel):
  name: str
  email: str

class UserCreate(UserBase):
  password: str

  class Config:
    orm_mode = True

class User(UserBase):
  id: int
  items: List[Item] = []

  class Config:
    orm_mode = True
