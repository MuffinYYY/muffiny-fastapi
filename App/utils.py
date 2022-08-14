from passlib.context import CryptContext #This is needed for password hashing

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #We are tellinng passlib what is the default hashing algorithm, hashing is basicly converting our data string to some random strings that work just one way, you can't convert hash back to password

def hash(password : str):
    hashed_password = pwd_context.hash(password)#Hash the password to random strings that later can't be converted back to password but password can be converted to those random strings
    return hashed_password

def verify(typedpassword, hashedpassword):
    return pwd_context.verify(typedpassword, hashedpassword) #Verify the password typedpassword is the one the user wrote and hashedpassword is the one in database
