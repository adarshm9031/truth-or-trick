import { NextRequest, NextResponse } from "next/server";

type AiRound = {
  statement: string;
  isTruth: boolean;
  explanation: string;
};

export async function POST(_req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENAI_API_KEY is not set. Add it in your Vercel project settings."
        },
        { status: 500 }
      );
    }

    const systemPrompt = `
You are powering a game called "Truth or Trick".
Your job is to generate short, punchy statements and secretly decide whether
they are factual (truth) or intentionally misleading (trick).

Rules:
- Domains: technology, science, internet culture, everyday life, fun trivia.
- Length: 1–2 sentences.
- Difficulty: light to medium. The player should be able to guess, not need a PhD.
- Mix of clearly true, clearly false, and subtle misleading details.
- No offensive, NSFW, political, or harmful content.
- The explanation must clarify why the statement is true or false, and if there
  is nuance or oversimplification, briefly mention it.

You must respond ONLY with valid JSON using this exact shape:
{
  "statement": "string",
  "isTruth": true or false,
  "explanation": "string"
}
No markdown, no extra keys, no commentary.
`.trim();

    const userPrompt = `
Generate one new statement for a fresh round of the game.
`.trim();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.9,
        max_tokens: 250
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenAI error:", text);
      return NextResponse.json(
        { error: "AI request failed. Please try again." },
        { status: 500 }
      );
    }

    const json = await response.json();

    const content =
      json.choices?.[0]?.message?.content ?? "";

    if (!content || typeof content !== "string") {
      console.error("Unexpected OpenAI content:", json);
      return NextResponse.json(
        { error: "Unexpected AI response format." },
        { status: 500 }
      );
    }

    let parsed: AiRound;
    try {
      parsed = JSON.parse(content) as AiRound;
    } catch (err) {
      console.error("Failed to parse AI JSON:", err, content);
      return NextResponse.json(
        { error: "Could not parse AI response. Please try again." },
        { status: 500 }
      );
    }

    if (
      !parsed.statement ||
      typeof parsed.statement !== "string" ||
      typeof parsed.isTruth !== "boolean" ||
      !parsed.explanation ||
      typeof parsed.explanation !== "string"
    ) {
      console.error("AI JSON missing fields:", parsed);
      return NextResponse.json(
        { error: "AI response missing fields. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}
