import os
from datetime import timedelta, datetime, timezone
from fastapi import HTTPException
from typing import Annotated

from fastapi.params import Depends
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from models.Utilisateur import Utilisateur
from fastapi.security import OAuth2PasswordBearer

bcrypt = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')


# À définir en production (la valeur par défaut est celle de dev, elle est publique)
SECRET_KEY = os.getenv("SECRET_KEY", "dev-only-insecure-secret-change-me")
ALGORITHM = 'HS256'

# Recuperer l'utilisateur courant si jamais le jwt est valide
def get_current_user(token: Annotated[str, Depends(oauth_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        username = payload.get('username')
        user_id = payload.get('user_id')
        role = payload.get('role')
        address_blockchain = payload.get('address_blockchain')

        if username is None:
            raise HTTPException(status_code=401, detail="Vous n'etes pas autorisé à acceder a cette url")
        return {'username': username, 'user_id':user_id, 'role':role, 'address_blockchain':address_blockchain}

    except JWTError:
        raise HTTPException(status_code=401, detail='Erreur jwt')

# La dependance qui seras injecter lorsque nous voudrons acceder a une route proteger
user_dependency = Annotated[dict, Depends(get_current_user)]


# Authentification de l'autilisateur
def authenticate(username, password, db: Session):
    user = db.query(Utilisateur).filter(Utilisateur.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Cet utilisateur n'existe pas")
    if not bcrypt.verify(password, user.password):
        return False
    return user

# Fontion de generation de token
def create_token(username:str, user_id:int, role:str, address_blockchain:str, expire:timedelta):
    encode = {
        'username':username,
        'user_id':user_id,
        'role':role,
        'address_blockchain':address_blockchain
    }

    expires = datetime.now(timezone.utc) + expire
    encode.update({'exp':expires})
    return jwt.encode(encode, SECRET_KEY, ALGORITHM)
