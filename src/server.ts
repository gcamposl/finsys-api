import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fakeDb from './data.json';
import fs from 'fs';
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

// consuming json file with fake db [descontinuos]
let data = fs.readFileSync(path.join(__dirname, 'data.json'));

// connect databsae
const client = new MongoClient(process.env.DB_CONN_STRING);
const connectDB = async () => {
  await client.connect();
  const database = client.db(process.env.DB_NAME);
  return database;
};

// CRUD routes for entry
router.post('/', async (req: Request, res: Response) => {
  const data: Entry = req.body;

  if (data && Object.keys(data).length === 0) return res.status(404).json({ message: 'Not Found - [404]' });

  try {
    const db = await connectDB();
    const accounts = db.collection('accounts');
    await accounts.insertOne(data);

    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log('Connection close.');
  }
  return res.status(500).json({ message: 'Internal Server Error - [500]' });
});

router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const accounts = await db.collection('accounts').find({}).toArray();

    return res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log('Connection close.');
  }

  return res.status(404).json({ message: 'Not Found - [404]' });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (id) {
    try {
      const db = await connectDB();
      const accounts = db.collection('accounts');
      const data = accounts.findOne({ _id: id });

      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
      console.log('Connection close.');
    }
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
    const newDb = fakeDb.filter((db) => db.id !== id);
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newDb), (err) => {
      console.log(err);
    });
    return res.status(200).json({ message: 'Deleted - [200]', newDb });
  }
  return res.status(404).json({ message: 'Not Found - [404]' });
});
