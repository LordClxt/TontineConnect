from unittest.mock import MagicMock, patch

from tests.conftest import USER


def test_index(client):
    assert client.get("/").json() == {"hello": "Hello Clxt"}


def test_create_user_and_list(client):
    assert client.post("/user/createUser", json=USER).status_code == 201
    users = client.get("/user/").json()
    assert len(users) == 1 and users[0]["username"] == "john"
    assert users[0]["password"] != "secret123"  # haché


def test_create_user_invalid_email(client):
    assert client.post("/user/createUser", json={**USER, "email": "nope"}).status_code == 422


def test_login_success(client):
    client.post("/user/createUser", json=USER)
    res = client.post("/auth/token", data={"username": "john", "password": "secret123"})
    assert res.status_code == 200
    assert res.json()["token_type"] == "bearer"


def test_login_wrong_password(client):
    client.post("/user/createUser", json=USER)
    res = client.post("/auth/token", data={"username": "john", "password": "bad"})
    assert res.status_code == 404


def test_login_unknown_user(client):
    assert client.post("/auth/token", data={"username": "x", "password": "y"}).status_code == 404


def test_cours_not_found(client):
    assert client.get("/Cours/999").status_code == 404
    assert client.get("/Cours/").json() == []


def test_protected_routes_require_token(client):
    assert client.get("/blockchain/compte_utilisateur").status_code == 401
    assert client.post("/Bot/", data={"userRequest": "tontine"}).status_code == 401


def test_chatbot_off_topic(client, auth_headers):
    res = client.post("/Bot/", data={"userRequest": "meteo"}, headers=auth_headers)
    assert "mots-clés" in res.json()["response"]


def test_chatbot_without_api_key(client, auth_headers):
    res = client.post("/Bot/", data={"userRequest": "parle moi de tontine"}, headers=auth_headers)
    assert res.status_code == 503


def test_balance_with_mocked_blockchain(client, auth_headers):
    from router import blockchain_interaction as bc
    fake_contract = MagicMock()
    fake_contract.functions.getAccountBalances.return_value.call.return_value = [100, 50]
    with patch.object(bc, "contract", fake_contract), patch.object(bc, "w3") as w3:
        w3.eth.account.from_key.return_value.address = "0x0"
        res = client.get("/blockchain/compte_utilisateur", headers=auth_headers)
    assert res.json() == {"compte_principale": 100, "compte_epargne": 50}
