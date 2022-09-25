from fastapi import FastAPI, Depends, status, HTTPException, APIRouter, File, UploadFile, WebSocket, Query
import serial
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from sqlalchemy.orm import Session
from ..database import get_db #Import from current directory
from .. import models,schemas,utils #Single dot means from this directory double dots means from directory above
router = APIRouter(
    prefix="/serial",
    tags=['Serial']
)

@router.get("/")
def get_current_user(Authorize: AuthJWT = Depends()):

    Authorize.jwt_required()

    try:
        ser = serial.Serial('COM5')  # open serial port
        ser.close()
    except:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE)
    return ser

#Function that handles serial data 
def serial_connection():
    ser = serial.Serial('COM5')
    ser.close()
    return ser.name

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    Authorize.jwt_required("websocket",websocket=websocket)
    current_user = Authorize.get_jwt_subject()
    get_logged_user = db.query(models.User).filter(models.User.id==current_user).first()

    if get_logged_user.role == 'admin':
        await websocket.accept()

    #Trying to open websocket
    try:
        if get_logged_user.role == 'admin':

            #Try to send serial data, if not available send error text 
            try:
                await websocket.send_text(
                    serial_connection()
                )
            except:
                await websocket.send_text("Failed to establish sserial connection")

        else:
            await websocket.close()
            
    except AuthJWTException as err:
        await websocket.send_text(err.message)
        await websocket.close()