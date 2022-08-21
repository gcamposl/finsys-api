import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fakeDb from './data.json';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';

enum Type {
  INCOME = 'INCOME',
  COST = 'COST',
}

type Entry = {
  id: string;
  description: string;
  type: Type;
  value: number;
  comment: string;
};

dotenv.config();

// init and run server
const router = express();
router.use(express.json());
router.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// consuming json file with fake db
let data = fs.readFileSync(path.join(__dirname, 'data.json'));

// connect databsae

const client = new MongoClient(process.env.DB_CONN_STRING);

// async function run() {
//   try {
//     // const client = new MongoClient(process.env.DB_CONN_STRING);
//     // const db = client.db(process.env.DB_NAME);
//     const database = client.db(process.env.DB_NAME);
//     const accounts = database.collection('accounts');
//     const query = { description: 'xpto' };
//     const description = await accounts.findOne(query);
//     console.log(description);
//   } finally {
//     await client.close();
//   }
// }

// run();

const connectDB = () => {
  const database = client.db(process.env.DB_NAME);
  return database;
};

// CRUD routes for entry
router.post('/', async (req: Request, res: Response) => {
  const data: Entry = req.body;

  if (data && Object.keys(data).length === 0) {
    return res.status(404).json({ message: 'Not Found - [404]' });
  }

  // fakeDb.push(data);

  const db = connectDB();
  const accounts = db.collection('accounts');
  accounts.insertOne(data);
  client.close();

  // fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(fakeDb), (err) => {
  //   console.log(err);
  // });
  // const client = connectDB();
  // try {
  // } finally {
  //   await client.close();
  // }

  return res.json(data);
});

router.get('/', (req, res) => {
  if (!fakeDb) return res.status(404).json({ message: 'Not Found - [404]' });
  return res.json({ message: fakeDb });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    // const account = fakeDb.filter((acc) => acc.id === id);
    // if (account && Object.keys(account).length > 0) return res.json(account);
    const db = connectDB();
    const accounts = db.collection('accounts');
    const data = accounts.findOne({ _id: id });
    client.close();
    return res.status(200).json(data);
  }
  return res.status(404).json({ message: 'Not Found - [404]' });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  const index = fakeDb.findIndex((item) => item.id === id);

  if (index > 0) {
    obj.id = id;
    fakeDb[index] = obj;
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(fakeDb), (err) => {
      console.log(err);
    });
    return res.status(201).json({ message: 'Updated', fakeDb });
  }
  return res.status(404).json({ message: 'Not Found - [404]' });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    // refazer com pop
    const newDb = fakeDb.filter((db) => db.id !== id);
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newDb), (err) => {
      console.log(err);
    });
    return res.status(200).json({ message: 'Deleted - [200]', newDb });
  }
  return res.status(404).json({ message: 'Not Found - [404]' });
});
