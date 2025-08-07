## shot & spot - AI-Powered Photo Analysis Project

shot & spot is a web-based photo analysis tool that allows users to upload images and automatically detect objects within them using AI. After signing up and logging in through a secure JWT authentication system, users can upload a photo, which is then sent to a Python backend. There, the image is analyzed using YOLOv8 and OpenCV to identify objects such as people, animals, or plants. The analysis results are sent back and displayed on the user interface. With its seamless integration of React (frontend), Spring Boot (API backend), and FastAPI (AI processing), this project demonstrates a full-stack application that combines user interaction with real-time AI-powered image recognition.

<img width="1919" height="863" alt="Ekran görüntüsü 2025-08-04 032707" src="https://github.com/user-attachments/assets/f39c7f7e-5b06-4c67-8008-a2b391cbb70f" />

## 🚀 Features

- ✅ JWT-based user authentication system
- 📸 Image upload and preview
- 🧠 YOLOv8-powered object detection
- 🔄 Simple interface with React frontend
- ☕ Robust API management with Spring Boot backend
- 🐍 Fast analysis with Python FastAPI + OpenCV/YOLO

## 🧰 Requirements

The following technologies must be installed on your system:

- Node.js and npm


- Python 3.9+
- Java 17+ (Java 11 is also acceptable)
- Maven
- Git
- pip (Python package manager)

## 🖥️ Installation and Running Steps

### 1. Frontend (React)

```bash
cd jwt-frontend
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass  # For Windows PowerShell permissions
npm install  # Run only once during initial setup
npm start    # Start the application


### 3. Backend (Spring Boot)
cd jwtbackend
mvn clean install       # Run this if it's your first time building
mvn spring-boot:run     # Start the backend API


### 4. Python Backend (YOLO + FastAPI)
cd python-backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000

🔐 User Authentication Flow
The user registers via the Sign Up page.
After registration, they log in via the Login page and receive a token.
The user is then redirected to the photo upload page.
The uploaded photo is analyzed, and object detection results are displayed.

