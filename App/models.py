from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from .database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

#This model is responsible how will our table look
#SQLalchemy will check if tablename table exists in our database, and if yes then ignore, if no, then it'll create new table with that name

#If we want to add new columns to our tables we can do using Alembic autogenerate features
class PostSMTH(Base):
    __tablename__ = "amogus_table" #Define class name

    id = Column(Integer, primary_key = True, nullable = False)
    sussy = Column(String, nullable = False)
    baka = Column(String, nullable = False)
    ajusnevarat = Column(Integer, nullable = False)
    published = Column(Boolean, nullable = False, server_default = 'true')
    created_at = Column(TIMESTAMP(timezone=True), nullable = False, server_default = text('now()'))
    meth = Column(Integer, nullable = True)
    owner_id = Column(Integer, ForeignKey("amogus_users.id", ondelete="CASCADE"), nullable = False) #Ondelete cascade means that if user is deleted, all the posts asociated with the user will be deleted

    owner = relationship("User") #Relationship says SQL alchemy to fetch some data based on relationship. Basicly right now when we reference in our schema this new variable owner, it will get every data asociated with model User
    #So we are fetching from User class which is below us, email, password, id, created_at

class User(Base):
    __tablename__ = "amogus_users" #Define new table name

    email = Column(String, nullable = False, unique = True) #Unique means that email needs to be unique for different users
    password = Column(String, nullable = False)
    id = Column(Integer, primary_key = True, nullable = False)
    created_at = Column(TIMESTAMP(timezone=True), nullable = False, server_default = text('now()'))

class Votes(Base):
    __tablename__ = "amogus_votes"

    #Create composit key that will allow only one post be liked by one specific user, basicly two rows will be primary key's
    post_id = Column(Integer,ForeignKey("amogus_table.id", ondelete="CASCADE"), primary_key = True)
    user_id = Column(Integer,ForeignKey("amogus_users.id", ondelete="CASCADE"), primary_key = True)