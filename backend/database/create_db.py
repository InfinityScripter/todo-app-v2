from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Integer, String, Column, Boolean

DATABASE_URL = "postgresql+asyncpg://user:password@db/todo"
engine = create_async_engine(DATABASE_URL, echo=True)

class Base(DeclarativeBase):
    pass


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    title = Column(String)
    completed = Column(Boolean)

    def __repr__(self):
     return "<Todo(title='%s', completed='%s'>" % (
         self.title,
         self.completed,
     )


async_session = async_sessionmaker(engine, expire_on_commit=False)

async def create_all():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

