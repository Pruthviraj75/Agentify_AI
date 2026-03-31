import { NextRequest, NextResponse } from "next/server";

const PROPMT = `from this flow, Generate a agent instruction propmt with all details along with tools with all setting info in JSON format.
Do not add any extra text just written JSON data. make sure to mentioned parameters depends on Get or post request.    
only:{ systemPropmt:'',primaryAgentName:'', "agents": [ { "id": "agent-id", "name": "", "model": "", "includeHistory": true|false,
"output": "", "tools": ["toold-id"], "instruction": ""}, ], "tools": [ { "id": "id", "name": "", "description": "", "method": "GET"|'POST',
"url": "", "includeApiKey":true, "apiKey": "", "parameters": { "key": "dataType" }, "usage": [], "assignedAgent": "" } ]}`;

export async function POST(req: NextRequest) {
  try {
    const { jsonConfig } = await req.json();

    const prompt = JSON.stringify(jsonConfig) + PROPMT;

    const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    // 🔍 DEBUG (keep this for now)
    console.log("Gemini RAW response:", JSON.stringify(data));
    console.log("Gemini RAW response:", data);

    let outputText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!outputText) {
      return NextResponse.json(
        { error: "Empty response from Gemini", raw: data },
        { status: 500 }
      );
    }

    // Clean markdown
    outputText = outputText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedJson;
    try {
      parsedJson = JSON.parse(outputText);
    } catch (error) {
      console.error("❌ JSON Parse Error:", outputText);
      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: outputText },
        { status: 500 }
      );
    }

    return NextResponse.json({ parsedJson });

  } catch (error: any) {
    console.error("❌ Gemini Fetch Error:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}