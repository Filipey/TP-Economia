from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..database.handle_db import Base


class ItemModel(Base):
  __tablename__ = "items"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, index=True)
  description = Column(String, index=True)
  owner_id = Column(Integer, ForeignKey("users.id"))

  owner = relationship("UserModel", back_populates="items")
