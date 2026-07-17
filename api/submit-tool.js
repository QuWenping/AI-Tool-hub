/**
 * Submit AI Tool API
 * POST /api/submit-tool
 * Body: { name, url, category, description, pricing, email, affiliation, notes }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const data = req.body || {};
  if (!data.name || !data.url) {
    return res.status(400).json({ error: 'Tool name and URL are required' });
  }
  console.log('Tool submission:', JSON.stringify(data));
  // TODO: Save to database or forward to email when configured
  return res.status(200).json({ success: true, message: 'Tool submission received. We will review it within 3-5 business days.' });
}
