import json
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import PromptTemplate

from dotenv import load_dotenv

load_dotenv()

def load_properties():
    with open("data/properties.json", "r") as f:
        return json.load(f)

def build_documents(properties):
    docs = []
    for p in properties:
        content = f"""
        Name: {p['name']}
        Location: {p['location']}, {p['city']}, {p['country']}
        Type: {p['type']}
        Price: ${p['price_per_night']} per night
        Rating: {p['rating']} ({p['review_count']} reviews)
        Tags: {', '.join(p['tags'])}
        Amenities: {', '.join(p['amenities'])}
        Guests: up to {p['max_guests']} | Bedrooms: {p['bedrooms']} | Bathrooms: {p['bathrooms']}
        Free Cancellation: {'Yes' if p['free_cancellation'] else 'No'}
        Pet Friendly: {'Yes' if p['pet_friendly'] else 'No'}
        Unique Stay: {'Yes' if p['unique_stay'] else 'No'}
        Description: {p['description']}
        """
        docs.append(Document(
            page_content=content,
            metadata={
                "id": p["id"],
                "name": p["name"],
                "price": p["price_per_night"],
                "city": p["city"]
            }
        ))
    return docs

def build_rag_chain():
    properties = load_properties()
    documents = build_documents(properties)

    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(documents, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    prompt = PromptTemplate(
        input_variables=["context", "input"],
        template="""
        You are Price Point, a friendly AI travel assistant that helps users find the perfect place to stay.

        Based on the following available properties:
        {context}

        Answer the user's request: {input}

        Recommend the best matches, explain why each suits their needs, and mention the price and key highlights.
        Keep your tone warm, concise, and helpful.
        """
    )

    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.7)

    combine_docs_chain = create_stuff_documents_chain(llm, prompt)
    chain = create_retrieval_chain(retriever, combine_docs_chain)

    return chain

rag_chain = build_rag_chain()