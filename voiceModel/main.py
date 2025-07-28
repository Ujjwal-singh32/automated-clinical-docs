from flask import Flask
from flask_cors import CORS  # ✅ NEW
import threading
import speech_recognition as sr
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)  # ✅ Allow all origins by default

r = sr.Recognizer()
r.pause_threshold = 2.0

is_listening = False
listener_thread = None

def listen_and_translate():
    global is_listening
    while is_listening:
        try:
            with sr.Microphone() as source:
                r.adjust_for_ambient_noise(source)
                print("Listening...")
                audio = r.listen(source, phrase_time_limit=300)

                mixed_text = r.recognize_google(audio, language='hi-IN')
                translated_text = GoogleTranslator(source='auto', target='en').translate(mixed_text)

                with open("translated_transcript.txt", "a", encoding="utf-8") as file:
                    file.write(translated_text + "\n")

        except sr.UnknownValueError:
            pass
        except sr.RequestError:
            print("Network error.")

@app.post("/start")
def start_recording():
    global is_listening, listener_thread
    if not is_listening:
        is_listening = True
        listener_thread = threading.Thread(target=listen_and_translate)
        listener_thread.start()
    return "Recording started", 200

@app.post("/stop")
def stop_recording():
    global is_listening
    is_listening = False
    return "Recording stopped", 200

if __name__ == "__main__":
    app.run(port=5000)
