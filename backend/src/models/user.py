from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from ..database.handle_db import Base


class UserModel(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String)
  email = Column(String, unique=True, index=True)
  hash_password = Column(String)

  items = relationship("ItemModel", back_populates="owner")
