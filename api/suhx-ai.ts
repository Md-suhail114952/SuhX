import { GoogleGenAI } from "@google/genai";

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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
}
