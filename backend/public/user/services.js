
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

  