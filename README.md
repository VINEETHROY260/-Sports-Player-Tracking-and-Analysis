# Sports Person Tracking and Analysis

This Flask app allows you to upload a sports video and generates a basic analysis report.

## 🚀 How to Run Locally

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the app:
   ```bash
   python app.py
   ```
3. Open http://127.0.0.1:5000 and upload a video.

## 🌐 Deploy on Render

1. Push this folder to a GitHub repo.
2. Go to [https://render.com](https://render.com) → New Web Service.
3. Connect your repo and set:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
4. Click **Deploy**.
