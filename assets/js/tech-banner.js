// Generate floating particles
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay
    particle.style.animationDelay = Math.random() * 8 + "s";

    // Random animation duration
    particle.style.animationDuration = Math.random() * 4 + 6 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Initialize particles when page loads
document.addEventListener("DOMContentLoaded", createParticles);

// Add interactive hover effects
const banner = document.querySelector(".chess-banner");
banner.addEventListener("mousemove", (e) => {
  const rect = banner.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  const circuitBg = document.querySelector(".circuit-bg");
  circuitBg.style.backgroundPosition = `${x}% ${y}%`;
});

// Add click effect to chess squares
const chessSquares = document.querySelectorAll(".chess-square");
chessSquares.forEach((square) => {
  square.addEventListener("click", () => {
    square.style.animation = "none";
    setTimeout(() => {
      square.style.animation = "strategicPulse 2s ease-in-out infinite";
    }, 100);
  });
});
