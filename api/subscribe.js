/**
 * Newsletter subscription API
 * POST /api/subscribe
 * Body: { email: "user@example.com" }
 * 
 * Storage options (set env vars on Vercel):
 * - BUTTONDOWN_API_KEY: forwards to Buttondown.email newsletter service
 * - KV_REST_API_URL + KV_REST_API_TOKEN: saves to Vercel KV
 * - Fallback: logs to console (check Vercel function logs)
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  // Validate email
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  console.log('Newsletter subscription:', email);

  // Option 1: Forward to Buttondown if API key is set
  if (process.env.BUTTONDOWN_API_KEY) {
    try {
      const bdRes = await fetch('https://api.buttondown.email/api/v1/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (bdRes.ok) {
        return res.status(200).json({ success: true, message: 'Subscribed via Buttondown', email });
      }
      // If already subscribed, Buttondown returns 400
      if (bdRes.status === 400) {
        return res.status(200).json({ success: true, message: 'Already subscribed', email });
      }
    } catch (e) {
      console.error('Buttondown error:', e.message);
    }
  }

  // Option 2: Save to Vercel KV if configured
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const kvRes = await fetch(`${process.env.KV_REST_API_URL}/set/nl_${Date.now()}_${email}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, date: new Date().toISOString() }),
      });
      if (kvRes.ok) {
        return res.status(200).json({ success: true, message: 'Subscribed successfully', email });
      }
    } catch (e) {
      console.error('KV error:', e.message);
    }
  }

  // Option 3: Log to console (visible in Vercel function logs)
  console.log('NEW SUBSCRIBER:', email, new Date().toISOString());

  // Return success regardless — the email is logged
  return res.status(200).json({ success: true, message: 'Subscription received', email });
}
