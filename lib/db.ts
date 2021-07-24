import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

async function connect() {
  if (client && db) {
    return { client, db };
  }

  client = new MongoClient(process.env.DB_URI || '');
  await client.connect();

  db = client.db(process.env.DB_NAME);

  return { client, db };
}

export default connect;
