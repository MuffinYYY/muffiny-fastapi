from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from ..database import get_db   
from .. import schemas,models, utils, oath2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseModel
from ..config import Setting

router = APIRouter(
    tags=['authetnication']
)


@AuthJWT.load_config
def get_config():
    return Setting()


@router.post('/login')
def login(loginpost: schemas.UserLogin, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == loginpost.email).first()
    if not user: #if users written email is not the same which is in database
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"Invalid credentials") #raise exception
    if not utils.verify(loginpost.password, user.password): #User.password we get because we queryed the data and there is also hashed password
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"Invalid credentials") #raise exception
    #if the email and password match we need to create a token and return token

    # subject identifier for who this token is for example id or username from database
    access_token = Authorize.create_access_token(subject=user.id)
    refresh_token = Authorize.create_refresh_token(subject=user.id)

    # Set the JWT cookies in the response
    Authorize.set_access_cookies(access_token)
    Authorize.set_refresh_cookies(refresh_token)
    return {"access_token": access_token, "refresh_token": refresh_token}

@router.get('/usertest')
def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    return {"user": current_user}

#Using FASTAPI built in OATH2PasswordRequestForm getting access token
""""
@router.post("/login", response_model=schemas.Token) #Return only what is defined in our schema
def login_user(loginpost: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)): #OAuth2PasswordRequestForm is a class dependency that declares a form body with: The Usarnmae, the password etc. (Check documentation)

    user = db.query(models.User).filter(models.User.email == loginpost.username).first() #Query the users table and filter based on criteria that row "email", has to mach email as defined in our schema UserLogin| It is loginpost.username because our dependency will return username field
    if not user: #if users written email is not the same which is in database
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"Invalid credentials") #raise exception
    if not utils.verify(loginpost.password, user.password): #User.password we get because we queryed the data and there is also hashed password
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"Invalid credentials") #raise exception
    #if the email and password match we need to create a token and return token

    access_token = oath2.create_access_token(payLoad= {"user_id": user.id}) #From this we get our JWT token created and then we return as visible text
    return {"access_token": access_token, "token_type": "bearer", "refresh token" : "token"} #access_token is created JWT which is returned from crea_access_token function in our oath2.py file
"""