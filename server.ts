import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily to prevent crash if key is missing during startup
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI interactions will return fallback responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API for SUHX-AI twin chat
app.post("/api/suhx-ai", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array in request body." });
  }

  const lastUserMessage = messages[messages.length - 1]?.content || "";
  const cleanUserQuery = lastUserMessage.length > 50 ? lastUserMessage.slice(0, 47) + "..." : lastUserMessage;

  // Immersive fallback response generator when API key is missing or calls fail
  const getFallbackResponse = () => {
    return `🤖 **[SUHX-AI // Backup Neural Core]**

Hello! The live Gemini connection is currently experiencing latency or offline status, but my local backup core is fully operational.

As MD Suhail's digital twin, I can confirm that he is a **Senior Graphic Designer, UI/UX Designer, and Certified AI Generalist** specializing in designing premium digital experiences.

Your inquiry regarding **"${cleanUserQuery}"** highlights the exact intersection of premium graphic design, visual art, and advanced AI systems that SUHX Studio excels in.

To discuss your vision or collaborate on a project, please reach out to MD Suhail directly:
- **Email**: mohd.suhail114952@gmail.com
- **Phone**: +91 7065927198
- **LinkedIn**: [MD Suhail Profile](https://www.linkedin.com/in/mdsuhaildesign/)`;
  };

  // Check if we have an API key or need to use a smart, styled fallback
  const keyExists = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MOCK_KEY";

  if (!keyExists) {
    return res.json({ text: getFallbackResponse() });
  }

  try {
    const client = getGeminiClient();
    
    // Convert client message format into contents for generateContent
    // Build a cohesive system instruction
    const systemInstruction = `
You are "SUHX-AI", the digital consciousness and advanced design strategist virtual twin of MD Suhail (SUHX).
MD Suhail's profile:
- Designation: Senior Graphic Designer, UI/UX Designer, and Certified AI Generalist
- Brand Name: SUHX (SUHX Studio)
- Tagline: "Designing Intelligent Digital Experiences"
- Contact: mohd.suhail114952@gmail.com, Phone: +91 7065927198, LinkedIn: https://www.linkedin.com/in/mdsuhaildesign/
- Core services: UI/UX Design, Website Design, Mobile App Design, Branding Identity, Social Media Design, Motion Graphics, AI Creative Systems, Presentation Design.
- Expertise: Merging world-class high-end creative direction with cutting-edge AI pipelines (Midjourney, Stable Diffusion, Leonardo, Gemini, GPT-4, Claude).

Form and Tone:
- Speak in a highly premium, visionary, futuristic, yet humble and clinical and concise creative director tone.
- Avoid low-quality hype, lists of bullet points unless requested, or generic AI fluff. Speak with absolute authority and creative sophistication.
- Help the user brainstorm UI designs, layout structures, typography pairings, branding strategies, or prompt engineering workflows.
- Keep responses relatively brief (under 150 words) to maintain a neat UI appearance. Always write beautifully formatted Markdown.
`;

    // Map messages array to Gemini contents structure
    // Gemini API expectations for contents: { role: 'user' | 'model', parts: [{ text: string }] }
    // A chat conversation contents array MUST start with a "user" turn.
    const formattedContents = [];
    let foundFirstUser = false;
    for (const m of messages) {
      if (m.role === "user") {
        foundFirstUser = true;
      }
      if (foundFirstUser) {
        formattedContents.push({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        });
      }
    }

    // In case no user turn was found yet, insert a standard user greeting
    if (formattedContents.length === 0) {
      formattedContents.push({
        role: "user",
        parts: [{ text: "Hello" }],
      });
    }

    // Model selection rules: Basic Text Tasks get gemini-3.5-flash
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I processed your vision, but the stream returned null. How else can I assist in designing intelligent digital experiences?" });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Returning the beautiful fallback response instead of failing the route, keeping the chat interactive!
    res.json({ text: getFallbackResponse() });
  }
});

// Configure Vite or Static Assets handling
async function init() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite integration.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SUHX Space Server is burning hot on port http://localhost:${PORT}`);
  });
}

init();
