from flask import Flask, render_template, request
import os
from video_analysis import analyze_video

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def home():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return "No file uploaded", 400
    file = request.files['video']
    if file.filename == '':
        return "No selected file", 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    report = analyze_video(filepath)
    return render_template('report.html', report=report, filename=file.filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
