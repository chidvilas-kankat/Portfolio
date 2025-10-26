// ============================================
// PORTFOLIO PAGE JAVASCRIPT - portfolio.js
// Handles project filtering
// ============================================

(function() {
  'use strict';

  // ============================================
  // PROJECT FILTERING
  // ============================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active tab
      filterTabs.forEach(function(t) {
        t.classList.remove('active');
      });
      this.classList.add('active');

      // Filter projects
      projectCards.forEach(function(card) {
        const category = card.getAttribute('data-category');

        if (filter === 'all') {
          card.classList.remove('hidden');
          // Add fade-in animation
          card.style.animation = 'fadeIn 0.5s ease-out';
        } else if (category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

})();