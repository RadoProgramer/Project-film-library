let currentTheme = localStorage.getItem('theme');
const toggleSwitch = document.querySelector('input[type="checkbox"]');

export function startParticleAnimation(e) {
    if (e.clientX === 0 && e.clientY === 0) {
        const bbox = document.querySelectorAll('.modal-buttons').getBoundingClientRect();
        const x = bbox.left + bbox.width / 2;
        const y = bbox.top + bbox.height / 2;
        for (let i = 0; i < 60; i++) {
            createParticle(x, y);
        }
    } else {
        for (let i = 0; i < 60; i++) {
            createParticle(e.clientX, e.clientY);
        }
    }
}

function createParticle(x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);

    const size = Math.floor(Math.random() * 20 + 5);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    const colors1 = ['orange', 'white'];
    const colors2 = ['orange', '#0e171e'];
    if (currentTheme === 'dark') {
        particle.style.background = colors2[Math.floor(Math.random() * colors2.length)];
    } else {
        particle.style.background = colors1[Math.floor(Math.random() * colors1.length)];
    }

    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;

    const animation = particle.animate(
        [
            {
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                opacity: 1,
            },
            {
                transform: `translate(${destinationX}px, ${destinationY}px)`,
                opacity: 0,
            },
        ],
        {
            duration: Math.random() * 1000 + 500,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            delay: Math.random() * 200,
        },
    );

    animation.onfinish = () => {
        particle.remove();
    };
}

function updateButtonEffectColors() {
    const particles = document.querySelectorAll('particle');
    const colors1 = ['orange', 'white'];
    const colors2 = ['orange', '#0e171e'];
    const colors = currentTheme === 'dark' ? colors2 : colors1;

    particles.forEach(particle => {
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    });
}

toggleSwitch.addEventListener('change', function () {
    if (this.checked) {
        currentTheme = 'dark';
    } else {
        currentTheme = 'light';
    }
    localStorage.setItem('theme', currentTheme);

    updateButtonEffectColors();
});

updateButtonEffectColors();
