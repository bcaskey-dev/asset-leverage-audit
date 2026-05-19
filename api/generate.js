export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { intake } = req.body;
  if (!intake) return res.status(400).json({ error: 'No intake data provided' });

  const firstName = intake.firstName || 'Friend';

  const prompt = `Based on the following hot seat audit answers from a salesperson named ${firstName}, produce a comprehensive, personalized Asset Leverage Plan.

AUDIT INTAKE:
${Object.entries(intake).map(([k, v]) => `${k}: ${v}`).join('\n')}

REPORT STRUCTURE — write in this exact order:

---
SECTION 1: CURRENT REALITY SNAPSHOT
2–3 sentences. Name the real situation this person is in — not what they said, but what's actually happening beneath the surface. Be direct and empathetic. Use their first name.

---
SECTION 2: THE ASSET INVENTORY — WHAT YOU'RE SITTING ON
List every meaningful asset you can identify from their answers. Group into:
• Knowledge Assets
• Relationship Assets
• Content & Digital Assets
• Technology Assets
• Time Assets (hours currently wasted that could be redirected)

For each asset, write: Asset name — one sentence on what it is and why it matters.

---
SECTION 3: TOP 3 UNDERDEPLOYED ASSETS
Pick the three with the highest leverage potential. For each:
Asset name
Why underdeployed: (1–2 sentences)
What it could produce: (specific, tangible — leads, revenue, conversations)
The gap: (what's missing that's preventing deployment)

---
SECTION 4: THE 90-DAY ACTIVATION SEQUENCE
Month 1 — Foundation: 2–3 specific actions to activate the #1 asset. Be concrete. Name the asset.
Month 2 — Momentum: 2–3 actions to layer in the #2 and #3 assets.
Month 3 — Scale: 2–3 actions to systematize and multiply what's working.

Each action should be a single sentence starting with a verb.

---
SECTION 5: THE BILL CASKEY CHALLENGE
2–3 sentences. Speak directly to ${firstName}. Name the one mindset shift or identity shift that will determine whether this plan works or sits in a folder. Make it personal, direct, and slightly uncomfortable. End with one question they should sit with.

---
Keep total output under 800 words. Use plain text only — no markdown symbols, no asterisks, no hashtags. Write in Bill Caskey's voice: direct, philosophical, warm, a little provocative. Sign off with UPWARD.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    res.status(200).json({ report: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
}
