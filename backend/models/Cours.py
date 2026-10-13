from typing import Optional

from pydantic import BaseModel
from sqlalchemy import Column, Integer, String

from db.database import Base

class Cours(Base):

    __tablename__ = 'cours'
    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    miniature = Column(String)
    video = Column(String)
    resume = Column(String)

# class CoursRequest(BaseModel):
#
#     id:Optional[int]
#     titre:str
#     miniature:str