const textElement = document.getElementById('animated-text');
const text = textElement.innerText;
textElement.innerHTML = '';

// Wrap each letter in a span so we can animate them individually
text.split('').forEach(char => {
    const span = document.createElement('span');
    span.innerText = char === ' ' ? '\u00A0' : char;
    textElement.appendChild(span);
});

const spans = document.querySelectorAll('span');

// 1. Loop the horizontal movement
gsap.to("#animated-text", {
    // x: "-20%",
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// 2. Animate the font-weight (variable font axis)
spans.forEach((span, i) => {
    gsap.to(span, {
        keyframes: [
            { "font-variation-settings": "'wght' 100", duration: 1 },
            { "font-variation-settings": "'wght' 900", duration: 1 },
            { "font-variation-settings": "'wght' 100", duration: 1 }
        ],
        repeat: -1,
        delay: i * 0.1, // Staggered effect
        ease: "power1.inOut"
    });
});