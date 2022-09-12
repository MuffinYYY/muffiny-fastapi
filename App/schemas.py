from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, conint
from typing import Optional

#Pydantic class makes sure that variables will be types as defined if user doesn't provide some data the pydantic model will validate that
#Pydantic models make sure that data is shaped specific way
#When we post something we need to pass into postman body the data as defined by our schema, but if there is some automatic data it can be passed automaticly withouth schema, such as id and user_id

class PostBase(BaseModel):
    Title : str
    baka : str
    ajusnevarat : int
    path_name : Optional[str] = ''

#Define pydantic model that is required to be entered
class Post(PostBase):
    meth: Optional[int] = None
    published: bool = True

#Define pydantic model that will be sent back

class ResponseUserCreat(BaseModel): #This is response we expect to get when we create a new user
    email : EmailStr
    created_at : datetime
    profile_img_path_name : Optional[str] = 'profile_default.jpg'

    class Config: #This converts SQLalchemy model to be a pydantic model because pydantic model requires dictionaries
        orm_mode = True

class ResponsePost(PostBase): # This is respopnse we will be getting when we send back request
    owner_id : int
    id : int
    posted_at : datetime
    owner : ResponseUserCreat


    class Config: #This converts SQLalchemy model to be a pydantic model because pydantic model requires dictionaries
        orm_mode = True

class PostOut(BaseModel): #This is pydantic model ant the dictionary will contain two rows, one for likes the second one for ResponsePost pydantic model
    PostSMTH : ResponsePost
    likes : int

class UserAccountUpdate(BaseModel):
    profile_img_path_name : Optional[str] = 'profile_default.jpg'

    class Config: #This converts SQLalchemy model to be a pydantic model because pydantic model requires dictionaries
        orm_mode = True


class UserCreate(BaseModel):
    email : EmailStr
    password : str

    
    class Config: #This converts SQLalchemy model to be a pydantic model because pydantic model requires dictionaries
        orm_mode = True

class UserLogin(BaseModel):
    email : EmailStr
    password : str

class Token(BaseModel): #Class for defining how will our token schema look
    access_token : str
    token_type : str

class TokenData(BaseModel):
    id: Optional[str]
    
class Vote(BaseModel):
    post_id : conint(strict=int) #This will require STRICT integer, won't be allowed 10.2 or some other value
    vote_dir : conint(strict=int, ge=1, le=1) #Strict int that has to be either 0 or 1 | 1 will be POST liked, 0 will be POST UNLIKED
    #vote_dir : int = Field(int, ge=0, le=1) #the value has to be greater ir equal to 0 and less or equal than 1, we require int, so this will allow only two values 0 or 1