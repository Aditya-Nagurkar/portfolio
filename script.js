// Staggered fullscreen menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.getElementById('staggered-menu');
const menuClose = document.querySelector('.menu-close');

function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add('open');
    menuToggle && menuToggle.classList.add('active');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuToggle && menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove('open');
    menuToggle && menuToggle.classList.remove('active');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

menuToggle && menuToggle.addEventListener('click', () => {
    if (menuOverlay.classList.contains('open')) closeMenu();
    else openMenu();
});

menuClose && menuClose.addEventListener('click', closeMenu);

menuOverlay && menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) closeMenu();
});

document.querySelectorAll('.staggered-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.15)';
        navbar.style.backdropFilter = 'blur(5px)';
        navbar.style.webkitBackdropFilter = 'blur(5px)';
        navbar.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        navbar.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.2)';
        navbar.style.backdropFilter = 'blur(5px)';
        navbar.style.webkitBackdropFilter = 'blur(5px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        navbar.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    }
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat, .about-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const heroTitles = document.querySelectorAll('.hero-title');
    heroTitles.forEach(heroTitle => {
        // Skip elements that have split-text class (they use split text animation instead)
        if (!heroTitle.querySelector('.split-text')) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    });
});

function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 100);
    });
}

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Split Text Animation Function
function splitText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    // Split text into individual characters including spaces
    const chars = text.split('');
    let charIndex = 0;
    
    chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        // Preserve visible spacing during animation
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        charSpan.style.display = 'inline-block';
        charSpan.style.animationDelay = `${charIndex * 0.05}s`;
        element.appendChild(charSpan);
        charIndex++;
    });
}

// Initialize split text animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const splitTextElements = document.querySelectorAll('.split-text');
    splitTextElements.forEach((element, index) => {
        // Add a base delay for each text element to animate them in sequence
        const baseDelay = index * 0.3; // 0.3s delay between each text element
        
        splitText(element);
        
        // Apply base delay to all characters in this element
        const chars = element.querySelectorAll('.char');
        chars.forEach(char => {
            const currentDelay = parseFloat(char.style.animationDelay) || 0;
            char.style.animationDelay = `${baseDelay + currentDelay}s`;
        });
    });
}); 

// --- Silk WebGL Background (Three.js, adapted from reactbits Silk) ---
(function initSilkBackground() {
    const container = document.getElementById('silk-webgl');
    if (!container || !window.THREE) return;

    const { Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, ShaderMaterial, Mesh, Color, Vector2 } = THREE;

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    function hexToRGB(hex) {
        const h = hex.replace('#', '');
        return new Color(parseInt(h.slice(0,2),16)/255, parseInt(h.slice(2,4),16)/255, parseInt(h.slice(4,6),16)/255);
    }

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

    const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3  uColor;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uRotation;
    uniform float uNoiseIntensity;

    const float e = 2.71828182845904523536;

    float noise(vec2 texCoord) {
      float G = e;
      vec2  r = (G * sin(G * texCoord));
      return fract(r.x * r.y * (1.0 + texCoord.x));
    }

    vec2 rotateUvs(vec2 uv, float angle) {
      float c = cos(angle);
      float s = sin(angle);
      mat2  rot = mat2(c, -s, s, c);
      return rot * uv;
    }

    void main() {
      float rnd        = noise(gl_FragCoord.xy);
      vec2  uv         = rotateUvs(vUv * uScale, uRotation);
      vec2  tex        = uv * uScale;
      float tOffset    = uSpeed * uTime;

      tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

      float pattern = 0.6 +
                      0.4 * sin(5.0 * (tex.x + tex.y +
                                       cos(3.0 * tex.x + 5.0 * tex.y) +
                                       0.02 * tOffset) +
                               sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

      vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
      col.a = 1.0;
      gl_FragColor = col;
    }
    `;

    const uniforms = {
        uSpeed: { value: 1 },
        uScale: { value: 1.25 },
        uNoiseIntensity: { value: 1.5 },
        uColor: { value: hexToRGB('#6d28d9') },
        uRotation: { value: 0.0 },
        uTime: { value: 0 }
    };

    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    function animate(time) {
        uniforms.uTime.value = time * 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
})();