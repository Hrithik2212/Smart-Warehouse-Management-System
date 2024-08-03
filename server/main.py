from fastapi import FastAPI
from server.routes import userRoutes
app = FastAPI()


app.include_router(userRoutes.router)







