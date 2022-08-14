from .. import models,schemas,utils, oath2 #Single dot means from this directory double dots means from directory above
from fastapi import FastAPI, Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from ..database import get_db #Import from current directory

router = APIRouter(
    prefix="/vote",
    tags=['Vote']#Set the name of tag that  will be added to the OpenAPI schema and used by the automatic documentation interfaces:
) #Create API router that allows it to split it between different files

#Method for liking a post
@router.post("/",status_code=status.HTTP_201_CREATED)
def vote_post(vote: schemas.Vote ,current_user : int = Depends(oath2.get_current_user), db: Session = Depends(get_db)):

    vote_query = db.query(models.Votes).filter(models.Votes.post_id == vote.post_id, models.Votes.user_id == current_user.id) #This will query the Vote table and check if this specific user, that's logged in has liked post
    vote_found = vote_query.first() #Try to find post, if this returns None that means the user hasn't liked post yet and we can add it to our vote table
    if vote.vote_dir == 1: #If vote direction is set to 1, which means LIKE
        if vote_found == None: #If we didn't find in our vote table that user has liked specific post
            if db.query(models.PostSMTH).filter(models.PostSMTH.id == vote.post_id).first() == None: #if we find that the specific post in our post table (amogus_table) DOES exist then do something
                #While testing if we didn't speficiy everything after and statment, then we could try to like post that doesn't exist and we'd get an internal server error
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post not found")

            vote_add = models.Votes(user_id = current_user.id, post_id = vote.post_id) #add vote
            db.add(vote_add)
            db.commit()
        else:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"user {current_user.email} has already liked the post {vote.post_id}")
        return {"Post liked"}
    else:
        if vote_found != None: #If we found a post, delete it
            vote_query.delete(synchronize_session=False)
            db.commit()
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user {current_user.email} hasn't liked the post")
        return {"Post disliked"}
