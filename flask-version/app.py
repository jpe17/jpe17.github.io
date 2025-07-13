from flask import Flask, render_template, jsonify, request
import json
import os
from datetime import datetime

app = Flask(__name__)

# Load projects data
def load_projects():
    with open('projects.json', 'r') as f:
        return json.load(f)

# Experience data
EXPERIENCES = [
    {
        "company": "OpenSC",
        "position": "Lead Solution Engineer",
        "description": "Building transparent, ethical supply chains that drive sustainability and uphold human rights.",
        "duration": "Nov 2024 - Present",
        "logo": "/static/images/logos/opensc.png",
        "skills": ["Python", "Machine Learning", "Data Engineering", "Sustainability Tech"]
    },
    {
        "company": "Optibus",
        "position": "Lead Solutions Architect",
        "description": "Developed CO2 reduction solutions for large public transport operators deployed in 5,000+ cities.",
        "duration": "Nov 2023 - Oct 2024",
        "logo": "/static/images/logos/optibus.webp",
        "skills": ["AI/ML", "Cloud Architecture", "Optimization", "Sustainability"]
    },
    {
        "company": "Optibus",
        "position": "Lead Solutions Engineer",
        "description": "Mentored engineering teams and implemented security protocols for EMEA SaaS infrastructure.",
        "duration": "Jul 2021 - Oct 2023",
        "logo": "/static/images/logos/optibus.webp",
        "skills": ["DevOps", "Security", "Team Leadership", "SaaS"]
    },
    {
        "company": "KALAB",
        "position": "Chief Technology Officer",
        "description": "Directed development of music platform achieving 400+ bookings and 1000+ users.",
        "duration": "Oct 2019 - Oct 2020",
        "logo": "/static/images/logos/kalab.png",
        "skills": ["Full Stack", "Platform Development", "User Growth", "Music Tech"]
    },
    {
        "company": "From Denim To Green",
        "position": "Co-founder",
        "description": "Created sustainable textile activism platform and Greenvolution Talks series.",
        "duration": "Oct 2018 - Jul 2020",
        "logo": "/static/images/logos/fromdenimtogreen.png",
        "skills": ["Sustainability", "Community Building", "Content Creation", "Social Impact"]
    },
    {
        "company": "CEiiA",
        "position": "Product Development Intern",
        "description": "Managed development of nanosatellite prototype for ocean surveillance.",
        "duration": "Jul 2018 - Aug 2019",
        "logo": "/static/images/logos/ceiia.jpg",
        "skills": ["Aerospace Engineering", "Product Development", "Satellite Technology", "Ocean Monitoring"]
    }
]

SKILLS = {
    "Programming Languages": [
        {"name": "Python", "icon": "devicon-python-plain", "level": 95},
        {"name": "SQL", "icon": "devicon-azuresqldatabase-plain", "level": 90},
        {"name": "HTML/CSS", "icon": "devicon-html5-plain", "level": 85},
        {"name": "JavaScript", "icon": "devicon-javascript-plain", "level": 75},
        {"name": "Matlab", "icon": "devicon-matlab-plain", "level": 80}
    ],
    "ML/AI Frameworks": [
        {"name": "PyTorch", "icon": "devicon-pytorch-original", "level": 90},
        {"name": "TensorFlow", "icon": "devicon-tensorflow-original", "level": 85},
        {"name": "Transformers", "icon": "devicon-python-plain", "level": 90},
        {"name": "OpenAI", "icon": "devicon-openai-plain", "level": 80},
        {"name": "Whisper", "icon": "devicon-python-plain", "level": 85}
    ],
    "Tools & Infrastructure": [
        {"name": "Docker", "icon": "devicon-docker-plain", "level": 90},
        {"name": "Git", "icon": "devicon-git-plain", "level": 95},
        {"name": "AWS", "icon": "devicon-amazonwebservices-plain-wordmark", "level": 85},
        {"name": "PostgreSQL", "icon": "devicon-postgresql-plain", "level": 85},
        {"name": "Flask", "icon": "devicon-flask-original", "level": 90},
        {"name": "FastAPI", "icon": "devicon-fastapi-plain", "level": 85}
    ]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/projects')
def get_projects():
    projects = load_projects()
    return jsonify(projects)

@app.route('/api/experiences')
def get_experiences():
    return jsonify(EXPERIENCES)

@app.route('/api/skills')
def get_skills():
    return jsonify(SKILLS)

@app.route('/api/stats')
def get_stats():
    projects = load_projects()
    stats = {
        "total_projects": len(projects),
        "years_experience": datetime.now().year - 2018,
        "technologies_mastered": sum(len(skills) for skills in SKILLS.values()),
        "companies_worked": len(EXPERIENCES)
    }
    return jsonify(stats)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # In a real app, you'd save this to a database or send an email
    return jsonify({"status": "success", "message": "Message received!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 