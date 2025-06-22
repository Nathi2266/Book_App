from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
import os
from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from datetime import datetime

Base = declarative_base()
engine = None
SessionLocal = None

def init_db(db_url=None):
    global engine, SessionLocal
    if not db_url:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        db_url = f'sqlite:///{os.path.join(BASE_DIR, "books.db")}'
    
    engine = create_engine(
        db_url,
        connect_args={"check_same_thread": False},
        echo=False  # Set to True for debugging
    )
    SessionLocal = scoped_session(
        sessionmaker(autocommit=False, autoflush=False, bind=engine)
    )
    Base.metadata.create_all(bind=engine)

def get_db_session():
    if not SessionLocal:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return SessionLocal()

def close_db_session():
    if SessionLocal:
        SessionLocal.remove()

# Database models
class Book(Base):
    __tablename__ = "books"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    author = Column(String(50), nullable=False)
    pages = Column(Integer)
    published = Column(Date)

class Note(Base):
    __tablename__ = "notes"
    
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey('books.id'), nullable=False)
    content = Column(String(500), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
