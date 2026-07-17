/**
 * Submit Prompt API
 * POST /api/submit-prompt
 * Body: { title, tool, category, prompt, tags, author, email }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const data = req.body || {};
  if (!data.title || !data.prompt) {
    return res.status(400).json({ error: 'Title and prompt are required' });
  }
  console.log('Prompt submission:', JSON.stringify(data));
  // TODO: Save to database or forward to email when configured
  return res.status(200).json({ success: true, message: 'Prompt submission received. We will review it within 2-3 business days.' });
}
