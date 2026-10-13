import os
import time
from datetime import datetime, timedelta
from web3 import Web3
from web3.exceptions import ContractLogicError
from fastapi import APIRouter, HTTPException, Form
from dependecies.authentification import user_dependency
from variables.variables import contract_abi, contract_address
from models.Utilisateur import Utilisateur
from dependecies.db import db_dependency


# Connexion a ganache
w3 = Web3(Web3.HTTPProvider(os.getenv('GANACHE_URL', 'http://127.0.0.1:7545')))

if w3.is_connected():
    print("Connexion effectuer avec success")
else:
    print("Erreur de connexion")

router = APIRouter(
    prefix='/blockchain'
)


# Charger le contrat via son adresse et son ABI
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# LOGIQUE UTILISATEUR

# Fonction pour inscrire un tilisateur dans la blockchain
@router.get('/registerBlockchain')
async def registerUser(user:user_dependency):
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    is_registerd = contract.functions.isRegistered(sender_account.address).call()
    if is_registerd:
        raise HTTPException(status_code=500, detail="Utilisateur exite déjà")

    #Exemple d'appel de fonction qui modifie l'état du contrat
    transaction = contract.functions.registerUser().build_transaction({
        'from': sender_account.address,
        'nonce': w3.eth.get_transaction_count(sender_account.address),
    })
    # Signer et envoyer la transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return {"message": 'success'}

#Transaction utilisateur
@router.get('/transactions/user')
async def getTransactions(user: user_dependency):
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    transactions = contract.functions.getUserTransactions(sender_account.address).call()
    
    update_transactions = []
    id = 0
    for transaction in transactions:    
        date = datetime.fromtimestamp(transaction[0])
        update_transactions.append({
            'id':id,
            'montant':transaction[2],
            'nom':transaction[-1],
            'date': date.strftime("%d/%m/%Y")
            
        })
        id+=1
    return update_transactions

# Consultation solde
@router.get('/compte_utilisateur')
async def userAccount(user:user_dependency):
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    account = contract.functions.getAccountBalances(sender_account.address).call()
    return {
        'compte_principale':account[0],
        'compte_epargne':account[1]
    }

# Recharger compte
@router.post('/rechargeAccount')
async def rechargeAccount(user:user_dependency, montant:int=Form(...), numero:str =Form(...)):
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    # Exemple d'appel de fonction qui modifie l'état du contrat
    transaction = contract.functions.rechargeAccount(montant).build_transaction({
        'from': sender_account.address,
        'nonce': w3.eth.get_transaction_count(sender_account.address),
    })
    # Signer et envoyer la transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return {"message": 'success'}
    

#------------------EPARGNE------------------#

#Recharger le compte epargne
@router.post('/rechargeEpargneAccount/')
async def rechargeEpargneAccount(user: user_dependency, numero:str =Form(...), montant:int=Form(...)):
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)

    # Exemple d'appel de fonction qui modifie l'état du contrat
    transaction = contract.functions.transferToSavings(montant).build_transaction({
        'from': sender_account.address,
        'nonce': w3.eth.get_transaction_count(sender_account.address),
    })

    # Signer et envoyer la transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return {"message": 'success'}


#Transferer de l'argent de mon compte epargne a mon compte principal
@router.post('/transfertToMainAccount/')
async def transfertToMainAccount(montant: int, user: user_dependency):
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)

    # Exemple d'appel de fonction qui modifie l'état du contrat
    transaction = contract.functions.transferFromSavings(montant).build_transaction({
        'from': sender_account.address,
        'nonce': w3.eth.get_transaction_count(sender_account.address),
    })

    # Signer et envoyer la transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return {"message": 'success'}


#--------------------------LOGIQUE DE TONTINE#--------------------------


#Création de tontine
@router.post('/createTontine')
async def create_tontine(user: user_dependency,nom:str = Form(...), montant:int = Form(...), frequnce:int = Form(...), maxmembre:int = Form(...)):

    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)

    # Exemple d'appel de fonction qui modifie l'état du contrat
    transaction = contract.functions.createTontine(nom, int(time.time()) + 100, montant, int(timedelta(days=frequnce).total_seconds()), maxmembre).build_transaction({
        'from': sender_account.address,
        'nonce': w3.eth.get_transaction_count(sender_account.address),
    })
    # Signer et envoyer la transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return {"message": 'success'}


# Recuperer une tontine précise
@router.get('/tontine/{tontine_id}')
async def get_tontine(tontine_id:int, user: user_dependency):
    private_key = user.get('address_blockchain')
    try:
        tontine = contract.functions.getTontineSummary(tontine_id).call()
        date = datetime.fromtimestamp(tontine[1])
        nextTimestamp = tontine[7] + tontine[3]
        dateNext = datetime.fromtimestamp(nextTimestamp)
        return {
                'nom_tontine':tontine[0],
                'time_stamp_date_debut':date.strftime("%d/%m/%Y"),
                'montant':tontine[2],
                'frequence':tontine[3],
                'nombre_membre_max':tontine[4],
                'nombre_membre_inscris':tontine[5],
                'est_active':tontine[6],
                'derniere_distribution':tontine[7],
                'membres':tontine[8],
                'prochaine_distribution':dateNext.strftime("%d/%m/%Y")
            }
    except Exception as e:
        raise HTTPException(status_code=404, detail="Aucune tontine ne corresponds a cet id")
    
    
