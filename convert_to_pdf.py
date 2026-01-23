#!/usr/bin/env python3
import markdown
from weasyprint import HTML, CSS
from pathlib import Path

def convert_md_to_pdf(md_file, pdf_file):
    """Convert a markdown file to PDF with styling"""
    
    # Read markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content, extensions=['extra', 'nl2br'])
    
    # Add CSS styling for professional resume
    styled_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            @page {{
                size: letter;
                margin: 0.5in;
            }}
            body {{
                font-family: 'Calibri', 'Arial', sans-serif;
                font-size: 11pt;
                line-height: 1.4;
                color: #333;
            }}
            h1 {{
                font-size: 24pt;
                margin-bottom: 5px;
                color: #1a1a1a;
                border-bottom: 3px solid #18BC9C;
                padding-bottom: 5px;
            }}
            h2 {{
                font-size: 14pt;
                margin-top: 15px;
                margin-bottom: 8px;
                color: #18BC9C;
                border-bottom: 1px solid #ddd;
                padding-bottom: 3px;
            }}
            h3 {{
                font-size: 12pt;
                margin-top: 10px;
                margin-bottom: 5px;
                color: #2C3E50;
            }}
            p {{
                margin: 5px 0;
            }}
            ul {{
                margin: 5px 0;
                padding-left: 20px;
            }}
            li {{
                margin: 3px 0;
            }}
            strong {{
                color: #2C3E50;
            }}
            a {{
                color: #18BC9C;
                text-decoration: none;
            }}
            hr {{
                border: none;
                border-top: 1px solid #ddd;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # Convert HTML to PDF
    HTML(string=styled_html).write_pdf(pdf_file)
    print(f"Created: {pdf_file}")

# Convert both resumes
resume_dir = Path(__file__).parent / "Resume"

convert_md_to_pdf(
    resume_dir / "resume9-1page.md",
    resume_dir / "resume9-1page.pdf"
)

convert_md_to_pdf(
    resume_dir / "resume9-Full.md",
    resume_dir / "resume9-Full.pdf"
)

print("\n✅ PDF conversion complete!")
