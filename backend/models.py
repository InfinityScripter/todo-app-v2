from pydantic import BaseModel

class TodoInModel(BaseModel):
    title: str
    completed: bool


class TodoModel(BaseModel):
    id: int
    title: str
    completed: bool
