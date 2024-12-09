function toggleForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
  
    if (formType === 'login') {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      loginBtn.classList.add('active');
      signupBtn.classList.remove('active');
    } else {
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      signupBtn.classList.add('active');
      loginBtn.classList.remove('active');
    }
  }