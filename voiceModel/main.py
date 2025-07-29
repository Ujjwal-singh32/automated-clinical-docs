from flask import Flask
from flask_cors import CORS
import threading
import queue
import time
import numpy as np
import sounddevice as sd
import speech_recognition as sr
from deep_translator import GoogleTranslator
from nlp_module import run_nlp_pipeline
from collections import deque

app = Flask(__name__)
CORS(app)

r = sr.Recognizer()
transcript_lines = []
is_listening = False
listener_thread = None
processor_thread = None

# Deque for rolling audio buffer
audio_buffer = deque()
buffer_lock = threading.Lock()

samplerate = 16000  # 16kHz
channels = 1
chunk_duration = 0.1  # 100ms per chunk
chunk_samples = int(samplerate * chunk_duration)

max_buffer_seconds = 6  # keep 6 seconds rolling audio
max_chunks = int(max_buffer_seconds / chunk_duration)


def audio_callback(indata, frames, time_info, status):
    with buffer_lock:
        audio_buffer.append(indata.copy())
        if len(audio_buffer) > max_chunks:
            audio_buffer.popleft()


def audio_processor():
    global is_listening
    print("🧠 Audio processor started...")
    while is_listening:
        time.sleep(3)  # process every 3 seconds
        with buffer_lock:
            if len(audio_buffer) < int(3 / chunk_duration):
                continue  # not enough data
            recent_audio = list(audio_buffer)[-int(3 / chunk_duration):]

        audio_data = np.concatenate(recent_audio)
        audio_bytes = (audio_data * 32767).astype(np.int16).tobytes()

        try:
            audio_sr = sr.AudioData(audio_bytes, samplerate, 2)
            print("🔍 Recognizing...")
            text = r.recognize_google(audio_sr, language="hi-IN")
            translated = GoogleTranslator(source="auto", target="en").translate(text)
            print("📄 Translated:", translated)
            transcript_lines.append(translated)
        except sr.UnknownValueError:
            print("❌ Could not understand audio")
        except sr.RequestError:
            print("❌ API unavailable")
        except Exception as e:
            print("❌ Error:", e)


@app.post("/start")
def start_recording():
    global is_listening, listener_thread, processor_thread

    if not is_listening:
        is_listening = True
        audio_buffer.clear()
        listener_thread = threading.Thread(
            target=sd.InputStream,
            kwargs={
                "callback": audio_callback,
                "channels": channels,
                "samplerate": samplerate,
                "blocksize": chunk_samples,
            },
            daemon=True,
        )
        processor_thread = threading.Thread(target=audio_processor, daemon=True)

        listener_thread.start()
        processor_thread.start()

        print("🎤 Microphone is now listening continuously...")

    return "Recording started", 200


@app.post("/stop")
def stop_recording():
    global is_listening, transcript_lines

    is_listening = False
    time.sleep(4)  # Let last chunk finish
    final_transcript = "\n".join(transcript_lines)
    print("📄 Final Transcript:\n", final_transcript)

    run_nlp_pipeline(final_transcript)
    transcript_lines = []

    return "Recording stopped and PDF generated", 200


if __name__ == "__main__":
    app.run(port=5000)
