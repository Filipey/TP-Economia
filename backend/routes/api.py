from fastapi import APIRouter

from src.controllers import user_controller

router = APIRouter()
router.include_router(user_controller.router)
