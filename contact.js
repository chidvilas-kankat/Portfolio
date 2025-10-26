// ============================================
// CONTACT PAGE JAVASCRIPT - contact.js
// Handles form validation and submission
// ============================================

(function() {
  'use strict';

  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form inputs
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Get error spans
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      messageInput.classList.remove('error');

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        nameInput.classList.add('error');
        isValid = false;
      }

      // Validate email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        emailInput.classList.add('error');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Email is invalid';
        emailInput.classList.add('error');
        isValid = false;
      }

      // Validate message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required';
        messageInput.classList.add('error');
        isValid = false;
      }

      // If form is valid, show success message
      if (isValid) {
        // Hide form
        contactForm.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';

        // Reset form after 3 seconds
        setTimeout(function() {
          contactForm.style.display = 'block';
          successMessage.style.display = 'none';
          contactForm.reset();
        }, 3000);
      }
    });

    // Real-time validation - clear errors as user types
    const inputs = [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')];
    const errors = [document.getElementById('nameError'), document.getElementById('emailError'), document.getElementById('messageError')];

    inputs.forEach(function(input, index) {
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          errors[index].textContent = '';
          this.classList.remove('error');
        }
      });
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

})();