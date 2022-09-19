from pyexpat import model
from .. import models,schemas,utils #Single dot means from this directory double dots means from directory above
from fastapi import FastAPI, Depends, status, HTTPException, APIRouter, File, UploadFile
from sqlalchemy.orm import Session
from ..database import get_db #Import from current directory
from pydantic import BaseModel, EmailStr, Field, conint
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
import serial

router = APIRouter(
    prefix="/serial",
    tags=['Serial']
)

@router.get("/")
def get_current_user(Authorize: AuthJWT = Depends()):

    Authorize.jwt_required()

    try:
        ser = serial.Serial('COM5')  # open serial port
        print(ser.name)
    except:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE)
    print(ser)

    return ser
