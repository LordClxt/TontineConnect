from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from dependecies.authentification import authenticate, create_token
from dependecies.db import db_dependency
from models.Utilisateur import Utilisateur, UtilisateurRequest
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["Authentification"]
)

@router.post('/token')
async def create_acces_token(userForm: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user: Utilisateur = authenticate(userForm.username, userForm.password, db)
    if not user:
        raise HTTPException(status_code=404, detail="Echec d'authentification")
    token = create_token(user.username, user.id, user.role, user.address_blockchain, timedelta(days=1))
    return {
            'access_token': token,
            'token_type':'bearer',
            'user':user
    }

