# Bug: Hero section moves up and down when typing animation changes text length

## Description
The hero section experiences layout shifts (CLS - Cumulative Layout Shift) when the typing animation changes from shorter to longer text or vice versa. This causes the entire page content to move up and down, creating a "playful" but unprofessional bouncing effect that disrupts the user experience.

## Steps to Reproduce
1. Load the portfolio homepage
2. Observe the hero section with the typing animation
3. Watch as the text changes between different phrases of varying lengths
4. Notice the entire page content moving up and down

## Expected Behavior
The hero section should maintain a fixed height that accommodates the longest possible text, preventing any layout shifts during the typing animation.

## Current Behavior
The hero section dynamically adjusts its height based on the current text being displayed, causing the page to bounce up and down.

## Technical Details
- The typing effect cycles through phrases of varying lengths
- Phrases include: "Machine Learning Researcher" (long), "Engineering Lead" (short), "Co-Founder & CTO" (medium), "Solution Architect" (medium), "Python Developer" (short)
- The layout shift occurs because the container height changes with the text content

## Suggested Solution
Set a fixed height for the typing text container that accommodates the longest phrase, or use CSS to prevent layout shifts.

## Priority
Medium

## Labels
- bug
- layout-shift
- ui/ux
- performance 