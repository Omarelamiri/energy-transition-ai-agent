import { gemini } from './src/lib/gemini'

async function test() {
  const result = await gemini.generateContent('Dis bonjour en français.')
  console.log(result.response.text())
}
test()