import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from config import config
import database.create_db
from starlette.middleware.sessions import SessionMiddleware
from database.create_db import *
app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=config.SECRET_KEY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/api/")
async def root():
    return {"message": f"Welcome to todo_api!!!"}

@app.post("/api/notes/", response_model=Note)
async def create_note(note: NoteIn):
    query = notes.insert().values(text=note.text, completed=note.completed)
    last_record_id = await database.execute(query)
    return {**note.dict(), "id": last_record_id}