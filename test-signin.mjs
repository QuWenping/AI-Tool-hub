// Debug script to test GitHub OAuth sign-in
const testSignIn = async () => {
  try {
    const res = await fetch('http://localhost:4322/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: 'github' }),
      credentials: 'include',
    });
    
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.url) {
      console.log('OAuth URL:', data.url);
    } else if (data.error) {
      console.error('Error:', data.error);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
};

testSignIn();
