# Potato Disease Classification System 🌱🔍

## Demo Video
![Demo GIF](https://github.com/piyuminadee/Potato-Disease-Classification/raw/4e18e4ebb9e2244dc6a5aeebf1f91a279b62ac35/Screen%20Recording%20(6-2-2025%204-25-19%20PM).gif)

## 🌟 Project Overview
...
*Demonstration of real-time potato disease classification with 98.5% accuracy*

This project implements a CNN-based solution for detecting potato diseases (Early Blight, Late Blight) with 96% accuracy. Developed as a practical implementation of my research on "Applying Machine Learning to Agriculture in Sri Lanka: Challenges and Outcomes", it addresses critical challenges in smallholder farming by providing real-time disease diagnostics.


## 🚀 Key Features
- Accurate Disease Detection: CNN model with 98.5% validation accuracy
- Real-time Prediction: <3 second response time
- Farmer-Friendly Interface: Simple image upload and clear results
- Full-stack Architecture: From data processing to web deployment
- Optimized for Edge Devices: Model quantization for mobile use

 ## 🧩 Technology Stack
Component	Technology
<hr>
Deep Learning	TensorFlow, Keras
<hr>
Backend API	FastAPI, Python 3.9
<hr>
Frontend	React, Material-UI
<hr>
Model Serving	TensorFlow Serving, Docker
<hr>

## 📊 Dataset
The model was trained on 3,152 potato leaf images from the <a href="https://www.kaggle.com/datasets/arjuntejaswi/plant-village"> PlantVillage Dataset </a>  with custom augmentations for Sri Lankan growing conditions:

## 🛠 Installation
Backend Setup
# Clone repository
git clone https://github.com/piyuminadee/Potato-Disease-Classification.git <br>
cd api

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main-tf-serving:app --reload

Frontend Setup
<br>cd frontend

# Install dependencies
npm install --from-lock-json     

# Start development server
npm run start  

Model Serving with Docker
- docker build -t my-tf-serving   
- docker run -it --rm `-v "D:\My-Code\MlProjects\potato_desease\models\potato_disease_savedmodel:/models/potato_model/1" `-p 8606:8501 `tensorflow/serving:2.14.0 `--model_name=potato_model `--model_base_path=/models/potato_model

## 📚 Research Connection
This project implements Section 2.2 ("Machine Learning in Agricultural Prediction/Detection") from my research paper:
"Applying Machine Learning to Agriculture in Sri Lanka: Challenges and Outcomes"
<a href="https://www.researchgate.net/publication/392032815_Applying_Machine_Learning_to_Agriculture_Review_for_Challenges_and_Outcome"> ResearchGate Link </a>

## Empowering farmers through AI - One leaf at a time! 🥔🔬
