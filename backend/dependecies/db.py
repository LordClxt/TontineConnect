from typing import Annotated

from fastapi import Depends

from db.database import Session


def getDB():
    db = Session()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(getDB)]