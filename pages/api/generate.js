export default async function handler(req, res) {
  const { name, role, project_type, deliverables, tone, contract_attached } = req.body;

  const prompt = `You are PitchPerfect AI. Generate a freelance proposal for a ${project_type} named ${name}, working as a ${role}.
Tone: ${tone}.
Deliverables: ${deliverables}.
Include standard clauses:
- Revisions included: 2
- Additional revisions: $150/hour
- Scope changes: Requires new quote
- Client delays: Extend timeline by equivalent delay
- Kill fee: 50% of remaining balance if cancelled
- IP transfer: Upon final payment
${contract_attached ? "Include mention of attached service agreement." : ""}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  res.status(200).json({ output: data.choices?.[0]?.message?.content || "No output generated." });
}