from .. import models,schemas,utils #Single dot means from this directory double dots means from directory above
from fastapi import FastAPI, Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from ..database import get_db #Import from current directory

router = APIRouter(
    prefix="/users",
    tags=['Users']#Set the name of tag that  will be added to the OpenAPI schema and used by the automatic documentation interfaces:
) #Create API router that allows it to split it between different files

@router.post("/", status_code=status.HTTP_201_CREATED, response_model= schemas.ResponseUserCreat) #the status_code is the default when function succesfully completes it's task
def create_user_amogus(payLoad: schemas.UserCreate, db: Session = Depends(get_db)) : #We are putting into payLoad object class Post, which check the variables
    
    payLoad.password = utils.hash(payLoad.password) #Set the user password to the new hashed password
    new_user_amogus = models.User(**payLoad.dict())#Creating new post **payLoad(dict) is a kwarg when we can pass multiple arguments withouth writing each time title = payLoad.Something
    db.add(new_user_amogus) #Adding it to database
    db.commit() #Commiting changes to DataBase
    db.refresh(new_user_amogus) #Retrieve that date we just created and store it in variable new_post_amogus

    return new_user_amogus

@router.get("/{id}", response_model= schemas.ResponseUserCreat)
def get_user_by_id(id : int, db: Session = Depends(get_db)):
    
    get_user_byID = db.query(models.User).filter(models.User.id==id).first() #.all() at the end would also work, but it would continou searching for another post with unique id and fast database resources\
    if not get_user_byID: #If post_with_id was not found raise exception
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found") #raise exception  
    return get_user_byID