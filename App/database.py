from distutils.command.config import config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2  #This is used to connect to DB
from psycopg2.extras import RealDictCursor #This import should be used if we use different method to connect to Database
import time #This is used to use time function, such as sleep 
from .config import settings

SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}" #Have to provide 'postgresql//<user>/<password>@<ip-adress>:<port>/<database name>'

engine = create_engine(SQLALCHEMY_DATABASE_URL) #an Engine, which the Session will use for connection

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#This is method to connect to DataBase withouth using SQLalchemy
def connect_db_withoutSQLalchemy():
    while True: #We can use any true statement, While 2>1 would also work
        try:
            conn = psycopg2.connect("dbname = AmogusApp user = postgres password = IrisPseudacorus2020 ")# Connect to  postgres DB with method provided in documentation
            #conn = psycopg2.connect(host = 'localhost', database = 'AmogusApp', user = 'postgres', password = 'IrisPseudacorus2020', cursor_factory=RealDictCursor) #This method also can be used
            cursor = conn.cursor(cursor_factory=RealDictCursor) # Open a cursor to perform database operations to execute SQL statements | cursor_factory=RealDictCursor statement return the name of rows from DB, otherwise we get returns with no row names
            print("DataBase connection successfull")
            break #Break out of while loop if it is True else, continously loop till we connect to DB
        except Exception as error:
            print("Couldn't connect to DB", error)
            time.sleep(3)