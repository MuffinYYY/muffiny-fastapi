from jose import JWTError, jwt
from datetime import datetime, timedelta
from . import schemas, database, models
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
ouath2_schema = OAuth2PasswordBearer(tokenUrl="login")
from sqlalchemy.orm import Session
from .config import settings


#We have to provide secret key, some algorithm and exparation date/time, this will be done using environmental variables

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_time_minutes

#Function  to create JWT token based on id
def create_access_token(payLoad : dict): #This requires dictionary in which we pass id, referend in route when we login
    data_copied = payLoad.copy() #We make another dictionary
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES) #define expire time for token which is current time + 30 mins as deffined in expire time variable | Have to convert to string otherwise it throws out error that Object of type datetime is not JSON serializable
    expire = expire.timestamp() #This will serialze the expire function otherwise json not able to serialze, .timestamp function converts into a string like format that apparently is serializable
    print(expire)
    data_copied.update({"experation": expire}) #We are ading into copied dictionary the data when will it expire to encode it 
    encoded_jwt = jwt.encode(data_copied, SECRET_KEY, algorithm=ALGORITHM) #We are passing into JWT payLoad, which is some data, SECRET_KEY, and algorithm- 3 things that we need to pass into jwt token
    return encoded_jwt

#Function  to verify JWT token to make sure it's correct
def verify_access_token(token : str, credentials_exception):
    try:
        payLoad = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM) #Decode the jwt token: When we decode we get payLoad (user_id and experation) and header(algorithm type)
        id_get = str(payLoad.get("user_id")) #Extract the id from decoded payload, check pinned in discord to understand better
        expires = float(payLoad.get("experation")) #Extract the expiration time from token
        current_time = datetime.utcnow().timestamp() #Get the current time
        if id is None: #If there is no id throw an error
            raise credentials_exception
        if expires < current_time: #if current time float is bigger than our set expiration time float then we raise an error
            raise credentials_exception

        token_data = schemas.TokenData(id=id_get) #This will validate that it matches our token schema
    except JWTError:
        raise credentials_exception
    return token_data #This token data is just id as defined in our TokenData schema

def get_current_user(token: str = Depends(ouath2_schema), db: Session = Depends(database.get_db)): #This will take token from request automaticly, extract id, verify that token is valid, and then extract id
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Could not validate credentials", headers={"WWW-authenticate": "Bearer"})

    token = verify_access_token(token, credential_exception) #In this variable we store the returned value from verify_access_token function which returns user's id
    user = db.query(models.User).filter(models.User.id==token.id).first() #Query the databse users table and find where user id is equal to id we got in our token
    
    return user #Returns the row of our wanted user, it contains email, password, etc