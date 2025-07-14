# Email Setup Guide

## Option 1: Static Version (Recommended for GitHub Pages)

### Using Formspree (Free & Easy)

1. **Go to [Formspree](https://formspree.io/)**
2. **Sign up for a free account**
3. **Create a new form**
4. **Copy your form ID** (it will look like `xrgjqjqj`)
5. **Replace `xnnzaglv` in the code:**

In `index.html`:
```html
<form id="contact-form" action="https://formspree.io/f/xnnzaglv" method="POST">
```

In `static/js/main-static.js`:
```javascript
contactForm.action = 'https://formspree.io/f/xnnzaglv';
```

6. **Test it!** The form will now send emails directly to your inbox without any redirection.

## Option 2: Flask Version (For Local Development)

### Setup Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Set environment variable:**
   ```bash
   export EMAIL_PASSWORD="your-app-password-here"
   ```
4. **Install requirements:**
   ```bash
   cd flask-version
   pip install -r requirements.txt
   ```
5. **Run the Flask app:**
   ```bash
   python app.py
   ```

## How It Works

### Static Version (Formspree)
- ✅ No redirection
- ✅ Emails sent directly to your inbox
- ✅ Free for up to 50 submissions/month
- ✅ Works on GitHub Pages
- ✅ No backend needed

### Flask Version
- ✅ Real email sending via SMTP
- ✅ Custom email templates
- ✅ Full control over email content
- ❌ Requires backend setup
- ❌ Needs Gmail app password

## Testing

1. **Fill out the contact form** on your website
2. **Submit the form**
3. **Check your email** at `joaopaesteves99@gmail.com`
4. **You should receive the email** with the form data

## Troubleshooting

### If emails aren't being sent:
1. **Check the form ID** is correct
2. **Verify your email address** in the form
3. **Check spam folder**
4. **For Flask version:** Ensure `EMAIL_PASSWORD` environment variable is set

### If you get errors:
1. **Check browser console** for JavaScript errors
2. **Verify network connectivity**
3. **For Flask version:** Check the terminal for Python errors 