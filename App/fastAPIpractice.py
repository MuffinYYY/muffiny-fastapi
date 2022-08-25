from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from .database import engine #Import from current directory
from . import models#Import model so we can send querejs to it and import schemas
from .routers import post,user,auth,vote
from .config import settings

from fastapi.middleware.cors import CORSMiddleware

#models.Base.metadata.create_all(bind=engine) #This is comand that told SQLalchemy to run create statment to generate tables

app = FastAPI()

#This is the list for all domains that can talk with our api, if we want every url to be able to talk with our api we can do origins = ["*"]
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:3000",
    "http://localhost:8080",
    "https://www.google.com"
]

#Getting past CORS block
app.add_middleware(
    CORSMiddleware, #Function that runs before every request
    allow_origins=origins, #Specify what domains can talk with our api
    allow_credentials=True,
    allow_methods=["*"], #We can specify what methods people are allowed to send to our API, for example we can limit to only GET requests 
    allow_headers=["*"],
)

#This will call post file and complete every path route
app.include_router(post.router) 
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)

@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )