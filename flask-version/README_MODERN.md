# Modern ML Engineering Portfolio

A cutting-edge portfolio website built with Flask backend and modern frontend technologies, showcasing Machine Learning and AI expertise.

## Features

- **Modern Dark Theme**: Sleek, tech-focused design with blue accent colors
- **Interactive Elements**: Animated neural network, typing effects, and smooth scrolling
- **Flask Backend**: RESTful API endpoints for dynamic content
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Real-time Animations**: CSS animations and JavaScript interactions
- **API-Driven**: Dynamic content loading from Flask endpoints
- **Modern Typography**: JetBrains Mono and Inter fonts for a technical look
- **Interactive Contact Form**: Functional contact form with Flask backend

## Tech Stack

### Backend
- **Flask**: Python web framework
- **Python**: Server-side logic and API endpoints
- **JSON**: Data storage and API responses

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Dynamic content loading and interactions
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Modern typography (Inter, JetBrains Mono)

### Design Features
- **CSS Custom Properties**: Consistent theming
- **Intersection Observer API**: Scroll-based animations
- **Fetch API**: Modern AJAX requests
- **CSS Grid & Flexbox**: Responsive layouts
- **SVG Animations**: Neural network visualizations

## Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/jpe17/jpe17.github.io.git
cd jpe17.github.io
```

2. **Create a virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Run the application**:
```bash
python app.py
```

5. **Access the website**:
Open your browser and go to `http://localhost:5000`

## Project Structure

```
jpe17.github.io/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── main.css      # Modern styling
│   └── js/
│       └── main.js       # Interactive functionality
├── projects.json         # Project data
├── images/               # Image assets
├── favicon/              # Favicon files
└── README_MODERN.md      # This file
```

## API Endpoints

- `GET /` - Main page
- `GET /api/projects` - Get all projects
- `GET /api/experiences` - Get work experience
- `GET /api/skills` - Get technical skills
- `GET /api/stats` - Get portfolio statistics
- `POST /api/contact` - Send contact form

## Key Features

### 1. Neural Network Animation
- Animated neurons with pulsing effects
- Dynamic SVG connections between layers
- Responsive to window resize

### 2. Typing Effect
- Rotating text showing different roles
- Smooth typing and deleting animations
- Customizable phrases array

### 3. Scroll Animations
- Intersection Observer for performance
- Fade-in effects on scroll
- Animated skill progress bars

### 4. Modern Design
- Dark theme with green accents
- Glass-morphism effects
- Smooth transitions and hover effects
- Mobile-responsive design

### 5. Interactive Elements
- Hover effects on cards and buttons
- Smooth scrolling navigation
- Loading states and toast notifications
- Form validation and submission

## Customization

### Colors
Edit the CSS custom properties in `static/css/main.css`:
```css
:root {
    --primary: #00a8ff;
    --bg-primary: #0a0a0a;
    --text-primary: #ffffff;
    /* ... other colors */
}
```

### Content
Update the data in:
- `app.py` - Experience and skills data
- `projects.json` - Project information
- `templates/index.html` - Static content

### Styling
Modify `static/css/main.css` for:
- Layout changes
- Animation adjustments
- Responsive breakpoints
- Visual effects

## Deployment

### Local Development
```bash
python app.py
```

### Production (with Gunicorn)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables
Set these for production:
```bash
export FLASK_ENV=production
export FLASK_DEBUG=False
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- JavaScript ES6+ features used
- Intersection Observer API required

## Performance Features

- CSS variables for consistent theming
- Efficient scroll animations
- Optimized image loading
- Minimal external dependencies
- Modern JavaScript practices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions:
- Email: joaopaesteves99@gmail.com
- LinkedIn: [linkedin.com/in/joaoesteves7](https://linkedin.com/in/joaoesteves7)
- GitHub: [github.com/jpe17](https://github.com/jpe17) 