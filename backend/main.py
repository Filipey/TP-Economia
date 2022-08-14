from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() # python -m uvicorn main:app --reload
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://127.0.0.1:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)


@app.get('/api/v1/')
async def root():
  return { "message": "Hello World from FastAPI" }
