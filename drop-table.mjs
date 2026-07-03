import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    await pool.query('DROP TABLE IF EXISTS chat_messages CASCADE;');
    console.log('Successfully dropped chat_messages table.');
  } catch (err) {
    console.error('Error dropping table:', err);
  } finally {
    pool.end();
  }
}

run();
