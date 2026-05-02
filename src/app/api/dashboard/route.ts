// src/app/api/dashboard/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function GET() {
  try {
    const [elasticDoc, osemosysDoc] = await Promise.all([
      getDoc(doc(db, 'elasticities', 'marrakech_safi')),
      getDoc(doc(db, 'osemosys_results', 'current')),
    ])

    if (!elasticDoc.exists() || !osemosysDoc.exists()) {
      return NextResponse.json({ error: 'ERR_DASH_01_NOT_FOUND' }, { status: 404 })
    }

    return NextResponse.json({
      betas:        elasticDoc.data(),
      osemosys:     osemosysDoc.data(),
    })
  } catch (err: any) {
    console.error('[dashboard/route]', err)
    return NextResponse.json({ error: 'ERR_DASH_02' }, { status: 500 })
  }
}