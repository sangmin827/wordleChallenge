from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
def sayHello():
  return{"message": "hi"}


@app.get("/")
def sayWelcom():
  return {"message":"환영합니다!"}