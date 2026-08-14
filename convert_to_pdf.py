#!/usr/bin/env python3
import html
import re
from pathlib import Path

import markdown
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import CondPageBreak, HRFlowable, PageBreak, Paragraph, SimpleDocTemplate, Spacer


def clean_text(text):
    replacements = {
        '—': '-',
        '–': '-',
        '→': '->',
    }
    for src, dest in replacements.items():
        text = text.replace(src, dest)
    return text.strip()


def inline_markdown_to_html(text):
    text = text.strip()
    if not text:
        return ''

    text = clean_text(text)
    html_fragment = markdown.markdown(text, extensions=['extra'])

    if html_fragment.startswith('<p>') and html_fragment.endswith('</p>'):
        html_fragment = html_fragment[3:-4]

    html_fragment = re.sub(r'<(?!/?(b|strong|i|em|a|u|br)\b)', '&lt;', html_fragment)
    return html_fragment


def convert_md_to_pdf(md_file, pdf_file):
    """Convert markdown resume to a modern, downloadable PDF."""

    with open(md_file, 'r', encoding='utf-8') as f:
        lines = [clean_text(line) for line in f.readlines()]

    doc = SimpleDocTemplate(
        str(pdf_file),
        pagesize=letter,
        leftMargin=0.45 * inch,
        rightMargin=0.45 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch,
    )

    styles = getSampleStyleSheet()
    normal = ParagraphStyle(
        'ResumeNormal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor('#333333'),
        wordWrap='CJK',
        spaceAfter=1,
    )
    h1 = ParagraphStyle(
        'ResumeH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=20,
        textColor=colors.HexColor('#1a1a1a'),
        alignment=TA_CENTER,
        spaceAfter=2,
    )
    subtitle = ParagraphStyle(
        'ResumeSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#2C3E50'),
        alignment=TA_CENTER,
        spaceAfter=1,
    )
    contact = ParagraphStyle(
        'ResumeContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#4a4a4a'),
        alignment=TA_CENTER,
        spaceAfter=2,
    )
    h2 = ParagraphStyle(
        'ResumeH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=colors.HexColor('#1a1a1a'),
        spaceBefore=6,
        spaceAfter=2,
    )
    h3 = ParagraphStyle(
        'ResumeH3',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor('#1a1a1a'),
        spaceBefore=4,
        spaceAfter=1,
    )
    bullet = ParagraphStyle(
        'ResumeBullet',
        parent=normal,
        leftIndent=9,
        firstLineIndent=-6,
        spaceAfter=1,
    )

    story = []
    in_header_block = True

    for line in lines:
        if not line:
            story.append(Spacer(1, 2))
            continue

        if line == '---':
            story.append(HRFlowable(width='100%', thickness=0.5, color=colors.HexColor('#d7d7d7')))
            story.append(Spacer(1, 3))
            in_header_block = False
            continue

        if line.startswith('# '):
            story.append(Paragraph(inline_markdown_to_html(line[2:]), h1))
            continue

        if in_header_block and line.startswith('**') and line.endswith('**'):
            story.append(Paragraph(inline_markdown_to_html(line[2:-2]), subtitle))
            continue

        if in_header_block:
            story.append(Paragraph(inline_markdown_to_html(line), contact))
            continue

        if line.startswith('## '):
            text = line[3:]
            if text.strip().startswith('PROFESSIONAL EXPERIENCE'):
                story.append(CondPageBreak(1 * inch))
            story.append(Paragraph(inline_markdown_to_html(text), h2))
            story.append(HRFlowable(width='100%', thickness=0.4, color=colors.HexColor('#e8e8e8')))
            story.append(Spacer(1, 1))
            continue

        if line.startswith('### '):
            story.append(Paragraph(inline_markdown_to_html(line[4:]), h3))
            continue

        if line.startswith('- '):
            story.append(Paragraph(f"• {inline_markdown_to_html(line[2:])}", bullet))
            continue

        story.append(Paragraph(inline_markdown_to_html(line), normal))

    doc.build(story)
    print(f"Created: {pdf_file}")


if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        convert_md_to_pdf(Path(sys.argv[1]), Path(sys.argv[2]))
        print(f"\n[+] PDF conversion complete: {sys.argv[2]}")
    else:
        # Convert both master resumes via offline fallback
        resume_dir = Path(__file__).parent / "Resume"
        
        convert_md_to_pdf(
            resume_dir / "resume9-1page.md",
            resume_dir / "resume9-1page.pdf"
        )
        
        convert_md_to_pdf(
            resume_dir / "resume9-Full.md",
            resume_dir / "resume9-Full.pdf"
        )
        
        print("\n[+] Default Master PDF conversion complete!")
