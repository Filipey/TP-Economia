from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.schemas.user import User, UserBase, UserCreate

from ..database.handle_db import SessionLocal
from ..services import user_service

router = APIRouter(
  prefix="/api/v1",
  tags=["User"],
  responses={404: { "description": "Not found" }}
)

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.get("/users")
async def get_users(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
  return user_service.get_all_users(db)
