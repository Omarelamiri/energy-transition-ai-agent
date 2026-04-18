// test-gemini.ts — à la racine du projet
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })   // ← load GEMINI_API_KEY before anything

import { gemini } from './src/lib/gemini'

async function test() {
  const result = await gemini.generateContent('Dis bonjour en français.')
  console.log(result.response.text())
  console.log('KEY:', process.env.GEMINI_API_KEY?.slice(0, 8), '| length:', process.env.GEMINI_API_KEY?.length)
}

test()