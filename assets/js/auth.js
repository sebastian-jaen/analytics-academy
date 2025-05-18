const loginPanel  = document.getElementById('login-container');
const signupPanel = document.getElementById('signup-container');

document
  .getElementById('create-account-btn')
      .addEventListener('click', () => {
        loginPanel.style.display  = 'none';
        signupPanel.style.display = 'block';
        clearMessages();
      });

    document
      .getElementById('back-to-login-btn')
      .addEventListener('click', () => {
        signupPanel.style.display = 'none';
        loginPanel.style.display  = 'block';
        clearMessages();
      });

    // Signup form handler…
    document.getElementById('signup-form')
      .addEventListener('submit', function(e) {
        /* … your signup logic … */
      });

    function clearMessages() {
      document.getElementById('signup-message').textContent = '';
      document.getElementById('login-message').textContent  = '';
    }