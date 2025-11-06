from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://10.43.153.182:4028",
    "http://localhost:4028",
    "http://127.0.0.1:4028",
    "https://stylemind6345back.builtwithrocket.new",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Changed to True to allow credentials
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Load data
product_data = pd.read_json("new.json")
product_data["combined"] = product_data["category"]  + " " + product_data["brand"] + " " + product_data["occasion"]

vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(product_data["combined"])
similarity_matrix = cosine_similarity(tfidf_matrix)

class RecommendRequest(BaseModel):
    item_name: str

@app.post("/recommend")
def recommend(request: RecommendRequest):
    item = request.item_name
    if item not in product_data["name"].values:
        return {"error": "Item not found"}

    idx = product_data[product_data["name"] == item].index[0]
    scores = list(enumerate(similarity_matrix[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    top_items = [product_data.iloc[i[0]].to_dict() for i in scores[1:6]]

    return {"recommendations": top_items}


# recommendation = recommend(RecommendRequest(item_name="Cable Knit Sweater"))  # Test the endpoint
# print(recommendation)