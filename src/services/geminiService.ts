import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const MODELS = {
  FLASH: "gemini-3-flash-preview",
  PRO: "gemini-3.1-pro-preview",
  IMAGE: "gemini-2.5-flash-image",
};

export interface MarketingRequest {
  category: string;
  brandVoice: string;
  targetAudience: string;
  goal: string;
}

export const geminiService = {
  async generateMarketingContent(req: MarketingRequest) {
    const prompt = `Act as a world-class marketing expert. 
    Category: ${req.category}
    Brand Voice: ${req.brandVoice}
    Target Audience: ${req.targetAudience}
    Goal: ${req.goal}
    
    Generate high-converting content for this request. Ensure perfect brand voice consistency.`;

    const response = await ai.models.generateContent({
      model: MODELS.FLASH,
      contents: prompt,
    });
    return response.text;
  },

  async analyzePrompt(promptToAnalyze: string) {
    const response = await ai.models.generateContent({
      model: MODELS.PRO,
      contents: `Analyze the following prompt for weaknesses, potential hallucinations, and clarity. Then, rebuild it into a stronger, world-class command structure.
      
      PROMPT:
      ${promptToAnalyze}`,
    });
    return response.text;
  },

  async generateImage(prompt: string) {
    const response = await ai.models.generateContent({
      model: MODELS.IMAGE,
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  },

  async deepThink(topic: string) {
    const response = await ai.models.generateContent({
      model: MODELS.PRO,
      contents: `Perform a recursive deep thinking analysis on: ${topic}. 
      Break it down into logic loops, debunk common myths using data-driven reasoning, and synthesize a strategic conclusion.`,
    });
    return response.text;
  },

  async architectWebsite(input: { type: string; audience: string; style: string }) {
    const response = await ai.models.generateContent({
      model: MODELS.PRO,
      contents: `Analyze these website requirements:
      Type: ${input.type}
      Audience: ${input.audience}
      Style: ${input.style}
      
      1. Determine optimal page structure.
      2. Add missing best-practice features.
      3. Generate frontend requirements (hero, trust, features).
      4. Generate backend/CMS logic (admin, SEO, booking).
      5. Provide a master prompt for a no-code builder.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            structure: { type: Type.ARRAY, items: { type: Type.STRING } },
            features: { type: Type.ARRAY, items: { type: Type.STRING } },
            frontend: { type: Type.STRING },
            backend: { type: Type.STRING },
            masterPrompt: { type: Type.STRING },
          },
          required: ["structure", "features", "frontend", "backend", "masterPrompt"],
        },
      },
    });
    return JSON.parse(response.text || "{}");
  }
};
