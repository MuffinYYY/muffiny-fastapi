from fastapi import FastAPI, Depends, status, HTTPException, APIRouter, File, UploadFile, WebSocket, Query
import serial
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from sqlalchemy.orm import Session
import asyncio

from ..database import get_db #Import from current directory
from .. import models,schemas,utils #Single dot means from this directory double dots means from directory above
router = APIRouter(
    prefix="/serial",
    tags=['Serial']
)

@router.get("/")
def get_current_user(Authorize: AuthJWT = Depends()):

    Authorize.jwt_required()

    ser = serial.Serial()
    ser.baudrate = 115200
    ser.port = 'COM8'
    ser.timeout=None
    return ser.name

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    Authorize.jwt_required("websocket",websocket=websocket)
    current_user = Authorize.get_jwt_subject()
    get_logged_user = db.query(models.User).filter(models.User.id==current_user).first()
    
    print('Accepting client connection...')
    await websocket.accept()
    ser = serial.Serial()
    if ser.is_open == False:
        ser.baudrate = 115200
        ser.port = 'COM8'
        ser.timeout=None
        try:
            ser.open()
        except:
            await websocket.send_text("Failed to establish backend connection with serial device!")
    while True:
        try:
            await asyncio.sleep(0)
            x = ser.readline().decode('utf')
            await websocket.send_text(x)
        except Exception as e:
            print('error:', e)
            ser.close()
            break
    print('Bye..')
    ser.close()