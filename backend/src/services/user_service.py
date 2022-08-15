from sqlalchemy.orm import Session

from ..models.user import UserModel
from ..schemas.user import User


def get_all_users(db: Session, skip: int = 0, limit: int = 100):
  return db.query(UserModel).offset(skip).limit(limit).all()


