import os

import google.generativeai as genai
from fastapi import APIRouter, HTTPException, Form
from dependecies.authentification import user_dependency
router = APIRouter(
    prefix='/Bot',
    tags=["ChatBot"]
)

@router.post('/')
async def askBot(user: user_dependency, userRequest: str= Form(...)):

    keywords = [
        "tontine",
        "epargne",
        "épargne",
        "épargné",
        "compte d'épargne",
        "taux d'intérêt",
        "objectifs d'épargne",
        "planification financière",
        "retraite",
        "investissement",
        "budget",
        "conseils financiers"
    ]


    if not any(keyword in userRequest.lower() for keyword in keywords):
        return {'response':  "Veuillez formuler votre demande en incluant des mots-clés tels que 'tontine', 'épargne', 'compte d'épargne', 'taux d'intérêt', 'objectifs d'épargne', 'planification financière', 'retraite', 'investissement', 'budget' ou 'conseils financiers'."}


    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY non configurée")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"Tu es un expert en epargne et en tontine qui donne des reponse simple: {userRequest}"
    )

    return {'response':response.text}



