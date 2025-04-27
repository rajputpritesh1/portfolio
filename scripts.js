// Three.js Background Animation
const bgCanvas = document.getElementById('bgCanvas');
const renderer = new THREE.WebGLRenderer({
  canvas: bgCanvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1500;

const posArray = new Float32Array(particleCount * 3);
for(let i = 0; i < particleCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0x00f0ff,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  particlesMesh.rotation.x += 0.0005;
  particlesMesh.rotation.y += 0.0005;
  
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero title
gsap.from('.title-line', {
  duration: 1.5,
  y: 50,
  opacity: 0,
  stagger: 0.2,
  ease: 'power3.out'
});

// Typewriter effect
const typeText = document.querySelector('.type-text');
const text = "Pritesh Kumar";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typeText.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  } else {
    document.querySelector('.type-cursor').style.animation = 'none';
  }
}

setTimeout(typeWriter, 1500);

// Animate skills progress bars
document.querySelectorAll('.skill-progress').forEach(bar => {
  const width = bar.getAttribute('data-width');
  gsap.to(bar, {
    width: width,
    scrollTrigger: {
      trigger: bar,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 1.5,
    ease: 'power3.out'
  });
});

// Floating nav animation
const floatingNav = document.querySelector('.floating-nav');
gsap.to(floatingNav, {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// Project card animations
document.querySelectorAll('.project-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: 'power3.out'
  });
});

// Contact form interactions
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.querySelector('.input-highlight').style.width = '100%';
  });
  
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.querySelector('.input-highlight').style.width = '0';
    }
  });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      name: contactForm.querySelector('input[type="text"]').value,
      email: contactForm.querySelector('input[type="email"]').value,
      subject: contactForm.querySelector('input[type="text"]:nth-of-type(2)').value,
      message: contactForm.querySelector('textarea').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.textContent = 'Thank you! Your message has been sent.';
    contactForm.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  });
}


