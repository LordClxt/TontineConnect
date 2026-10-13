from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from db.database import engine
from router import cours, chatbot, utilisateur, auth, blockchain_interaction
from models import Cours, Utilisateur

Cours.Base.metadata.create_all(bind=engine)


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# Ajouter le middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Origines autorisées
    allow_credentials=True,  # Permettre l'envoi de cookies ou d'en-têtes d'autorisation
    allow_methods=["*"],     # Méthodes HTTP autorisées (GET, POST, etc.)
    allow_headers=["*"],     # En-têtes HTTP autorisés
)
@app.get('/')
def index():
    return {"hello":'Hello Clxt'}
app.include_router(cours.router)
app.include_router(chatbot.router)
app.include_router(utilisateur.router)
app.include_router(auth.router)
app.include_router(blockchain_interaction.router)