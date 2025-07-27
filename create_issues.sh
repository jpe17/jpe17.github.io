#!/bin/bash

# Script to create GitHub issues from markdown files
# Make sure you're authenticated with: gh auth login

echo "Creating GitHub issues..."

# Issue 1: Skills progress bar flicker
echo "Creating issue 1: Skills progress bar flicker..."
gh issue create \
  --title "Bug: Skills progress bars flicker and move backwards during animation" \
  --body-file bug-1-skills-progress-bar-flicker.md \
  --label "bug,animation,ui/ux"

# Issue 2: Hero section layout shift
echo "Creating issue 2: Hero section layout shift..."
gh issue create \
  --title "Bug: Hero section moves up and down when typing animation changes text length" \
  --body-file bug-2-hero-section-layout-shift.md \
  --label "bug,layout-shift,ui/ux,performance"

# Issue 3: Video section feature
echo "Creating issue 3: Video section feature request..."
gh issue create \
  --title "Feature Request: Add video section with playable 'Glass Half Empty' video" \
  --body-file feature-1-video-section.md \
  --label "enhancement,feature-request,video,ui/ux"

echo "All issues created successfully!" 