from pyexpat import model
from .. import models,schemas,oath2 #Single dot means from this directory double dots means from directory above
from fastapi import FastAPI, Depends, status, HTTPException, APIRouter
from typing import Optional, List
from sqlalchemy.orm import Session
from ..database import get_db #Import from current directory
from sqlalchemy import func
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException

router = APIRouter(
    prefix="/posts", #Every time insted of routing /posts/something, we just leave /somtehing and /posts will get added 
    tags=['Posts'] #Set the name of tag that  will be added to the OpenAPI schema and used by the automatic documentation interfaces:
)

save_amogus = [{"sussy:": "Walt", "baka":"White", "ajusnevarat":"hohoho", "meth" : "optional","id" : 0}]


#This function desplays all data that is in save_amogus list
@router.get("/all", response_model= List[schemas.PostOut]) #List[schemas.PostOut] we are specify that we want respone model to be a list and each element should be validated as our schema
async def get_all_amogus(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search : Optional[str] = "", Authorize: AuthJWT = Depends()): #Limit is query parameter, so we can limit how many rows we get in our response, by default it's 10
    #posts = db.query(models.PostSMTH).filter(models.PostSMTH.sussy.contains(search)).limit(limit).offset(skip).all()
    #Models.post will allow us to access that model and .all() will get all entries | .limit() will return limited amount of posts based on some criteria | Skip will skip the first posts by amount provided in skip variable
    #.filter(models.PostSMTH.sussy.contains(search)) will search our row's based on criteria that they have int title (sussy) some string search IMPORTANT: serach is case sensetive
    #posts_based_on_user = db.query(models.PostSMTH).filter(models.PostSMTH.user_id==current_user.id).all() #This will require us to be logged in and we'll see only logged in user's posts
    #print(current_user.email) #This returns current user's email from Users table
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    results = db.query(models.PostSMTH, func.count(models.Votes.post_id).label("likes")).join(models.Votes, models.Votes.post_id == models.PostSMTH.id, isouter = True).group_by(models.PostSMTH.id).filter(models.PostSMTH.Title.contains(search)).limit(limit).offset(skip).all()
    #We are quering amogus_table (post table) and joining it together with amogus_votes (votes) table based on if post id's match in both tables | Isouter defines that the join is LEFT OUTTER JOIN, by default it's LEFT INNER JOIN, then we are grouping together based on post_id and counting them
    #What filter does is explained in line 20
    return results

#Get all posts with SQl 
""""
    cursor.execute("SELECT * FROM amogus_table") #Query the database and obtain data as Python objects
    records = cursor.fetchall()
    return {"data": records} #Return all the posts from DB, prevousvly we used save_amogus instead of records to get everything in list
"""

#This function can post something to save_amogus list
@router.post("/", status_code=status.HTTP_201_CREATED, response_model= schemas.ResponsePost) #the status_code is the default when function succesfully completes it's task
def post_something(payLoad: schemas.Post, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()) : #We are putting into payLoad object class Post, which check the variables
    #Every time someone tries to access resource that requires them to be logged in we have to expect that they'll provide access token which has login info about the user, To create post there is now a dependency that requires users to be logged in
    #Depends(oath2.get_current_user) will return id
    #print(current_user.id)
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()

    new_post_amogus = models.PostSMTH(owner_id = current_user, **payLoad.dict())#Creating new post **payLoad(dict) is a kwarg when we can pass multiple arguments withouth writing each time title = payLoad.Something, database requires that user_id field is set, so this ensures that the user_id will be set automaticly without typing it in body
    db.add(new_post_amogus) #Adding it to database
    db.commit() #Commiting changes to DataBase
    db.refresh(new_post_amogus) #Retrieve that date we just created and store it in variable new_post_amogus

    return new_post_amogus
#
""""
    cursor.execute("INSERT INTO amogus_table (sussy, baka, ajusnevarat, published) VALUES (%s, %s, %s, %s) RETURNING *;", (payLoad.sussy, payLoad.baka, payLoad.ajusnevarat, payLoad.published)) #We have to do %s value because if we didn't we could be susceptible to SQL injection
    new_post = cursor.fetchone() #Fetch the recent change
    conn.commit() #Have to commit changes to DataBase when want to save data
    return {"data": new_post}
"""
    
#This is how to post something without using DB
""""
    payLoad_dict = payLoad.dict() #Get dictionary from json
    payLoad_dict["id"] = random.randrange(0, 100000) #generate random id for the new dictionary
    save_amogus.append(payLoad_dict)
    return  {"amogus ":payLoad_dict}
"""

#This is needed if we want to search through list, not database
""""
#This is function to get id
def get_ID(id : int):
    for x in save_amogus: #Start iterating through list which contains dictionaries
        if x["id"] == id: #if dictinary key value id has the same value as inputed id return it
            return x


#This is function how to get index of dictionary in list in different way
def find_amogs_index (id : int):
    for i, p in enumerate(save_amogus): #Check google to see what enumerate does
        if p['id'] == id:
            return i
"""

