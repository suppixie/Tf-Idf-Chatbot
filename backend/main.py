import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from service import fetch_results

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/query")
def login(query: str):
    return fetch_results(query)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
