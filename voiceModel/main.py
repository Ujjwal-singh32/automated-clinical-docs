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
from scipy.io.wavfile import write

app = Flask(__name__)
CORS(app)

r = sr.Recognizer()
transcript_lines = []
is_listening = False
listener_thread = None

audio_queue = queue.Queue()


def audio_callback(indata, frames, time_info, status):
    audio_queue.put(indata.copy())


def continuous_listen():
    global is_listening

    samplerate = 16000  # 16kHz sampling rate
    channels = 1

    with sd.InputStream(
        callback=audio_callback, channels=channels, samplerate=samplerate
    ):
        print("🎙️ Continuous mic started...")

        while is_listening:
            frames = []

            start_time = time.time()
            while time.time() - start_time < 3:
                try:
                    data = audio_queue.get(timeout=3)
                    frames.append(data)
                except queue.Empty:
                    print("⏱️ No audio chunk in queue")
                    break

            if frames:
                audio_data = np.concatenate(frames)
                audio_bytes = (audio_data * 32767).astype(np.int16).tobytes()

                audio_sr = sr.AudioData(audio_bytes, samplerate, 2)
                try:
                    print("🔍 Recognizing...")
                    text = r.recognize_google(audio_sr, language="hi-IN")
                    translated = GoogleTranslator(source="auto", target="en").translate(
                        text
                    )
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
    global is_listening, listener_thread

    if not is_listening:
        is_listening = True
        listener_thread = threading.Thread(target=continuous_listen)
        listener_thread.start()
        print("🎤 Microphone is now actively listening every 5 seconds...")

    return "Recording started", 200


@app.post("/stop")
def stop_recording():
    global is_listening, transcript_lines

    is_listening = False

    if listener_thread:
        print("🕒 Waiting 5 seconds to finalize any remaining audio...")
        time.sleep(5)  # Give time for the listener to finish
        listener_thread.join()

    final_transcript = "\n".join(transcript_lines)
    print("📄 Final Transcript:\n", final_transcript)

    run_nlp_pipeline(final_transcript)
    transcript_lines = []

    return "Recording stopped and PDF generated", 200


if __name__ == "__main__":
    app.run(port=5000)
