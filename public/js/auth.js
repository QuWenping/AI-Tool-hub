(function() {
  const STORAGE_KEY = 'aitoolhub_user';

  function getUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
  }
  function setUser(user) { localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); }
  function clearUser() { localStorage.removeItem(STORAGE_KEY); }

  async function signInWithOAuth(provider) {
    try {
      console.log(`[Auth] Starting ${provider} OAuth sign-in...`);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider }),
        credentials: 'include',
      });

      console.log(`[Auth] Response status: ${res.status}`);
      const data = await res.json();
      console.log(`[Auth] Response data:`, data);

      if (data.url) {
        console.log(`[Auth] Redirecting to OAuth provider...`);
        window.location.href = data.url;
      } else if (data.error) {
        console.error(`[Auth] OAuth error:`, data.error);
        const errorMsg = data.details || data.error || 'Unknown error';
        alert(`Sign in failed:\n\n${errorMsg}\n\nPlease check:\n1. GitHub OAuth app is enabled in Supabase\n2. Callback URL matches your domain`);
      } else {
        console.error(`[Auth] Unexpected response:`, data);
        alert('Sign in failed: Unexpected response from server');
      }
    } catch (err) {
      console.error('[Auth] Exception:', err);
      alert(`Sign in failed:\n\n${err.message}`);
    }
  }

  async function signInWithEmail(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        closeModal();
        resetModal();
        await checkSession();
      } else {
        if (data.error && data.error.toLowerCase().includes('invalid')) {
          const signupStatus = document.getElementById('create-account-status');
          if (signupStatus) {
            signupStatus.textContent = 'Account not found. Please sign up first.';
            signupStatus.style.color = '#ef4444';
          }
          setTimeout(() => switchToSignUp(), 2000);
        } else {
          const signupStatus = document.getElementById('create-account-status');
          if (signupStatus) {
            signupStatus.textContent = data.error || 'Sign in failed';
            signupStatus.style.color = '#ef4444';
          }
        }
      }
    } catch (err) {
      console.error('Email sign in error:', err);
      const signupStatus = document.getElementById('create-account-status');
      if (signupStatus) {
        signupStatus.textContent = 'Network error. Please try again.';
        signupStatus.style.color = '#ef4444';
      }
    }
  }

  async function sendOtp(email) {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        document.getElementById('signup-step-email').setAttribute('hidden', '');
        document.getElementById('signup-step-code').removeAttribute('hidden');
        const status = document.getElementById('send-code-status');
        if (status) {
          status.textContent = 'Code sent! Check your email.';
          status.style.color = '#22c55e';
        }
        setTimeout(() => {
          if (status) status.textContent = '';
        }, 5000);
      } else {
        const status = document.getElementById('send-code-status');
        if (status) {
          status.textContent = data.error || 'Failed to send code';
          status.style.color = '#ef4444';
        }
      }
    } catch (err) {
      const status = document.getElementById('send-code-status');
      if (status) {
        status.textContent = 'Network error. Try again.';
        status.style.color = '#ef4444';
      }
    }
  }

  async function createAccount(email, token, password) {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        closeModal();
        resetModal();
        await checkSession();
      } else {
        const status = document.getElementById('create-account-status');
        if (status) {
          status.textContent = data.error || 'Verification failed';
          status.style.color = '#ef4444';
        }
      }
    } catch (err) {
      const status = document.getElementById('create-account-status');
      if (status) {
        status.textContent = 'Network error. Try again.';
        status.style.color = '#ef4444';
      }
    }
  }

  async function signOut() {
    try {
      await fetch('/api/auth/signout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Sign out error:', err);
    }
    clearUser();
    updateUI(null);
  }

  async function checkSession() {
    try {
      const sessionRes = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      });

      if (sessionRes.ok) {
        const { user } = await sessionRes.json();
        if (user) {
          setUser(user);
          updateUI(user);
        } else {
          clearUser();
          updateUI(null);
        }
      } else {
        clearUser();
        updateUI(null);
      }
    } catch (err) {
      console.error('Session check error:', err);
      clearUser();
      updateUI(null);
    }
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
    document.getElementById('signin-form-view')?.removeAttribute('hidden');
    document.getElementById('signup-form-view')?.setAttribute('hidden', '');
    document.getElementById('signup-step-email')?.removeAttribute('hidden');
    document.getElementById('signup-step-code')?.setAttribute('hidden', '');
    document.querySelectorAll('.signin-email-form input, .signup-step input').forEach(i => i.value = '');
    document.getElementById('send-code-status') && (document.getElementById('send-code-status').textContent = '');
    document.getElementById('create-account-status') && (document.getElementById('create-account-status').textContent = '');
  }

  function switchToSignUp() {
    document.getElementById('signin-form-view')?.setAttribute('hidden', '');
    document.getElementById('signup-form-view')?.removeAttribute('hidden');
    document.getElementById('signup-step-email')?.removeAttribute('hidden');
    document.getElementById('signup-step-code')?.setAttribute('hidden', '');
    document.querySelectorAll('#signup-form-view input').forEach(i => i.value = '');
  }

  function switchToSignIn() {
    document.getElementById('signup-form-view')?.setAttribute('hidden', '');
    document.getElementById('signin-form-view')?.removeAttribute('hidden');
    document.querySelectorAll('#signin-form-view input').forEach(i => i.value = '');
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
    document.getElementById('github-signin-btn')?.addEventListener('click', () => {
      console.log('[UI] GitHub sign-in button clicked');
      signInWithOAuth('github');
    });
    document.getElementById('github-signup-btn')?.addEventListener('click', () => {
      console.log('[UI] GitHub sign-up button clicked');
      signInWithOAuth('github');
    });

    // Switch views
    document.getElementById('switch-to-signup')?.addEventListener('click', (e) => {
      e.preventDefault();
      switchToSignUp();
    });
    document.getElementById('switch-to-signin')?.addEventListener('click', (e) => {
      e.preventDefault();
      switchToSignIn();
    });

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
      if (!email) {
        const status = document.getElementById('send-code-status');
        if (status) {
          status.textContent = 'Please enter your email first';
          status.style.color = '#ef4444';
        }
        return;
      }
      pendingEmail = email;
      sendOtp(email);
    });

    // Create account with OTP
    document.getElementById('create-account-btn')?.addEventListener('click', () => {
      const token = document.getElementById('signup-code').value;
      const password = document.getElementById('signup-password').value;
      if (!token || !password) {
        const status = document.getElementById('create-account-status');
        if (status) {
          status.textContent = 'Please fill in all fields';
          status.style.color = '#ef4444';
        }
        return;
      }
      if (password.length < 6) {
        const status = document.getElementById('create-account-status');
        if (status) {
          status.textContent = 'Password must be at least 6 characters';
          status.style.color = '#ef4444';
        }
        return;
      }
      createAccount(pendingEmail, token, password);
    });

    // Allow Enter key on password field
    document.getElementById('signup-password')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('create-account-btn').click();
    });

    // Auto-redirect from auth callback
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
      const error = urlParams.get('error');
      alert('Authentication failed: ' + error);
      window.history.replaceState({}, '', window.location.pathname);
    }

    checkSession();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
