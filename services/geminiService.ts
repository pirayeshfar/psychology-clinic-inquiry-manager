
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateDraftResponse = async (inquiryDescription: string): Promise<string> => {
  try {
    const prompt = `You are a helpful assistant for a licensed therapist. Based on the following confidential patient inquiry, please draft a supportive, empathetic, and non-prescriptive initial response. The response should validate the user's feelings, offer encouragement, and state that the therapist will provide a comprehensive reply soon. Do not provide medical advice or diagnosis. Keep the tone professional, warm, and reassuring.

Patient Inquiry:
---
${inquiryDescription}
---
Draft Response:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating draft response with Gemini:", error);
    return "Could not generate an AI draft at this time. Please write a response manually.";
  }
};
