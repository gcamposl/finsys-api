import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fakeDb from './data.json';
import fs from 'fs';
import { MongoClient, ObjectId } from 'mongodb';

enum Type {
  INCOME = 'INCOME',
  COST = 'COST',
}

interface Entry {
  id: string;
  description: string;
  type: Type;
  value: number;
  comment: string;
}

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
  const data = req.body;
  if (data && Object.keys(data).length === 0) return res.status(404).json({ message: 'Not Found - [404]' });

  try {
    const db = await connectDB();
    const accounts = db.collection('accounts');
    await accounts.insertOne(data);

    return res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
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
      const account = await db.collection('accounts').findOne({ _id: id });

      return res.status(200).json(account);
    } catch (err) {
      console.log(err.message);
    } finally {
      await client.close();
      console.log('Connection close.');
    }
  }

  return res.status(404).json({ message: 'Not Found - [404]' });
});

router.put('/:id', async (req, res) => {
  const id = req?.params?.id;

  try {
    const updatedAccount = req.body;
    const query = { _id: new ObjectId(id) };

    const database = await connectDB();
    const result = await database.collection('accounts').updateOne(query, { $set: updatedAccount });

    return result ? res.status(200).send(`Updated id -> ${id}`) : res.status(304).send(`Not updated id -> ${id}`);
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
    console.log('Connection close.');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    return res.status(404).json({ message: 'Bad Request - [400]' });
  }

  try {
    const database = await connectDB();
    const accounts = await database.collection('accounts').deleteOne({ _id: id });
    return res.status(200).json({ accounts });
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
});
