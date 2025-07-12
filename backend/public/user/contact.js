 // Form Validation
        (function() {
            'use strict';
            
            const form = document.getElementById('contactForm');
            
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                form.classList.add('was-validated');
                
                if (form.checkValidity()) {
                    // Form is valid - you can add AJAX submission here
                    event.preventDefault();
                    alert('Thank you for your message! We will contact you soon.');
                    form.reset();
                    form.classList.remove('was-validated');
                }
            }, false);
            
            // Phone number validation
            const phoneInput = document.getElementById('phone');
            phoneInput.addEventListener('input', function() {
                this.setCustomValidity('');
                if (!this.validity.valid) {
                    this.setCustomValidity('Please enter a valid phone number');
                }
            });
            
            // Scroll Animation
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animateElements.forEach(el => observer.observe(el));
        })();
        // navbar
        
      AOS.init({ once: true, duration: 800 });

      function toggleMenu() {
        document.getElementById("navLinks").classList.toggle("show");
      }

      function closeMenu() {
        document.getElementById("navLinks").classList.remove("show");
        document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));
      }

      function toggleDropdown(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          const content = e.target.nextElementSibling;
          const isOpen = content.classList.contains("show");
          document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));
          if (!isOpen) content.classList.add("show");
        }
      }
