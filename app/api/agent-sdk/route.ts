// import { NextRequest } from "next/server";
// import { fetchQuery } from "convex/nextjs";
// import { api } from "@/convex/_generated/api";

// export async function POST(req:NextRequest) {
//     const { userId, agentId, userInput } = await req.json();

//     const agentDetail=await fetchQuery(api.agent.GetAgentById,{
//         agentId:agentId
//     })

//     //check if conversationId exist?
//     let conversationId_ = null;
//     const conversationDetail=await fetchQuery(api.conversation.GetConversationById,{
//         agentId:agentDetail._id,
//         userId:userId
//     })

//     conversationId_=conversationDetail?.conversationId;
//     if(!conversationDetail.conversationId){
//         //create new conversation
//         const conversationId = crypto.randomUUID();
//         conversationId_= conversationId;
//     }


//     // ─── Helper: stream plain text back to the client ───────────────────────
//     const streamText = (text: string) => {
//       const encoder = new TextEncoder();
//       const stream = new ReadableStream({
//         start(controller) {
//           controller.enqueue(encoder.encode(text));
//           controller.close();
//         },
//       });
//       return new Response(stream);
//     };

//     // ─── Helper: call a tool and return weather text ─────────────────────────
//     const callWeatherTool = async (selectedTool: any, city: string) => {
//       // BUG FIX 1: URL uses single braces {cityName}, not double {{cityName}}
//       let url = selectedTool.url.replace(
//         `{cityName}`,
//         encodeURIComponent(city)
//       );

//       if (selectedTool.includeApiKey && selectedTool.apiKey) {
//         url += url.includes("?")
//           ? `&key=${selectedTool.apiKey}`
//           : `?key=${selectedTool.apiKey}`;
//       }

//       console.log("🌍 FINAL CITY:", city);
//       console.log("🌍 FINAL URL:", url);

//       const apiRes = await fetch(url);
//       const apiData = await apiRes.json();

//       // BUG FIX 3: Return plain text, not JSON (frontend streams the response)
//       if (!apiData || apiData.error) {
//         const errMsg =
//           apiData?.error?.message || "Unknown error from Weather API";
//         return `❌ Weather API Error: ${errMsg}`;
//       }

//       return `
// 🌤  Weather in ${apiData.location.name}, ${apiData.location.country}

// 🌡  Temperature: ${apiData.current.temp_c}°C
// 🤒 Feels Like: ${apiData.current.feelslike_c}°C
// 💧 Humidity: ${apiData.current.humidity}%
// 🌬 Wind: ${apiData.current.wind_kph} kph
// ☁  Condition: ${apiData.current.condition.text}
//       `.trim();
//     };

//     // ─── Build Gemini system prompt ──────────────────────────────────────────
//     const systemPrompt = `
// You are a helpful AI Agent called "${agentName}".

// You have access to the following tools:

// ${tools
//   .map(
//     (t: any) => `
// Tool Name: ${t.name}
// Description: ${t.description}
// Parameters: ${JSON.stringify(t.parameters)}

// If you need to use this tool, respond ONLY with this exact JSON (no extra text):
// {
//   "tool": "${t.name}",
//   "params": {
//     ${Object.keys(t.parameters)
//       .map((p) => `"${p}": "<value>"`)
//       .join(",\n    ")}
//   }
// }
// `
//   )
//   .join("\n")}

// If NO tool is needed, just respond normally in plain text.

// USER QUERY: ${userInput}
//     `.trim();

//     // ─── Call Gemini ─────────────────────────────────────────────────────────
//     const geminiRes = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: systemPrompt }] }],
//         }),
//       }
//     );

//     const data = await geminiRes.json();
//     let output: string =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     // Strip markdown code fences Gemini sometimes wraps around JSON
//     output = output
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     console.log("🧠 Clean Output:", output);

//     if (!output) {
//       return streamText("❌ Sorry, I got an empty response. Please try again.");
//     }

//     // ─── Try to parse as tool call ───────────────────────────────────────────
//     let parsed: { tool: string; params: Record<string, string> } | null = null;

//     try {
//       parsed = JSON.parse(output);
//       console.log("🧠 Parsed:", parsed);
//     } catch {
//       console.log("ℹ️ Not a JSON tool call, treating as plain text.");
//     }

//     // ─── Execute tool if Gemini requested one ────────────────────────────────
//     if (parsed?.tool && tools.length > 0) {
//       const selectedTool =
//         tools.find((t: any) =>
//           t.name.toLowerCase() === parsed!.tool.toLowerCase()
//         ) || tools[0];

//       // Extract city from params — only fall back to input if params empty
//       const rawCity =
//         parsed.params?.cityName ||
//         parsed.params?.location ||
//         parsed.params?.q ||
//         "";

//       // If Gemini gave us a city use it; otherwise try to parse from input
//       const city =
//         rawCity.trim() ||
//         userInput
//           .toLowerCase()
//           .replace(/weather|in|of|for|the|what|is|tell|me|about/g, "")
//           .trim() ||
//         "London"; // last-resort fallback

//       const weatherText = await callWeatherTool(selectedTool, city);

//       // BUG FIX 2: Was missing — must return here or it falls through!
//       return streamText(weatherText);
//     }

//     // ─── Plain text response ─────────────────────────────────────────────────
//     return streamText(output);
//   } catch (error: any) {
//     console.error("❌ Agent Chat Error:", error);
//     // BUG FIX 3: Stream error as plain text so frontend renders it cleanly
//     const encoder = new TextEncoder();
//     const stream = new ReadableStream({
//       start(controller) {
//         controller.enqueue(
//           encoder.encode(`❌ Server Error: ${error.message}`)
//         );
//         controller.close();
//       },
//     });

