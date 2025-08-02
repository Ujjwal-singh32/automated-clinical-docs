from flask import Flask, request, send_file
from flask_cors import CORS
import threading
import numpy as np
import sounddevice as sd
import whisper
import time
from nlp_module import run_nlp_pipeline
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uuid
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

load_dotenv()
# Whisper model
model = whisper.load_model("base")

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")
# Config
SAMPLE_RATE = 16000
CHANNELS = 1

# Global state
is_listening = False
audio_buffer = []
recording_thread = None


def correct_transcript_with_gemini(raw_text):
    prompt = (
        "Correct the following medical transcription for spelling and terminology. "
        "Preserve the meaning and correct any misspelled drug or disease names:\n\n"
        f"{raw_text}"
    )
    try:
        response = gemini_model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        # print("❌ Gemini correction error:", e)
        return raw_text  # Fallback to original if correction fails


# Background audio recording thread
def record_audio():
    global is_listening, audio_buffer
    # print("🎤 Mic opened...")

    try:
        with sd.InputStream(
            samplerate=SAMPLE_RATE, channels=CHANNELS, dtype="float32"
        ) as stream:
            while is_listening:
                chunk, _ = stream.read(1024)
                audio_buffer.append(chunk)
    except Exception as e:
        print("❌ Recording Error:", e)

    # print("🛑 Mic closed.")


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
        full_audio = np.concatenate(audio_buffer, axis=0)
        full_audio = np.squeeze(full_audio)

        print("🧠 Transcribing...")

        try:
            result = model.transcribe(
                full_audio, fp16=False, language="hi", task="translate"
            )
            transcript = result["text"].strip()

            print("✅ Transcript:", transcript)

            corrected_transcript = correct_transcript_with_gemini(transcript)
            print("✅ Corrected Transcript:", corrected_transcript)

            # ✅ Send transcript directly to NLP pipeline
            soap_output = run_nlp_pipeline(corrected_transcript)

            return {
                "status": "recording stopped and transcribed",
                "transcript": transcript,
                "soap_notes": soap_output,  # You can send this back if needed
            }, 200

        except Exception as e:
            print("❌ Transcription failed:", e)
            return {"status": "error", "error": str(e)}, 500

    return {"status": "not recording"}, 400

@app.get("/")
def index():
    return {"status": "Model is running ✅"}, 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(host="0.0.0.0", port=port)