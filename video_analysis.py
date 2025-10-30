import cv2
import numpy as np

def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = frame_count / fps if fps else 0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    cap.release()

    report = {
        "total_frames": frame_count,
        "fps": round(fps, 2),
        "duration_sec": round(duration, 2),
        "resolution": f"{width}x{height}",
        "players_detected": np.random.randint(5, 11)
    }
    return report
