from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import Column, Integer, String

from db.database import Base


class Utilisateur(Base):
    __tablename__ = "utilisateurs"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    prenom = Column(String)
    email = Column(String)
    tel = Column(String)
    address_blockchain = Column(String)
    role = Column(String)
    password = Column(String)
    username = Column(String, unique=True)


class UtilisateurRequest(BaseModel):
    nom:str
    prenom:str
    email:EmailStr
    tel:str
    address_blockchain:str = Field(max_length=10)
    role:str
    password:str
    username:str