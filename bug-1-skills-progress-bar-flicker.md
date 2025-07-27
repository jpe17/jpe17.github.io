# Bug: Skills progress bars flicker and move backwards during animation

## Description
When the skills section loads and the progress bars animate, there's a visual glitch where the bars appear to flicker once and move backwards slightly before completing their animation. This creates a jarring user experience that detracts from the professional appearance of the portfolio.

## Steps to Reproduce
1. Navigate to the skills section of the portfolio
2. Scroll down to trigger the skills section animation
3. Observe the progress bars as they animate from 0% to their target percentage
4. Notice the flicker and backward movement during the animation

## Expected Behavior
Progress bars should smoothly animate from 0% to their target percentage without any flickering or backward movement.

## Current Behavior
Progress bars flicker and move backwards once during the animation sequence.

## Technical Details
- The issue occurs in the skill bar animation function
- The animation uses a timeout before setting the final width
- The flicker likely occurs due to the initial state not being properly set before the animation begins

## Priority
Medium

## Labels
- bug
- animation
- ui/ux 