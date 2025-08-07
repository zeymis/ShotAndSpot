from PIL import Image
from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile
from collections import Counter
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme aşamasında "*" kullanabilirsin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

general_model = YOLO('yolov8n.pt')

@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...)):
    contents = await image.read()
    pil_img = Image.open(io.BytesIO(contents)).convert("RGB")

    results_general = general_model(pil_img)

    names_general = results_general[0].names
    classes_general = [names_general[int(cls)] for cls in results_general[0].boxes.cls]
    counts_general = dict(Counter(classes_general))

    return {
        "general_model": [{"name": k, "count": v} for k, v in counts_general.items()]
    }


