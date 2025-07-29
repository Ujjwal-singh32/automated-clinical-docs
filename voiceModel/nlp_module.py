import spacy
import google.generativeai as genai
from datetime import datetime
import json
import re
# Load biomedical NER model
nlp = spacy.load("en_ner_bc5cdr_md")  # Make sure this is installed
genai.configure(api_key="AIzaSyBAUcrwMa7vatzC-fwIqVgMpGb9_7vr2rg")

def run_nlp_pipeline(english_text):
    combined_text = english_text.replace("\n", " ")
    doc = nlp(combined_text)

    grouped_entities = {}
    for ent in doc.ents:
        grouped_entities.setdefault(ent.label_, set()).add(ent.text)

    # ✅ Enhanced Prompt
    prompt = f"""
You are a professional medical assistant with strong clinical reasoning.

Your task is to extract structured information from the following doctor-patient conversation and medical entities. If any sentence seems incorrect or incomplete, **correct it using your medical knowledge and logic** before using it.

Return the final structured information in **valid JSON format** like this:

{{
  "symptoms": ["..."],
  "observations": ["..."],
  "prescription": ["..."],
  "remarks": "..."
}}

Input Conversation:
\"\"\"{english_text}\"\"\"

Extracted Medical Entities:
{grouped_entities}

Rules:
- Use only correct and relevant information, even if the original sentence is unclear or broken.
- Correct spelling or grammatical errors using context.
- Do NOT return explanations or any extra text — only the final JSON object.
- If any section has no valid info, return it as an empty list or empty string.
"""

    model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")
    response = model.generate_content(prompt)


# Insert this below:
    def extract_json_string(text):
        match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
        if match:
            return match.group(1).strip()
        return text.strip()  # fallback to original if no match

    try:
        cleaned_text = extract_json_string(response.text)
        structured_data = json.loads(cleaned_text)
        return structured_data
    except json.JSONDecodeError:
        return {"error": "Gemini did not return valid JSON", "raw": response.text.strip()}
