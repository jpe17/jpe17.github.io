// Static version of the main JavaScript file

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all components
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    loadStaticContent();
    initializeContactForm();
    initializeNeuralNetwork();
    initializeAdvancedAnimations();
    
    // Hide loading screen after everything loads
    setTimeout(hideLoadingScreen, 1500);
});

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Trigger enter animations
        triggerEnterAnimations();
    }
}

function triggerEnterAnimations() {
    // Add staggered animations for elements
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('animate-in');
        }, index * 50);
    });
}

// Modern Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let lastScrollY = window.scrollY;
    let isScrollingDown = false;
    
    // Auto-hide navbar on scroll
    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        
        // Only trigger if scroll difference is significant (prevents jitter)
        if (scrollDifference > 5) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide navbar
                navbar.classList.add('hidden');
                isScrollingDown = true;
            } else {
                // Scrolling up - show navbar
                navbar.classList.remove('hidden');
                isScrollingDown = false;
            }
            
            // Add compact mode when scrolled
            if (currentScrollY > 50) {
                navbar.classList.add('compact');
            } else {
                navbar.classList.remove('compact');
            }
            
            lastScrollY = currentScrollY;
        }
    }
    
    // Throttled scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleNavbarScroll, 10);
    });
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling and active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call to set correct active link
    updateActiveLink();
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'Machine Learning Researcher',
        'Engineering Lead',
        'Co-Founder & CTO',
        'Solution Architect',
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

// Load static content from embedded data
async function loadStaticContent() {
    try {
        // Use all embedded data
        const { stats, projects, skills, experiences } = window.STATIC_DATA;
        
        // Render content
        renderStats(stats);
        renderProjects(projects);
        renderSkills(skills);
        renderExperiences(experiences);
        
        // Add fade-in animations
        addFadeInAnimations();
        
    } catch (error) {
        console.error('Error loading static content:', error);
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
        <div class="education-badges">
            <div class="education-badge">${stats.harvard_education}</div>
            <div class="education-badge">${stats.imperial_education}</div>
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

// Initialize contact form (static version - no backend)
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
        
        // Simulate sending (no real backend)
        setTimeout(() => {
            showSuccessMessage('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1000);
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

// Advanced animations and interactions
function initializeAdvancedAnimations() {
    let ticking = false;
    
    // Optimized parallax scrolling for hero only
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = window.innerHeight;
                
                // Only apply parallax when hero is visible and not scrolled past
                if (scrolled < heroHeight) {
                    const hero = document.querySelector('.hero');
                    const particles = document.querySelector('.particles');
                    
                    // Reduced parallax intensity and contained within hero bounds
                    if (hero) {
                        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
                    }
                    
                    if (particles) {
                        particles.style.transform = `translateY(${scrolled * 0.1}px)`;
                    }
                } else {
                    // Reset transforms when scrolled past hero
                    const hero = document.querySelector('.hero');
                    const particles = document.querySelector('.particles');
                    
                    if (hero) hero.style.transform = '';
                    if (particles) particles.style.transform = '';
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Contained mouse movement effects (only for hero section)
    document.addEventListener('mousemove', (e) => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const isMouseInHero = e.clientY >= heroRect.top && e.clientY <= heroRect.bottom;
        
        if (isMouseInHero) {
            const mouseX = (e.clientX - heroRect.left) / heroRect.width;
            const mouseY = (e.clientY - heroRect.top) / heroRect.height;
            
            // Reduced neural network movement
            const neuralNetwork = document.querySelector('.neural-network');
            if (neuralNetwork) {
                neuralNetwork.style.transform = `
                    rotateY(${(mouseX - 0.5) * 5}deg) 
                    rotateX(${(mouseY - 0.5) * -5}deg)
                `;
            }
            
            // Reduced particle movement
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const factor = (index + 1) * 0.3;
                particle.style.transform = `
                    translateX(${(mouseX - 0.5) * factor}px) 
                    translateY(${(mouseY - 0.5) * factor}px)
                `;
            });
        }
    });
    
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = `
                0 25px 50px rgba(0, 168, 255, 0.4),
                0 10px 20px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Add scroll-based navbar transparency and cleanup
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        navbar.style.background = `rgba(10, 10, 10, ${Math.max(0.7, Math.min(0.95, 0.95 - scrolled * 0.001))})`;
    }
    
    // Clean up hero effects when scrolled past
    const heroHeight = window.innerHeight;
    if (scrolled > heroHeight) {
        const neuralNetwork = document.querySelector('.neural-network');
        const particles = document.querySelectorAll('.particle');
        
        if (neuralNetwork) {
            neuralNetwork.style.transform = '';
        }
        
        particles.forEach(particle => {
            particle.style.transform = '';
        });
    }
}); 