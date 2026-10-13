from fastapi import APIRouter
from starlette import status
from dependecies.db import db_dependency
from models.Utilisateur import Utilisateur, UtilisateurRequest
from dependecies.authentification import bcrypt

router = APIRouter(
    prefix="/user",
    tags=["Utilisateur"]
)



@router.get('/', status_code=status.HTTP_200_OK)
async def getUtilisateurs(db:db_dependency):
    return db.query(Utilisateur).all()

# Inscription d'un utilisateur
@router.post('/createUser', status_code=status.HTTP_201_CREATED)
async def createUtilisateur(create_user:UtilisateurRequest,db: db_dependency):
     utilisateur_model = Utilisateur(
         nom = create_user.nom,
         prenom = create_user.prenom,
         email=create_user.email,
         tel = create_user.tel,
         address_blockchain = create_user.address_blockchain,
         role = create_user.role,
         password = bcrypt.hash(create_user.password),
         username = create_user.username
     )
     print(utilisateur_model)
     db.add(utilisateur_model)
     db.commit()