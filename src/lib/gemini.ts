// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

/**
 * Modèle mis à jour (2026)
 * gemini-2.0-flash → très rapide + gratuit sur le tier free
 * Tu peux aussi tester : gemini-flash-latest ou gemini-2.5-flash
 */
export const gemini = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash'   // ← modèle actuel recommandé
})