# Recuperer les participans d'une tontine précise
@router.get('/users/tontine/{tontine_id}')
async def get_tontine_user(tontine_id:int, db:db_dependency): # type: ignore
    
    tontine = contract.functions.getTontineSummary(tontine_id).call()
    users:list[Utilisateur] = db.query(Utilisateur).all() 
    list_user = []
    for user in users:
        user_address = w3.eth.account.from_key(user.address_blockchain).address
        if user_address in tontine[8]:
            list_user.append({
                "id":user.id,
                "nom":user.nom,
                "prenom":user.prenom,
                "address":user_address,
            })
    return list_user


# Recuperer toutes les tontines
@router.get('/tontines')
async def getAllTontine(user: user_dependency):
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    tontines = contract.functions.getAllTontines().call()
    tontine_list = []
    id = 0
    for tontine in tontines:
        datetimestamp = datetime.fromtimestamp(tontine[1])
        datestring = datetimestamp.strftime('%d/%m/%Y')
        tontine_list.append({
            'id':id,
            'nom_tontine':tontine[0],
            'time_stamp_date_debut':datestring,
            'montant':tontine[2],
            'frequence':tontine[3],
            'nombre_membre_max':tontine[4],
            'nombre_membre_inscris':tontine[5],
            'est_active':tontine[6],
            'derniere_distribution':tontine[7],
            'membres':tontine[8]
        })
        id +=1
    return {"tontines":tontine_list, "current_user":sender_account.address}
    
    
# Rejoindre une tontine
@router.get('/tontine/rejoindre/{tontine_id}')
async def joinTontine(tontine_id:int, user: user_dependency):
    
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    try:
    # Exemple d'appel de fonction qui modifie l'état du contrat
        transaction = contract.functions.joinTontine(tontine_id).build_transaction({
            'from': sender_account.address,
            'nonce': w3.eth.get_transaction_count(sender_account.address),
        })
        signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
        txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        return {"message": 'success'}
    except ContractLogicError as e:
        raise HTTPException(status_code=404,detail=f"Vous etes {e.data['reason'].lower()} de cette tontine")
    except Exception as e:
        print("Erreur innatendu")


# Contribution tontine
@router.post('/tontine/contribution/{tontine_id}')
async def contributeTontine(tontine_id:int, user: user_dependency, montant:int = Form(...)):
    
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    try:
        transaction = contract.functions.contribute(tontine_id, montant).build_transaction({
            'from': sender_account.address,
            'nonce': w3.eth.get_transaction_count(sender_account.address),
        })
        signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
        txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        return {"message": 'success'}
    except ContractLogicError as e:
        raise HTTPException(status_code=404, detail=f"{e.data['reason']}")
    except Exception as e:
        print("Erreur")
        
        
# Distribution tontine
@router.post('/tontine/distribution/{tontine_id}')
async def ditributeTontine(tontine_id:int, user: user_dependency):
    
    private_key = user.get('address_blockchain')
    sender_account = w3.eth.account.from_key(private_key)
    try:
        transaction = contract.functions.distributeTontine(tontine_id).build_transaction({
            'from': sender_account.address,
            'nonce': w3.eth.get_transaction_count(sender_account.address),
        })
        signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
        txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        return {"message": 'success'}
    except ContractLogicError as e:
        raise HTTPException(status_code=404, detail=f"{e.data['reason']}")
    except Exception as e:
        print("Erreur")
        

#Recuperer les contributeurs de la tontine
@router.get('/tontine/contrbuteur/{tontine_id}')
async def tontineContributeur(tontine_id: int, user: user_dependency):
    private_key = user.get('address_blockchain')
    contributers = contract.functions.getContributors(tontine_id).call()
    return contributers


#Récuperer toutes les transactions d'une tontine
@router.get('/transactions/tontines/{tontine_id}')
async def getAllTontine(tontine_id:int, user: user_dependency):
    private_key = user.get('address_blockchain')
    transactions = contract.functions.getTontineTransactions(tontine_id).call()
    list_transactions = []
    for transaction in transactions:
        timestampToDate = datetime.fromtimestamp(transaction[0])
        strDate = timestampToDate.strftime("%d/%m/%Y")
        list_transactions.append({
            "creation_date":strDate,
            "address":transaction[1],
            "montant":transaction[2],
            "transaction_type":transaction[3],
            "tontine_id":transaction[4],
            "description":transaction[5]
        })
    return list_transactions
