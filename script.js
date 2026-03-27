// animation on life of developer
const phrase = "Life of Developer";
const wrapper = document.getElementById('text-wrapper');

// 1. Create the spans
    const charElements = phrase.split('').map((letter) => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = letter === " " ? "\u00A0" : letter;
    wrapper.appendChild(span);
    return span;
});
// 2. Settings for the effect (Tweak these to your liking!)
const effectRadius = 300; // How far the effect reaches in pixels
const maxWeight = 900;    // Maximum font thickness
const minWeight = 100;    // Minimum font thickness
const maxSkew = 25;       // Maximum italic/lean angle in degrees

// 3. Track mouse movement
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    charElements.forEach((span) => {
        // Get the center position of each letter
        const rect = span.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        // Calculate distance from cursor to the center of the letter using Pythagorean theorem
        const distX = mouseX - letterCenterX;
        const distY = mouseY - letterCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < effectRadius) {
            // Calculate intensity (0.0 to 1.0) based on how close the cursor is
            const intensity = 1 - (distance / effectRadius); 

            // Calculate weight (closer = heavier)
            const weight = minWeight + ((maxWeight - minWeight) * intensity);

            // Calculate skew (creates the "leaning" effect based on cursor X position)
            // If cursor is to the left, it leans right. If cursor is right, it leans left.
            const skewX = (distX / effectRadius) * maxSkew;

            // Apply the styles dynamically
            span.style.fontWeight = weight;
            span.style.transform = `skewX(${skewX}deg) scale(${1 + (intensity * 0.1)})`; 
        } else {
            // Reset letters outside the radius
            span.style.fontWeight = minWeight;
            span.style.transform = `skewX(0deg) scale(1)`;
        }
    });
});

// 4. Reset everything when the mouse leaves the window
document.addEventListener('mouseleave', () => {
    charElements.forEach((span) => {
        span.style.fontWeight = minWeight;
        span.style.transform = `skewX(0deg) scale(1)`;
    });
});
// -------------------------------------------------------
// transition on line below life of developer
// -------------------------------------------------------

const textElement = document.getElementById('interactive-text');
const text = textElement.textContent.trim();
const words = text.split(" "); // Splits by space

// Clear the element and rebuild it with spans
textElement.innerHTML = ''; 

words.forEach(word => {
    const span = document.createElement('span');
    span.classList.add('word');
    span.textContent = word + " "; // Add space back
    textElement.appendChild(span);
});

// Re-add the cursor pipe if you want it to blink at the end
const cursor = document.createElement('span');
cursor.classList.add('cursor'); // You can animate this separately
textElement.appendChild(cursor);


// ===== CODE BG =====
const codeLines = [
  'const dream = new Developer();',
  'while (true) {',
  '  dream.drinkCoffee();',
  '  dream.debug();',
  '  dream.stackoverflow();',
  '  if (itWorks) break; // never',
  '}',
  'function fixBug(bug) {',
  '  // TODO: fix this later',
  '  return newBug(bug * 10);',
  '}',
  'git commit -m "fix"',
  'git push origin panic',
  'npm install hope',
  'ERROR: hope not found',
  'console.log("why");',
  'console.log("WHY");',
  'console.log("W H Y");',
  'import { coffee } from "life";',
  'const solution = stackoverflow.search();',
  'copy(solution); // works, idk why',
  '// Day 1: I will build the next big app',
  '// Day 30: What is CSS again',
  '// Day 365: Still googling forEach',
];
const cb = document.getElementById('codeBg');
const repeated = [...codeLines,...codeLines,...codeLines].join('\n');
cb.textContent = repeated;
