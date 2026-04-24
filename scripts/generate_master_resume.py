import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.generate_tailored_profile import _render_resume_markdown

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(root, 'data', 'master_resume.json')
    md_path = os.path.join(root, 'public', 'Josef_Doornink_Resume.md')
    pdf_path = os.path.join(root, 'public', 'Josef_Doornink_Resume.pdf')

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    md_content = _render_resume_markdown(data)
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(md_content)
    print(f"[+] Resume markdown: {md_path}")

    convert_script = os.path.join(root, 'convert_to_pdf.py')
    os.system(f"python \"{convert_script}\" \"{md_path}\" \"{pdf_path}\"")
    print(f"[+] Resume PDF: {pdf_path}")

if __name__ == "__main__":
    main()
