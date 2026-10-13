import shutil

from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from starlette import status
import os
from dependecies.db import db_dependency, Session

from models.Cours import Cours

# from typing import

router = APIRouter(
    prefix="/Cours",
    tags=["Cours"]
)

@router.get('/{cours_id}', status_code=status.HTTP_200_OK)
async def getCours(cours_id,db:db_dependency):
    cours_model= db.query(Cours).filter(Cours.id == cours_id).first()
    if cours_model is None:
        raise HTTPException(status_code=404, detail="Ce cours n'existe pas")
    return cours_model


# Affichage des cours
@router.get('/', status_code=status.HTTP_200_OK)
async def getAllCours(db:db_dependency):
    return db.query(Cours).all()


#
@router.post('/', status_code=status.HTTP_201_CREATED)
async def createCours(
        db:db_dependency,
        titre = Form(...),
        miniature:UploadFile = File(...),
        video:UploadFile = File(...),
        resume = Form(...)):
    miniature_filename = None
    video_filename = None
    if miniature.content_type in ["image/png", "image/jpeg"]:
        miniature_filename = './static/images/' + miniature.filename
        with open(miniature_filename, "wb") as buffer:
            shutil.copyfileobj(miniature.file, buffer)
    else:
       raise HTTPException(status_code=400, detail='Veuillez fournir une image en jpeg ou en png')
    if video.content_type in ["video/mp4"]:
        video_filename = './static/videos/' + video.filename
        with open(video_filename, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
    else:
       raise HTTPException(status_code=400, detail='Veuillez fournir une vidéo en mp4')

    cours_modele:Cours = Cours(
        titre=titre,
        miniature=miniature.filename,
        video=video.filename,
        resume=resume
    )

    db.add(cours_modele)
    db.commit()


@router.put('/', status_code=status.HTTP_204_NO_CONTENT)
async def updateCours():
    pass

@router.delete('/', status_code=status.HTTP_204_NO_CONTENT)
async def deleteCours():
    pass