import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';

export const collections: { accounts?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const accountsCollection: mongoDB.Collection = db.collection(process.env.ACCOUNTS_COLLECTION_NAME);
  collections.accounts = accountsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${accountsCollection.collectionName}`
  );
}
