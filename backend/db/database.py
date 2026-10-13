import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres:admin@localhost:5432/Tontine_Connect")

# SQLite (utilisé pour les tests) a besoin de check_same_thread=False avec FastAPI
connect_args = {"check_same_thread": False} if DB_URL.startswith("sqlite") else {}
engine = create_engine(DB_URL, connect_args=connect_args)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()