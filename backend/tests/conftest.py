import os
import tempfile

# Doit être défini avant l'import de l'application
_tmp = tempfile.mkdtemp()
os.environ["DATABASE_URL"] = f"sqlite:///{_tmp}/test.db"
os.environ.setdefault("SECRET_KEY", "test-secret")
os.environ.pop("GEMINI_API_KEY", None)

import pytest
from fastapi.testclient import TestClient

from main import app
from db.database import Base, engine


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestClient(app)


USER = {
    "nom": "Doe", "prenom": "John", "email": "john@example.com", "tel": "0102030405",
    "address_blockchain": "0xabc", "role": "user", "password": "secret123", "username": "john",
}


@pytest.fixture()
def auth_headers(client):
    client.post("/user/createUser", json=USER)
    res = client.post("/auth/token", data={"username": "john", "password": "secret123"})
    return {"Authorization": f"Bearer {res.json()['access_token']}"}
