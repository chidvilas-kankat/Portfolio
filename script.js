// ============================================
// GLOBAL JAVASCRIPT - script.js
// Handles sidebar navigation and common functionality
// ============================================

(function() {
  'use strict';

  // ============================================
  // SIDEBAR MENU TOGGLE (Mobile)
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const navItems = document.querySelectorAll('.nav-item');

  // Toggle sidebar on hamburger click
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
      
      // Update hamburger icon
      const icon = this.querySelector('i');
      if (sidebar.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close sidebar when overlay is clicked
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      this.classList.remove('active');
      
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  }

  // Close sidebar when nav item is clicked (mobile)
  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // ============================================
  // HIGHLIGHT ACTIVE PAGE
  // ============================================
  function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(function(link) {
      const linkPage = link.getAttribute('href');
      
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === '/' && linkPage === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Set active page on load
  setActivePage();

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
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

  // ============================================
  // WINDOW RESIZE HANDLER
  // ============================================
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close sidebar if window is resized to desktop
      if (window.innerWidth >= 768) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }, 250);
  });

  // ============================================
  // FADE IN ANIMATION ON SCROLL
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.about-section, .resume-section, .project-card, .service-card').forEach(function(section) {
    observer.observe(section);
  });

})();