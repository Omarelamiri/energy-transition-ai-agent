// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// ✅ gemini-2.0-flash — modèle recommandé 2026 (free tier)
export const gemini = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash'
})
