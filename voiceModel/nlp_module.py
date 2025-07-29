import spacy
import google.generativeai as genai
from reportlab.pdfgen import canvas
from datetime import datetime

# Load biomedical NER model
nlp = spacy.load("en_ner_bc5cdr_md")  # Make sure this is installed
genai.configure(api_key="AIzaSyBAUcrwMa7vatzC-fwIqVgMpGb9_7vr2rg")

def run_nlp_pipeline(english_text):
    combined_text = english_text.replace("\n", " ")
    doc = nlp(combined_text)

   # Step 2: Combine text
    combined_text = english_text.replace("\n", " ")

    # Step 3: Extract medical entities
    doc = nlp(combined_text)

    grouped_entities = {}
    for ent in doc.ents:
        grouped_entities.setdefault(ent.label_, set()).add(ent.text)

    prompt = f"""You are a professional medical assistant helping summarize clinical conversations.

Given the following doctor-patient conversation and extracted medical entities, generate a medical report strictly in SOAP format:

Conversation:
{english_text}

Extracted Entities:
{grouped_entities}

Follow this format exactly:

SOAP Notes:
S (Subjective - patient's reported symptoms):
- [List symptoms in short bullet points]

O (Objective - doctor's observations and examination results):
- [Findings from doctor's side like throat red, fever etc.]

A (Assessment - diagnosis):
- [Clear diagnosis. If not explicitly stated, derive it from symptoms.]

P (Plan - prescriptions, tests advised, precautions):
- Medications Prescribed:
  - [e.g., Azithromycin 500 mg – once daily for 3 days]
  - ...
- Tests Advised:
  - [If mentioned. Else, leave blank.]
- Precautions:
  - [List if explicitly mentioned. If not mentioned and diagnosis is given, generate standard 2–3 lines of medical precautions for that condition.]

Rules:
- Do NOT use words like 'likely', 'possibly', or 'not provided'.
- Keep it professional and clean — this will go into a real doctor's report.
"""

    model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")
    response = model.generate_content(prompt)
    gemini_output = response.text.strip()

    generate_medical_pdf(gemini_output)

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import black, grey
from datetime import datetime

def generate_medical_pdf(output_text, filename="Medical_Report.pdf"):
    c = canvas.Canvas(filename, pagesize=A4)
    width, height = A4
    x_margin = 50
    y = height - 60

    # Title
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(width / 2, y, "AI-Generated Medical Report")

    # Date
    y -= 25
    c.setFont("Helvetica", 10)
    c.drawRightString(width - x_margin, y, datetime.now().strftime("%d %b %Y, %I:%M %p"))

    # Subtitle
    y -= 30
    c.setFont("Helvetica-Bold", 12)
    c.drawString(x_margin, y, "Doctor-Patient Summary")

    y -= 25
    c.setFont("Helvetica", 11)

    # Process lines
    lines = output_text.strip().splitlines()
    indent = 20

    for line in lines:
        stripped = line.strip()

        # Handle page break
        if y < 80:
            c.showPage()
            y = height - 60
            c.setFont("Helvetica", 11)

        # Detect section headers
        if stripped.startswith("SOAP Notes"):
            y -= 15
            c.setFont("Helvetica-Bold", 13)
            c.drawString(x_margin, y, stripped)
            y -= 10
            c.setStrokeColor(grey)
            c.line(x_margin, y, width - x_margin, y)
            y -= 15

        elif any(stripped.startswith(prefix) for prefix in ["S (", "O (", "A (", "P ("]):
            y -= 20
            c.setFont("Helvetica-Bold", 12)
            c.drawString(x_margin, y, stripped)
            y -= 10
            c.setStrokeColor(black)
            c.line(x_margin, y, width - x_margin, y)
            y -= 10

        elif stripped.startswith("Medications Prescribed"):
            y -= 20
            c.setFont("Helvetica-Bold", 11)
            c.drawString(x_margin + 10, y, "Medications Prescribed:")
            y -= 10
            c.setStrokeColor(grey)
            c.line(x_margin + 10, y, width - x_margin, y)
            y -= 10

        elif stripped.startswith("Tests Advised"):
            y -= 20
            c.setFont("Helvetica-Bold", 11)
            c.drawString(x_margin + 10, y, "Tests Advised:")
            y -= 10
            c.setStrokeColor(grey)
            c.line(x_margin + 10, y, width - x_margin, y)
            y -= 10

        elif stripped.startswith("Precautions"):
            y -= 20
            c.setFont("Helvetica-Bold", 11)
            c.drawString(x_margin + 10, y, "Precautions:")
            y -= 10
            c.setStrokeColor(grey)
            c.line(x_margin + 10, y, width - x_margin, y)
            y -= 10

        elif stripped.startswith("- "):
            c.setFont("Helvetica", 11)
            c.drawString(x_margin + indent, y, stripped)
            y -= 16
        else:
            c.setFont("Helvetica", 11)
            c.drawString(x_margin, y, stripped)
            y -= 16

    c.save()
    print(f"\n✅ PDF generated and saved as: {filename}")