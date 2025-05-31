from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import os
from PIL import Image
from io import BytesIO
import tensorflow as tf
from pathlib import Path

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load your saved model
MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "2_model.keras"
MODEL = tf.keras.models.load_model(MODEL_PATH)  # Try .keras first





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
  predictions = MODEL.predict(img_batch)
  predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
  confidence = np.max(predictions[0])
  return {
      'class':predicted_class,
      'confidence': float(confidence)
  }

@app.get("/ping")
async def ping():
    return {"status": "healthy"}