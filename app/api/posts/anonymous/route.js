import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function POST(request) {
  try {
    const data = await request.json()
    const { content, groupId } = data

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Initialize posts table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        group_id TEXT,
        content TEXT NOT NULL,
        is_anonymous BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    const result = await pool.query(
      'INSERT INTO posts (group_id, content, is_anonymous) VALUES ($1, $2, $3) RETURNING *',
      [groupId || 'general', content, true]
    )

    return NextResponse.json({
      success: true,
      post: result.rows[0]
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const groupId = searchParams.get('groupId') || 'general'

    const result = await pool.query(
      'SELECT * FROM posts WHERE group_id = $1 ORDER BY created_at DESC LIMIT 50',
      [groupId]
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
