# assignment-02

## Project goal
The goal of the project is to allow users to create their own bespoke packet of pastille sweets. They can then place an order to have the packet delivered to their house or gift it to somebody else.

## Features

- Choose what flavours are included in their packet
- Choose the quantity of each flavour
- Randomise the order of sweets in the packet
- Order your desired packet to your home
- Gift your creation to someone else
- Order healtheir versions


## How I went about it

- I started with a simple form with 2 dropdowns and a submit button. I followed the Week 7 Unit 12 lecture recording to create the JS, adding event listeners etc.
- Once that worked, I wanted to put a max of 10 on the total with a warning message.
- Then I wanted to create a new array containing the amounts of flavours, e.g. if the user selected 3 reds and 2 blues then the array would be red, red, red, blue, blue. I read up on how to map one array into another. I went with a forEach and a for loop.
- I wanted to randomise the order of the flavours in the array, so it was more like a real roll of sweets. I researched it and found the Fisher-Yates function.
- The HTML for the dropdowns was becoming unwieldy, so I looked up other options. I went with the numerical stepper instead of dropdowns.
- I wanted to make a visual/graphical representation of the roll of pastilles. I considered using SVGs but thought it was a good opportunity to use what was covered in the Canvas lessson (Week 9). I worked on 'drawing' the pastilles onto the canvas based on the array.
- Found a bug where if you reduced the amount of selected sweets, the old rectangles remained on the canvas anyway. Added in clearRect to clear the canvas each time. 
- I decided to give my pastilles rounded corners. Did some research and switched from .fillRect to .roundRect
- Added new min/max pastille total of 10. Wrote new error messaging with "add x more" or "remove y" to help the user (this made the above bug irrelevant but it's fixed anyway)
- Made big style changes: Styled the form. Styled the buttons including with focus states. Add background 'tinfoil' image to the canvas. Add an order form, which is only revealed after the user has generated their first roll of pastilles. Need to fix a bug on mobile where the order form isn't revealed.

## Instructions

