// Main JavaScript file for the modern portfolio website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    loadDynamicContent();
    initializeContactForm();
    initializeNeuralNetwork();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'AI & ML Engineer',
        'Computer Vision Expert',
        'Neural Network Architect',
        'Deep Learning Specialist',
        'Python Developer'
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function type() {
        const current = phrases[currentPhrase];
        
        if (isDeleting) {
            typingElement.textContent = current.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typingElement.textContent = current.substring(0, currentChar + 1);
            currentChar++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentChar === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill progress bars
function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    if (progressBar) {
        const level = progressBar.dataset.level;
        setTimeout(() => {
            progressBar.style.width = level + '%';
        }, 300);
    }
}

// Load dynamic content from API
async function loadDynamicContent() {
    try {
        // Load all content in parallel
        const [stats, projects, skills, experiences] = await Promise.all([
            fetch('/api/stats').then(res => res.json()),
            fetch('/api/projects').then(res => res.json()),
            fetch('/api/skills').then(res => res.json()),
            fetch('/api/experiences').then(res => res.json())
        ]);
        
        // Render content
        renderStats(stats);
        renderProjects(projects);
        renderSkills(skills);
        renderExperiences(experiences);
        
        // Add fade-in animations
        addFadeInAnimations();
        
    } catch (error) {
        console.error('Error loading dynamic content:', error);
        showErrorMessage('Failed to load content. Please refresh the page.');
    }
}

// Render stats in hero section
function renderStats(stats) {
    const statsContainer = document.getElementById('hero-stats');
    if (!statsContainer) return;
    
    const statsHTML = `
        <div class="stat-item fade-in">
            <span class="stat-number">${stats.total_projects}+</span>
            <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item fade-in">
            <span class="stat-number">${stats.years_experience}+</span>
            <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat-item fade-in">
            <span class="stat-number">${stats.technologies_mastered}+</span>
            <span class="stat-label">Technologies</span>
        </div>
        <div class="stat-item fade-in">
            <span class="stat-number">${stats.companies_worked}+</span>
            <span class="stat-label">Companies</span>
        </div>
    `;
    
    statsContainer.innerHTML = statsHTML;
}

// Render projects
function renderProjects(projects) {
    const projectsContainer = document.getElementById('projects-grid');
    if (!projectsContainer) return;
    
    const projectsHTML = projects.map(project => `
        <div class="project-card fade-in">
            <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-skills">
                    ${project.skills.map(skill => `
                        <span class="skill-tag">${skill.name}</span>
                    `).join('')}
                </div>
                <a href="${project.repoUrl}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        </div>
    `).join('');
    
    projectsContainer.innerHTML = projectsHTML;
}

// Render skills
function renderSkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;
    
    const skillsHTML = Object.entries(skills).map(([category, skillList]) => `
        <div class="skill-category fade-in">
            <h3>${category}</h3>
            <div class="skill-items">
                ${skillList.map(skill => `
                    <div class="skill-item fade-in">
                        <div class="skill-icon">
                            <i class="${skill.icon}"></i>
                        </div>
                        <div class="skill-info">
                            <div class="skill-name">${skill.name}</div>
                            <div class="skill-level">
                                <div class="skill-progress" data-level="${skill.level}"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    skillsContainer.innerHTML = skillsHTML;
}

// Render experiences
function renderExperiences(experiences) {
    const experiencesContainer = document.getElementById('experience-timeline');
    if (!experiencesContainer) return;
    
    const experiencesHTML = experiences.map(experience => `
        <div class="timeline-item fade-in">
            <div class="experience-card">
                <div class="experience-header">
                    <img src="${experience.logo}" alt="${experience.company}" class="company-logo">
                    <div class="experience-info">
                        <h3>${experience.position}</h3>
                        <div class="experience-company">${experience.company}</div>
                        <div class="experience-duration">${experience.duration}</div>
                    </div>
                </div>
                <div class="experience-description">${experience.description}</div>
                <div class="experience-skills">
                    ${experience.skills.map(skill => `
                        <span class="experience-skill">${skill}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    experiencesContainer.innerHTML = experiencesHTML;
}

// Add fade-in animations to dynamically loaded content
function addFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all new fade-in elements
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<div class="loading"></div> Sending...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                const result = await response.json();
                showSuccessMessage('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            showErrorMessage('Failed to send message. Please try again.');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Initialize neural network animation
function initializeNeuralNetwork() {
    const neurons = document.querySelectorAll('.neuron');
    if (neurons.length === 0) return;
    
    // Add random delays to neuron animations
    neurons.forEach((neuron, index) => {
        neuron.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Create connection lines between neurons
    createNeuralConnections();
}

// Create visual connections between neurons
function createNeuralConnections() {
    const network = document.querySelector('.neural-network');
    if (!network) return;
    
    const layers = document.querySelectorAll('.network-layer');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '0';
    
    network.appendChild(svg);
    
    // Create connections between layers
    for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        
        const currentNeurons = currentLayer.querySelectorAll('.neuron');
        const nextNeurons = nextLayer.querySelectorAll('.neuron');
        
        currentNeurons.forEach(neuron1 => {
            nextNeurons.forEach(neuron2 => {
                createConnection(svg, neuron1, neuron2);
            });
        });
    }
}

// Create individual connection line
function createConnection(svg, neuron1, neuron2) {
    const rect1 = neuron1.getBoundingClientRect();
    const rect2 = neuron2.getBoundingClientRect();
    const networkRect = svg.parentElement.getBoundingClientRect();
    
    const x1 = rect1.left - networkRect.left + rect1.width / 2;
    const y1 = rect1.top - networkRect.top + rect1.height / 2;
    const x2 = rect2.left - networkRect.left + rect2.width / 2;
    const y2 = rect2.top - networkRect.top + rect2.height / 2;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'rgba(0, 168, 255, 0.3)');
    line.setAttribute('stroke-width', '1');
    
    svg.appendChild(line);
}

// Utility functions
function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showErrorMessage(message) {
    showToast(message, 'error');
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#00a8ff' : '#ff6b6b',
        color: '#0a0a0a',
        borderRadius: '8px',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Handle window resize for neural network
window.addEventListener('resize', () => {
    const svg = document.querySelector('.neural-network svg');
    if (svg) {
        svg.remove();
        setTimeout(createNeuralConnections, 100);
    }
});

// Smooth scrolling for all internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add scroll-based navbar transparency
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        navbar.style.background = `rgba(10, 10, 10, ${Math.max(0.7, Math.min(0.95, 0.95 - scrolled * 0.001))})`;
    }
}); 