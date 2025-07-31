import spacy
import google.generativeai as genai
import json
import re
import os
from dotenv import load_dotenv

# Load biomedical NER model
load_dotenv()
nlp = spacy.load("en_ner_bc5cdr_md")
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def run_nlp_pipeline(english_text):
    combined_text = english_text.replace("\n", " ")
    doc = nlp(combined_text)

    grouped_entities = {}
    for ent in doc.ents:
        grouped_entities.setdefault(ent.label_, set()).add(ent.text)

    # 🔁 Revised Prompt to limit output to 4 keys
    prompt = f"""
You are an intelligent medical assistant. Your job is to extract structured medical information from the following doctor-patient conversation and extracted medical entities.

Only return a JSON with the following **4 fields**:
{{
  "symptoms": [...],           ← Symptoms or patient complaints
  "observations": [...],       ← Any clinical findings, vitals, or tests discussed
  "prescription": [...],       ← Medicines prescribed + suggest important missing medicines or tests if needed
  "remarks": "..."             ← A short reasoning, advice, or warning
}}

🔍 Rules:
- You may **suggest 1 or 2 missing but important medicines or tests** if clearly relevant. Add them to `"prescription"`.
- Use `"remarks"` to explain or add advice if needed.
- Do NOT include anything irrelevant or excessive.
- If a section has no data, return an empty list `[]` or empty string `""`.
- Respond with **only** valid JSON — no explanation or formatting like code blocks.

Conversation:
\"\"\"{english_text}\"\"\"

Extracted Medical Entities:
{grouped_entities}
"""

    model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")
    response = model.generate_content(prompt)

    # Extract raw JSON from Gemini response
    def extract_json_string(text):
        match = re.search(r"\{.*\}", text, re.DOTALL)
        return match.group(0).strip() if match else text.strip()

    try:
        cleaned_text = extract_json_string(response.text)
        structured_data = json.loads(cleaned_text)
        return structured_data
    except json.JSONDecodeError:
        return {
            "error": "Gemini did not return valid JSON",
            "raw": response.text.strip(),
        }
