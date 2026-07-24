(function() {
  const STORAGE_KEY = 'aitoolhub_user';

  function getUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
  }
  function setUser(user) { localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); }
  function clearUser() { localStorage.removeItem(STORAGE_KEY); }

  async function signInWithOAuth(provider) {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else { alert('Sign in failed: ' + (data.error || 'Unknown error')); }
    } catch (err) {
      console.error('Sign in error:', err);
      alert('Sign in failed. Please try again.');
    }
  }

  async function signInWithEmail(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        closeModal();
        await checkSession();
      } else {
        if (data.error && data.error.toLowerCase().includes('invalid login credentials')) {
          showSignupStatus('Account not found. Please sign up first.', 'error');
          // Auto-switch to sign up after 2s
          setTimeout(() => switchToSignUp(), 2000);
        } else {
          alert(data.error || 'Sign in failed');
        }
      }
    } catch (err) {
      console.error('Email sign in error:', err);
      alert('Sign in failed. Please try again.');
    }
  }

  async function sendOtp(email) {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        document.getElementById('signup-step-email').setAttribute('hidden', '');
        document.getElementById('signup-step-code').removeAttribute('hidden');
        showSignupStatus('Code sent! Check your email.', 'success');
      } else {
        showSignupStatus(data.error || 'Failed to send code', 'error');
      }
    } catch (err) {
      showSignupStatus('Failed to send code. Try again.', 'error');
    }
  }

  async function createAccount(email, token, password) {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        closeModal();
        await checkSession();
      } else {
        showSignupStatus(data.error || 'Verification failed', 'error');
      }
    } catch (err) {
      showSignupStatus('Verification failed. Try again.', 'error');
    }
  }

  async function signOut() {
    await fetch('/api/auth/signout', { method: 'POST' });
    clearUser();
    updateUI(null);
  }

  async function checkSession() {
    const accessToken = document.cookie.match(/sb-access-token=([^;]+)/)?.[1];
    if (!accessToken) return;
    try {
      const configRes = await fetch('/api/auth/config');
      const config = await configRes.json();
      const res = await fetch(`${config.supabaseUrl}/auth/v1/user`, {
        headers: { Authorization: `Bearer ${accessToken}`, apikey: config.supabaseAnonKey },
      });
      if (res.ok) {
        const user = await res.json();
        setUser(user);
        updateUI(user);
      } else {
        clearUser();
        updateUI(null);
      }
    } catch { /* Silently fail */ }
  }

  function updateUI(user) {
    const btn = document.getElementById('signin-btn');
    if (!btn) return;
    if (user) {
      btn.textContent = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Account';
      btn.classList.add('logged-in');
      btn.title = 'Click to sign out';
    } else {
      btn.textContent = 'Sign in';
      btn.classList.remove('logged-in');
      btn.title = '';
    }
  }

  function closeModal() {
    const modal = document.getElementById('signin-modal');
    if (modal) modal.setAttribute('hidden', '');
  }

  function resetModal() {
    // Reset to sign-in view
    document.getElementById('signin-form-view')?.removeAttribute('hidden');
    document.getElementById('signup-form-view')?.setAttribute('hidden', '');
    // Reset signup steps
    document.getElementById('signup-step-email')?.removeAttribute('hidden');
    document.getElementById('signup-step-code')?.setAttribute('hidden', '');
    // Clear all form fields
    document.querySelectorAll('.signin-email-form input, .signup-step input').forEach(i => i.value = '');
    document.getElementById('send-code-status') && (document.getElementById('send-code-status').textContent = '');
    document.getElementById('create-account-status') && (document.getElementById('create-account-status').textContent = '');
  }

  function switchToSignUp() {
    document.getElementById('signin-form-view')?.setAttribute('hidden', '');
    document.getElementById('signup-form-view')?.removeAttribute('hidden');
    // Reset signup steps
    document.getElementById('signup-step-email')?.removeAttribute('hidden');
    document.getElementById('signup-step-code')?.setAttribute('hidden', '');
    document.querySelectorAll('#signup-form-view input').forEach(i => i.value = '');
  }

  function switchToSignIn() {
    document.getElementById('signup-form-view')?.setAttribute('hidden', '');
    document.getElementById('signin-form-view')?.removeAttribute('hidden');
    document.querySelectorAll('#signin-form-view input').forEach(i => i.value = '');
  }

  function showSignupStatus(msg, type) {
    const el = document.getElementById('create-account-status');
    if (el) {
      el.textContent = msg;
      el.style.color = type === 'error' ? '#ef4444' : '#22c55e';
    }
  }

  let pendingEmail = '';

  function init() {
    const btn = document.getElementById('signin-btn');
    const modal = document.getElementById('signin-modal');
    const close = document.getElementById('signin-modal-close');
    const overlay = modal?.querySelector('.signin-modal-overlay');

    if (!btn || !modal) return;

    btn.addEventListener('click', () => {
      if (getUser()) { signOut(); }
      else { resetModal(); modal.removeAttribute('hidden'); }
    });

    close?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
    });

    // GitHub buttons
    document.getElementById('github-signin-btn')?.addEventListener('click', () => signInWithOAuth('github'));
    document.getElementById('github-signup-btn')?.addEventListener('click', () => signInWithOAuth('github'));

    // Switch views
    document.getElementById('switch-to-signup')?.addEventListener('click', (e) => { e.preventDefault(); switchToSignUp(); });
    document.getElementById('switch-to-signin')?.addEventListener('click', (e) => { e.preventDefault(); switchToSignIn(); });

    // Email sign-in
    document.getElementById('email-signin-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signin-email').value;
      const password = document.getElementById('signin-password').value;
      signInWithEmail(email, password);
    });

    // Send OTP
    document.getElementById('send-code-btn')?.addEventListener('click', () => {
      const email = document.getElementById('signup-email').value;
      if (!email) { showSignupStatus('Please enter your email first', 'error'); return; }
      pendingEmail = email;
      sendOtp(email);
    });

    // Create account with OTP
    document.getElementById('create-account-btn')?.addEventListener('click', () => {
      const token = document.getElementById('signup-code').value;
      const password = document.getElementById('signup-password').value;
      if (!token || !password) { showSignupStatus('Please fill in all fields', 'error'); return; }
      if (password.length < 6) { showSignupStatus('Password must be at least 6 characters', 'error'); return; }
      createAccount(pendingEmail, token, password);
    });

    // Allow Enter key on OTP/password fields
    document.getElementById('signup-password')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('create-account-btn').click();
    });

    checkSession();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();