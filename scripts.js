document.addEventListener("DOMContentLoaded", function() {
    // Image rotation functionality
    const images = [
        'images/pfp1.png',
        'images/pfp2.png',
        'images/pfp3.png'
    ];

    let currentIndex = 0;
    const rotatingImage = document.querySelector('.rotating-image');

    if (rotatingImage) {
        function rotateImage() {
            currentIndex = (currentIndex + 1) % images.length;
            rotatingImage.style.opacity = '0';
            
            setTimeout(() => {
                rotatingImage.src = images[currentIndex];
                rotatingImage.style.opacity = '1';
            }, 300);
        }

        rotatingImage.onload = () => {
            rotatingImage.style.opacity = '1';
        };
        
        rotatingImage.onerror = () => {
            console.error("Image failed to load:", rotatingImage.src);
            // Fallback to first image if current fails
            if (currentIndex !== 0) {
                currentIndex = 0;
                rotatingImage.src = images[0];
            }
        };

        // Start rotation after initial load
        setTimeout(() => {
            setInterval(rotateImage, 4000); // Change image every 4 seconds
        }, 2000);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading state
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
        }
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all row elements for animation
    const rowElements = document.querySelectorAll('.row');
    rowElements.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(row);
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-button, .social-links a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});
