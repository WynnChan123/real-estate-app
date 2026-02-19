#Create the FastAPI app and define the endpoint for answering queries

from fastapi import FastAPI     # type: ignore
from pydantic import BaseModel    # type: ignore
from rag import rag_chain
from fastapi.middleware.cors import CORSMiddleware   # type: ignore

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    message: str
    chatHistory: list = []

@app.get("/")
async def root():
    return {"status": "ok"}


@app.post("/query")
async def answer_query(request: QueryRequest):
    query = request.message
    chat_history = request.chatHistory
    response = rag_chain.invoke({"input": query, "chat_history": chat_history})
    return {"response": response["answer"]}

