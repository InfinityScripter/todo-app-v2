from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from database.create_db import *
from sqlalchemy import select, update
from fastapi import status, HTTPException
from models import *
from config import config

app = FastAPI(openapi_url="/api/openapi.json", docs_url="/api/docs")
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
    await create_all()


@app.on_event("shutdown")
async def shutdown():
    pass


@app.get("/api/")
async def root():
    return {"message": f"Welcome to todo_api!!!"}


@app.get("/api/todos/")
async def get_todos():
    async with async_session() as session:
        query = select(Todo).order_by(Todo.id)
        query_result = await session.execute(query)
        todos = query_result.scalars().all()
        await session.commit()

    return todos


@app.get("/api/todos/{todo_id}")
async def get_todo(todo_id):
    async with async_session() as session:
        todo = await session.get(Todo, todo_id)
        if todo is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Todo {todo_id} don't exists",
            )
        await session.commit()

    return todo


@app.post("/api/todos/")
async def create_todo(todo: TodoInModel):
    async with async_session() as session:
        new_todo = Todo(**todo.dict())
        session.add(new_todo)
        await session.commit()

    return new_todo


@app.put("/api/todos/")
async def update_todo(raw_todo: TodoModel):
    async with async_session() as session:
        todo = await session.get(Todo, raw_todo.id)
        if todo is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Todo {raw_todo.id} don't exists",
            )
        todo = Todo(**raw_todo.dict())
        await session.execute(update(Todo).filter(Todo.id == raw_todo.id).values(**raw_todo.dict()))
        await session.commit()

    return todo


@app.delete("/api/todos/{todo_id}")
async def delete_todo(todo_id: int):
    async with async_session() as session:
        todo = await session.get(Todo, todo_id)
        if todo is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Todo {todo_id} don't exists",
            )
        await session.delete(todo)
        await session.commit()

    return {'message': f'Todo with id={todo_id} was deleted.'}