#This is function to get and display single data based on id 
@router.get("/{id}", response_model= schemas.PostOut) #Have to be careful because it is a string but needs to be a int| Respone model return our specified pydantic model 
def get_Amogus(id : int, db: Session = Depends(get_db)): # the :int will validate that the inserted variable (id) is a int and if it isn't it'll try to convert it to it

    #get_post_byID_query = db.query(models.PostSMTH).filter(models.PostSMTH.id==id) #.all() at the end would also work, but it would continou searching for another post with unique id and fast database resources\
    #get_post_byID = get_post_byID_query.first()

    results_query = db.query(models.PostSMTH, func.count(models.Votes.post_id).label("likes")).join(models.Votes, models.Votes.post_id == models.PostSMTH.id, isouter = True).group_by(models.PostSMTH.id).filter(models.PostSMTH.id ==id) #Filter at the end will make sure that we find the post with id that we have written in our url
    results = results_query.first()
    #We are quering amogus_table (post table) and joining it together with amogus_votes (votes) table based on if post id's match in both tables | Isouter defines that the join is LEFT OUTTER JOIN, by default it's LEFT INNER JOIN, then we are grouping together based on post_id and counting them
    if not results: #If post_with_id was not found raise exception
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found") #raise exception
    return results
#This is how to get post with id using SQL syntax
"""
    cursor.execute("SELECT * FROM amogus_table WHERE id = (%s)", (f"{id}", )) #We have to convert id to string because SQL needs string lol
    post_with_id = cursor.fetchone() #Fetch the recent change
    conn.commit()


    if not post_with_id: #If post_with_id was not found raise exception
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found") #raise exception
    return {"details" : post_with_id}
"""

#This is how to find post id without using DB
""""
    x = get_ID(id)
    if not x:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found") #raise exception
    return {"details" : x}
"""


#This function can delete data based on it's id code
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_amogus (id : int, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()

    post_query = db.query(models.PostSMTH).filter(models.PostSMTH.id==id)#Query the data based on id
    post_get_first = post_query.first() #Put into variable the queried row
    if not post_get_first: #If the row couldn't be found, that means that post with id was deleted or doesn't exist
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found or was already deleted") #raise exception
    if post_get_first.owner_id != current_user: #If the user_id in queried row isn't equall to current_user id that's logged in, raise error that action is forbidden
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"Not authorzied to delete")
    deleted_post = post_query.delete(synchronize_session=False) #delete the qureyied post
    db.commit() #Commit changes to database
    return deleted_post
    

#This is how to delete post using SQL syntax in VSCode
""""
    cursor.execute("DELETE FROM amogus_table WHERE id = (%s) RETURNING *;", (str(id),)) #after str(id) we have to put coma because it is expeting indexable object such as tuple, array... and int isn't indexable - Discord pinned for more info
    deleted_post_amogus = cursor.fetchone()
    conn.commit()
    if not deleted_post_amogus:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found or was already deleted") #raise exception
    return{"Deleted: ": deleted_post_amogus}
"""

    #These two methods below are how to delete post from list not DataBase
""""
    try:
        index = save_amogus.index(get_ID(id)) #Get index number that contains the dictionary with id that we want to delete from list
    except:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post not found") #raise exception 
    return {"removed item: ": save_amogus.pop(index) } #Remove the dictionary from list

"""

"""
    #The method below can be used aswell if we use find_amogs_index function with enumerator
    index = find_amogs_index(id)
    if index == None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post not found") #raise exception
    else:   
        return {"removed item: ": save_amogus.pop(index) } #Remove the dictionary from list
"""


#This function can update data based on id
@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED, response_model= schemas.ResponsePost)
def update_amogus (id : int, payLoad:schemas.Post, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()): #Previously is explanation what this does
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()

    update_post_query = db.query(models.PostSMTH).filter(models.PostSMTH.id==id) #Query all the rows and find where the inputed id is the same as id provided in databse
    update_post_get_first = update_post_query.first() #Store this row into a new variable
    if not update_post_get_first: #If we couldn't find row who's id's match
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post not found") #raise exception
    if update_post_get_first.owner_id != current_user: #Check if user_id asociated with post in our database is the same id, as current_user id
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail=f"Not authorzied to perform this action")
    update_post_query.update({**payLoad.dict()}, synchronize_session=False) #Update data
    db.commit()#Commit changes to database
    return update_post_get_first #Returns the updated data


#How to update post using SQL syntax
""""
    cursor.execute("UPDATE amogus_table SET sussy = %s, baka = %s, ajusnevarat = %s WHERE id = %s RETURNING * ;", (payLoad.sussy, payLoad.baka, payLoad.ajusnevarat, str(id), ))
    updated_amogus_post = cursor.fetchone()
    conn.commit()
    if not updated_amogus_post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post not found") #raise exception
    return {"Updated amogus xd: ": updated_amogus_post}
"""

    #Below method how to update list and not database
""""
    index = find_amogs_index(id) #We are getting index of the dictionary that contains our chosen id
    if index == None: #If it isn't valid id we raise an error
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Post not found") #raise exception
    payload_dict = payLoad.dict() #Converting the JSON file to python dictionary
    payload_dict['id'] = id #Setting key "id" to be value that is inputed for updating
    save_amogus[index] = payload_dict #Put the updated dictionary in the place in list where the previous unupdated dictionary was
    return {"new data" : save_amogus[index]}
"""
