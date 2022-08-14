from pydantic import BaseSettings

#Using pydantic model to validate our envoirmental variables and typecast them to their respective types
#Envoirmental variables ar variables that are stored on my machine and can be read by applications
#If you create a model that inherits from BaseSettings, the model initialiser will attempt to determine the values of any fields not passed as keyword arguments by reading from the environment.
#We do all this and os envoirment variables because we don't wanna hard code our log in info 
class Setting(BaseSettings):
    database_hostname : str
    database_port : str
    database_password : str
    database_name : str
    database_username : str
    secret_key : str
    algorithm : str
    access_token_expire_time_minutes: int
    class Config:
        env_file = ".env"


settings = Setting()
print(settings.database_username)
