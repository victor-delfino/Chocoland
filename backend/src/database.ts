import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "chocoland.db");

const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'landing-page',
    subscribed_at TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

console.log("✅ Banco SQLite pronto");

export interface Subscriber {
  id: number;
  name: string;
  email: string;
  source: string;
  subscribed_at: string;
  created_at: string;
}

export function insertSubscriber(data: {
  name: string;
  email: string;
  source: string;
  subscribedAt: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO subscribers (name, email, source, subscribed_at)
    VALUES (@name, @email, @source, @subscribedAt)
  `);

  return stmt.run({
    name: data.name,
    email: data.email,
    source: data.source,
    subscribedAt: data.subscribedAt,
  });
}

export function getAllSubscribers(): Subscriber[] {
  return db
    .prepare("SELECT * FROM subscribers ORDER BY id DESC")
    .all() as Subscriber[];
}

export function getSubscriberCount(): number {
  const row = db.prepare("SELECT COUNT(*) as total FROM subscribers").get() as {
    total: number;
  };
  return row.total;
}

export default db;
