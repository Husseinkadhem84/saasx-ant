import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';

let aiClient: GoogleGenAI | null = null;
export function getAiClient() {
  if (!aiClient) {
    if (config.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: config.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
  }
  return aiClient;
}
