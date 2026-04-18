// fixtures/seed.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import dotenv from 'dotenv'

// === Charger le .env.local (obligatoire pour ts-node) ===
dotenv.config({ path: '.env.local' })

// === Config identique à celle de firebase.ts ===
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Vérification de sécurité
if (!firebaseConfig.projectId) {
  throw new Error('❌ NEXT_PUBLIC_FIREBASE_PROJECT_ID manquant dans .env.local')
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seed() {
  await setDoc(doc(db, 'elasticities', 'marrakech_safi'), {
    region_id: 'marrakech_safi',
    status: 'estimated',
    r_squared: 0.95,
    cointegration_confirmed: true,
    period: '2000-2024',
    last_updated: new Date(),
    betas: {
      b1: { variable: 'pib_regional',   value: 0.78,  ci_lower: 0.65,  ci_upper: 0.91,  badge: 'MEDIUM' },
      b2: { variable: 'population',     value: 1.21,  ci_lower: 1.05,  ci_upper: 1.37,  badge: 'MEDIUM' },
      b3: { variable: 'prix_elec',      value: -0.15, ci_lower: -0.22, ci_upper: -0.08, badge: 'MEDIUM' },
      b4: { variable: 'nuitees',        value: 0.30,  ci_lower: 0.18,  ci_upper: 0.42,  badge: 'MEDIUM' },
      b5: { variable: 'surf_irriguee',  value: 0.20,  ci_lower: 0.10,  ci_upper: 0.30,  badge: 'MEDIUM' },
      gamma: { variable: 'd2020',       value: -0.15, ci_lower: -0.21, ci_upper: -0.09, badge: 'MEDIUM' },
    }
  })

  await setDoc(doc(db, 'osemosys_results', 'current'), {
    computed_at: new Date(),
    scenario: 'central',
    horizon: 2030,
    badge_global: 'MEDIUM',
    gap_total_mw: 312.4,
    gap_total_cost_mad: 4850000000,
    technologies: {
      solar_pv: { existing_mw: 98,  needed_mw: 280, gap_mw: 182, badge: 'MEDIUM', lcoe: 0.42 },
      wind:     { existing_mw: 45,  needed_mw: 160, gap_mw: 115, badge: 'MEDIUM', lcoe: 0.38 },
      storage:  { existing_mw: 0,   needed_mw: 50,  gap_mw: 50,  badge: 'MEDIUM', lcoe: 0.95 },
      efficiency:{ existing_gwh: 12, needed_gwh: 80, gap_gwh: 68, badge: 'MEDIUM', lcoe: null },
    },
    osemosys_log: 'Fixture v1.0 — valeurs simulées.'
  })

  console.log('✅ Seed terminé avec succès !')
}

seed().catch(err => {
  console.error('❌ Erreur pendant le seed :', err)
  process.exit(1)
})