//     return new Response(stream, { status: 200 }); // keep 200 so stream is read
// }

import { NextRequest, NextResponse } from "next/server";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function POST(req: NextRequest) {
  try {
    const { userId, agentId, userInput } = await req.json();

    // ─── Fetch agent from DB ─────────────────────────────────────────────────
    const agentDetail = await fetchQuery(api.agent.GetAgentById, { agentId });

    if (!agentDetail) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // ─── Pull tools + agentName from stored config ───────────────────────────
    const toolConfig = agentDetail?.agentToolConfig;
    const tools: any[] = toolConfig?.tools ?? toolConfig?.parsedJson?.tools ?? [];
    const agents: any[] = toolConfig?.agents ?? toolConfig?.parsedJson?.agents ?? [];
    const agentName: string = agentDetail?.name ?? "AI Agent";

    console.log("🧠 TOOLS RECEIVED:", tools);

    // ─── Conversation ID ─────────────────────────────────────────────────────
    let conversationId: string;

    // BUG FIX: conversationDetail can be null — guard against that
    const conversationDetail = await fetchQuery(api.conversation.GetConversationById, {
      agentId: agentDetail._id,
      userId: userId,
    });

    if (conversationDetail?.conversationId) {
      conversationId = conversationDetail.conversationId;
    } else {
      conversationId = crypto.randomUUID();
      // Optionally save the new conversationId to DB here
    }

    // ─── Helper: stream plain text back to the client ────────────────────────
    const streamText = (text: string) => {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(text));
          controller.close();
        },
      });
      return new Response(stream);
    };

    // ─── Helper: call a tool and return weather text ──────────────────────────
    const callWeatherTool = async (selectedTool: any, city: string) => {
      // Single braces {cityName} in URL template
      let url = selectedTool.url.replace(`{cityName}`, encodeURIComponent(city));

      if (selectedTool.includeApiKey && selectedTool.apiKey) {
        url += url.includes("?")
          ? `&key=${selectedTool.apiKey}`
          : `?key=${selectedTool.apiKey}`;
      }

      console.log("🌍 FINAL CITY:", city);
      console.log("🌍 FINAL URL:", url);

      const apiRes = await fetch(url);
      const apiData = await apiRes.json();

      if (!apiData || apiData.error) {
        const errMsg = apiData?.error?.message || "Unknown error from Weather API";
        return `❌ Weather API Error: ${errMsg}`;
      }

      return `
🌤  Weather in ${apiData.location.name}, ${apiData.location.country}

🌡  Temperature: ${apiData.current.temp_c}°C
🤒 Feels Like: ${apiData.current.feelslike_c}°C
💧 Humidity: ${apiData.current.humidity}%
🌬 Wind: ${apiData.current.wind_kph} kph
☁  Condition: ${apiData.current.condition.text}
      `.trim();
    };

    // ─── Build Gemini system prompt ──────────────────────────────────────────
    const systemPrompt = `
You are a helpful AI Agent called "${agentName}".

You have access to the following tools:

${tools
  .map(
    (t: any) => `
Tool Name: ${t.name}
Description: ${t.description}
Parameters: ${JSON.stringify(t.parameters)}

If you need to use this tool, respond ONLY with this exact JSON (no extra text):
{
  "tool": "${t.name}",
  "params": {
    ${Object.keys(t.parameters)
      .map((p) => `"${p}": "<value>"`)
      .join(",\n    ")}
  }
}
`
  )
  .join("\n")}

If NO tool is needed, just respond normally in plain text.

USER QUERY: ${userInput}
    `.trim();

    // ─── Call Gemini ─────────────────────────────────────────────────────────
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
        }),
      }
    );

    const data = await geminiRes.json();
    let output: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip markdown code fences Gemini sometimes adds
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    console.log("🧠 Clean Output:", output);

    if (!output) {
      return streamText("❌ Sorry, I got an empty response. Please try again.");
    }

    // ─── Try to parse as tool call ───────────────────────────────────────────
    let parsed: { tool: string; params: Record<string, string> } | null = null;

    try {
      parsed = JSON.parse(output);
      console.log("🧠 Parsed:", parsed);
    } catch {
      console.log("ℹ️ Not a JSON tool call, treating as plain text.");
    }

    // ─── Execute tool if Gemini requested one ────────────────────────────────
    if (parsed?.tool && tools.length > 0) {
      const selectedTool =
        tools.find((t: any) =>
          t.name.toLowerCase() === parsed!.tool.toLowerCase()
        ) || tools[0];

      const rawCity =
        parsed.params?.cityName ||
        parsed.params?.location ||
        parsed.params?.q ||
        "";

      const city =
        rawCity.trim() ||
        userInput
          .toLowerCase()
          .replace(/weather|in|of|for|the|what|is|tell|me|about/g, "")
          .trim() ||
        "London";

      const weatherText = await callWeatherTool(selectedTool, city);
      return streamText(weatherText);
    }

    // ─── Plain text response ─────────────────────────────────────────────────
    return streamText(output);

  } catch (error: any) {
    console.error("❌ Agent Chat Error:", error);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`❌ Server Error: ${error.message}`));
        controller.close();
      },
    });
    return new Response(stream, { status: 200 });
  }
}

// ─── Conversation ID generator ────────────────────────────────────────────────
export async function GET() {
  const conversationId = crypto.randomUUID();
  return NextResponse.json(conversationId);
}