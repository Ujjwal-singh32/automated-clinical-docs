from flask import Flask
from flask_cors import CORS
import threading
import numpy as np
import sounddevice as sd
import whisper
import time
from nlp_module import run_nlp_pipeline

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Whisper model
model = whisper.load_model("base")

# Config
SAMPLE_RATE = 16000
CHANNELS = 1

# Global state
is_listening = False
audio_buffer = []
recording_thread = None


# Background audio recording thread
def record_audio():
    global is_listening, audio_buffer
    print("🎤 Mic opened...")

    try:
        with sd.InputStream(
            samplerate=SAMPLE_RATE, channels=CHANNELS, dtype="float32"
        ) as stream:
            while is_listening:
                chunk, _ = stream.read(1024)
                audio_buffer.append(chunk)
    except Exception as e:
        print("❌ Recording Error:", e)

    print("🛑 Mic closed.")


@app.post("/start")
def start_recording():
    global is_listening, recording_thread, audio_buffer

    if not is_listening:
        is_listening = True
        audio_buffer = []
        recording_thread = threading.Thread(target=record_audio)
        recording_thread.start()
        print("▶️ Recording started")

    return {"status": "recording started"}, 200


@app.post("/stop")
def stop_recording():
    global is_listening, recording_thread, audio_buffer

    if is_listening:
        is_listening = False
        recording_thread.join()

        print("⏳ Waiting 5 seconds to ensure all audio is captured...")
        time.sleep(5)

        full_audio = np.concatenate(audio_buffer, axis=0)
        full_audio = np.squeeze(full_audio)

        print("🧠 Transcribing...")

        try:
            result = model.transcribe(
                full_audio, fp16=False, language="hi", task="translate"
            )
            transcript = result["text"].strip()

            print("✅ Transcript:", transcript)

            # ✅ Send transcript directly to NLP pipeline
            soap_output = run_nlp_pipeline(transcript)

            return {
                "status": "recording stopped and transcribed",
                "transcript": transcript,
                "soap_notes": soap_output,  # You can send this back if needed
            }, 200

        except Exception as e:
            print("❌ Transcription failed:", e)
            return {"status": "error", "error": str(e)}, 500

    return {"status": "not recording"}, 400


if __name__ == "__main__":
    app.run(port=5000)
