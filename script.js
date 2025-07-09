document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const logo = document.querySelector('.logo');

    // Scroll Effects
    window.addEventListener('scroll', () => {
        // Header shrink effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Glow intensity based on scroll
        const scrollPercent = Math.min(window.scrollY / 500, 1);
        document.documentElement.style.setProperty(
            '--glow-intensity',
            0.8 + (scrollPercent * 0.7)
        );

        // Section detection
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Menu Toggle Functionality
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navbar.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Add hover glow effect
        link.addEventListener('mouseenter', () => {
            link.style.setProperty('--glow-intensity', '1.5');
        });

        link.addEventListener('mouseleave', () => {
            link.style.setProperty('--glow-intensity', '0.8');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navbar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Keyboard Accessibility
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.setAttribute('aria-expanded', 'false');
            navbar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Mouse Move Effects
    document.addEventListener('mousemove', (e) => {
        const xPercent = e.clientX / window.innerWidth;
        const yPercent = e.clientY / window.innerHeight;

        // Adjust hue based on mouse position
        const hueOffset = (xPercent - 0.5) * 60;
        document.documentElement.style.setProperty(
            '--primary-hue',
            180 + hueOffset
        );

        // Adjust glow spread based on vertical position
        document.documentElement.style.setProperty(
            '--glow-spread',
            `${5 + (yPercent * 15)}px`
        );

        // Logo subtle movement
        logo.style.transform = `translate(
            ${(xPercent - 0.5) * 5}px, 
            ${(yPercent - 0.5) * 5}px
        )`;
    });

    // Time-based Color Adjustments
    function adjustColorsForTime() {
        const hour = new Date().getHours();
        if (hour >= 18 || hour <= 6) { // Evening/night
            document.documentElement.style.setProperty('--primary-hue', '200');
            document.documentElement.style.setProperty('--secondary-hue', '300');
            document.documentElement.style.setProperty('--accent-hue', '350');
            document.documentElement.style.setProperty('--glow-intensity', '1.1');
        } else { // Daytime
            document.documentElement.style.setProperty('--primary-hue', '180');
            document.documentElement.style.setProperty('--secondary-hue', '280');
            document.documentElement.style.setProperty('--accent-hue', '10');
            document.documentElement.style.setProperty('--glow-intensity', '0.8');
        }
    }

    adjustColorsForTime();
    setInterval(adjustColorsForTime, 3600000); // Update hourly

    // Responsive check on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navbar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Nav item entrance animation
    navLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.1}s`;
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';

        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // Logo entrance animation
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 200);
});



// Page Loader
const pageLoader = document.querySelector('.page-loader');
setTimeout(() => {
    pageLoader.style.opacity = '0';
    pageLoader.style.visibility = 'hidden';
}, 1500);




// Particle Background Animation
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = [
        'rgba(0, 204, 255, 0.6)',
        'rgba(212, 0, 212, 0.6)',
        'rgba(124, 240, 61, 0.6)',
        'rgba(255, 81, 0, 0.6)'
    ];

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Create particles
    function initParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 5000);
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                oscillation: Math.random() * Math.PI * 2,
                oscillationSpeed: Math.random() * 0.02 + 0.01,
                oscillationDistance: Math.random() * 20 + 10
            });
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(p => {
            // Update position with oscillation
            p.oscillation += p.oscillationSpeed;
            const offset = Math.sin(p.oscillation) * p.oscillationDistance;

            p.x += p.speedX + offset * 0.1;
            p.y += p.speedY + offset * 0.1;

            // Boundary check
            if (p.x > canvas.width + p.size || p.x < -p.size) {
                p.x = p.x > canvas.width ? -p.size : canvas.width + p.size;
            }
            if (p.y > canvas.height + p.size || p.y < -p.size) {
                p.y = p.y > canvas.height ? -p.size : canvas.height + p.size;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = p.size * 3;
            ctx.shadowColor = p.color;
            ctx.fill();
        });

        // Draw connections
        drawConnections();

        requestAnimationFrame(animate);
    }

    // Draw lines between close particles
    function drawConnections() {
        const maxDistance = 150;
        ctx.shadowBlur = 0;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 204, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Initialize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
});









// GSAP Animation for Education Section
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Canvas Background
    const canvas = document.getElementById('education-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Draw animated background
    function drawBackground() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        const gridSize = 40;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw connecting lines animation
        const points = [];
        const pointCount = 15;

        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        // Draw connections
        ctx.lineWidth = 0.5;
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const opacity = 1 - (distance / 200);
                    ctx.strokeStyle = `rgba(0, 204, 255, ${opacity * 0.1})`;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }

        // Update points
        for (let i = 0; i < points.length; i++) {
            points[i].x += points[i].vx;
            points[i].y += points[i].vy;

            // Boundary check
            if (points[i].x < 0 || points[i].x > canvas.width) points[i].vx *= -1;
            if (points[i].y < 0 || points[i].y > canvas.height) points[i].vy *= -1;
        }

        requestAnimationFrame(drawBackground);
    }

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawBackground();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Section header animation
    gsap.from(".section-title", {
        scrollTrigger: {
            trigger: ".education",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".section-subtitle", {
        scrollTrigger: {
            trigger: ".education",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
    });

    // Timeline items animation
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power2.out"
        });
    });

    // Hover effects with GSAP
    document.querySelectorAll('.timeline-item').forEach(item => {
        const card = item.querySelector('.timeline-card');
        const markerDot = item.querySelector('.marker-dot');
        const markerDate = item.querySelector('.marker-date');

        item.addEventListener('mouseenter', () => {
            // Pulse animation for marker dot
            gsap.to(markerDot, {
                scale: 1.3,
                duration: 0.3,
                ease: "power2.out"
            });

            // Date lift animation
            gsap.to(markerDate, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });

            // Card lift animation
            gsap.to(card, {
                y: -10,
                duration: 0.5,
                ease: "power2.out"
            });

            // Create particle burst
            const particles = 8;
            for (let i = 0; i < particles; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle-burst';
                particle.style.left = `${markerDot.offsetLeft + 8}px`;
                particle.style.top = `${markerDot.offsetTop + 8}px`;
                item.appendChild(particle);

                gsap.to(particle, {
                    x: gsap.utils.random(-50, 50),
                    y: gsap.utils.random(-50, 50),
                    opacity: 0,
                    scale: gsap.utils.random(0.5, 1.5),
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => particle.remove()
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            // Reset animations
            gsap.to(markerDot, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(markerDate, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(card, {
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // Add burst particle style
    const style = document.createElement('style');
    style.textContent = `
        .particle-burst {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ccff, #7cf03d);
            pointer-events: none;
            z-index: 10;
            transform: translate(-50%, -50%);
        }
    `;
    document.head.appendChild(style);

    // Floating icons animation
    gsap.to(".floating-icons i", {
        y: 20,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2
    });
});


// GSAP Animation for Services Section
document.addEventListener('DOMContentLoaded', function () {
    // Dynamic typing effect for title
    const dynamicWord = document.querySelector('.dynamic-word');
    const words = ['Services', 'Solutions', 'Expertise', 'Offerings'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        dynamicWord.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            // Change word
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(typeEffect, 1000);
        }
    }

    // Start typing effect
    setTimeout(typeEffect, 1500);

    // Animate icon pulses on hover
    const categoryIcons = document.querySelectorAll('.category-icon');
    categoryIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const pulse = icon.querySelector('.icon-pulse');
            pulse.style.animation = 'none';
            void pulse.offsetWidth; // Trigger reflow
            pulse.style.animation = 'pulse 3s infinite';
        });
    });

    // Intersection Observer for scroll animations
    const serviceCategories = document.querySelectorAll('.service-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    serviceCategories.forEach(category => {
        observer.observe(category);
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Background circles animation
    gsap.to('.circle-1', {
        x: 50,
        y: -30,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.circle-2', {
        x: -40,
        y: 40,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Header animation
    gsap.from('.services-header', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power2.out'
    });

    // Service items stagger animation
    gsap.utils.toArray('.service-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: i % 2 === 0 ? -30 : 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out'
        });
    });
});




// GSAP Animation for Skills Section
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Canvas Background
    const canvas = document.getElementById('skills-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Draw animated background
    function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw connecting lines animation
        const points = [];
        const pointCount = 15;

        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        // Draw connections
        ctx.lineWidth = 0.5;
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const opacity = 1 - (distance / 200);
                    ctx.strokeStyle = `rgba(0, 204, 255, ${opacity * 0.1})`;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }

        // Update points
        for (let i = 0; i < points.length; i++) {
            points[i].x += points[i].vx;
            points[i].y += points[i].vy;

            // Boundary check
            if (points[i].x < 0 || points[i].x > canvas.width) points[i].vx *= -1;
            if (points[i].y < 0 || points[i].y > canvas.height) points[i].vy *= -1;
        }

        requestAnimationFrame(drawBackground);
    }

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawBackground();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Section header animation
    gsap.from(".skills-title", {
        scrollTrigger: {
            trigger: ".skills",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".skills-subtitle", {
        scrollTrigger: {
            trigger: ".skills",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
    });

    // Skill boxes animation
    gsap.utils.toArray(".skill-box").forEach((box, i) => {
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.7)"
        });

        // Hover effect
        box.addEventListener('mouseenter', () => {
            gsap.to(box, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });

            // Create particle burst
            const particles = 5;
            for (let i = 0; i < particles; i++) {
                const particle = document.createElement('div');
                particle.className = 'skill-particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                box.appendChild(particle);

                gsap.to(particle, {
                    x: gsap.utils.random(-50, 50),
                    y: gsap.utils.random(-50, 50),
                    opacity: 0,
                    scale: gsap.utils.random(0.5, 1.5),
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => particle.remove()
                });
            }
        });

        box.addEventListener('mouseleave', () => {
            gsap.to(box, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Add skill particle style
    const style = document.createElement('style');
    style.textContent = `
        .skill-particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ccff, #7cf03d);
            pointer-events: none;
            z-index: 10;
            transform: translate(-50%, -50%);
        }
    `;
    document.head.appendChild(style);

    // Animate skill level bars on scroll
    gsap.utils.toArray(".level-bar").forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0%";

        ScrollTrigger.create({
            trigger: bar.parentElement.parentElement,
            start: "top 80%",
            onEnter: () => {
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
        });
    });
});

// GSAP Animation for Contact Section
// Contact Form Animation
document.addEventListener('DOMContentLoaded', function () {
    // Animate the "Made by" text
    const madeByText = document.querySelector('.made-by-text');
    const chars = madeByText.querySelectorAll('.char');

    chars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.1}s`;
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            console.log({ name, email, phone, subject, message });

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Animate contact form inputs on scroll
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".input-field", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".textarea-field", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out"
    });

    gsap.from(".submit-btn", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out"
    });

    gsap.from(".info-item", {
        scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Animate footer elements
    gsap.from(".made-by-text", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".social-link", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".footer-nav li", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".footer-copyright", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out"
    });

    // Contact canvas animation
    const contactCanvas = document.getElementById('contact-canvas');
    const contactCtx = contactCanvas.getContext('2d');

    function resizeContactCanvas() {
        contactCanvas.width = contactCanvas.offsetWidth;
        contactCanvas.height = contactCanvas.offsetHeight;
    }

    function initContactParticles() {
        const particles = [];
        const particleCount = Math.floor((contactCanvas.width * contactCanvas.height) / 10000);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * contactCanvas.width,
                y: Math.random() * contactCanvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                color: `rgba(0, 204, 255, ${Math.random() * 0.2 + 0.1})`
            });
        }

        return particles;
    }

    function animateContactParticles(particles) {
        contactCtx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > contactCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > contactCanvas.height) p.speedY *= -1;

            contactCtx.beginPath();
            contactCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            contactCtx.fillStyle = p.color;
            contactCtx.fill();
        });

        drawConnections(particles);

        requestAnimationFrame(() => animateContactParticles(particles));
    }

    function drawConnections(particles) {
        const maxDistance = 150;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    contactCtx.beginPath();
                    contactCtx.strokeStyle = `rgba(0, 204, 255, ${opacity * 0.05})`;
                    contactCtx.lineWidth = 0.5;
                    contactCtx.moveTo(p1.x, p1.y);
                    contactCtx.lineTo(p2.x, p2.y);
                    contactCtx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        resizeContactCanvas();
    });

    resizeContactCanvas();
    const particles = initContactParticles();
    animateContactParticles(particles);

    // Submit button particles
    const submitBtn = document.querySelector('.submit-btn');

    submitBtn.addEventListener('click', function () {
        const particles = this.querySelectorAll('.particle');
        particles.forEach(p => {
            p.style.animation = 'none';
            void p.offsetWidth; // Trigger reflow
            p.style.animation = null;
        });
    });
});