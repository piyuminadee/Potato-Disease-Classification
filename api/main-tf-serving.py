from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import os
from PIL import Image
from io import BytesIO
import tensorflow as tf
from pathlib import Path
import requests

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

endpoint = "http://localhost:8606/v1/models/potato_model:predict"
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load your saved model
MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "2_model.keras"
MODEL = tf.keras.models.load_model(MODEL_PATH)  # Try .keras first

MODEL.save("potato_disease_model.keras")  # Keras native format
# OR
MODEL.export("potato_disease_savedmodel")  


print(f"Model exists: {os.path.exists(MODEL_PATH)}")

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

# Allow CORS (if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess_image(data: bytes) -> np.ndarray:
    
    image = np.array(Image.open(BytesIO(data)))
     
    return image
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
  image = preprocess_image(await file.read())
  img_batch = np.expand_dims(image, axis=0)
  
  json_data = {
         "instances": img_batch.tolist()
  }
  response = requests.post(endpoint, json=json_data)
  
  prediction = np.array(response.json()["predictions"][0])
  
  predicted_class = CLASS_NAMES[np.argmax(prediction)]
  confidence = np.max(prediction)
  
  return {
      'class':predicted_class,
      'confidence': float(confidence)
  }

@app.get("/ping")
async def ping():
    return {"status": "healthy"}