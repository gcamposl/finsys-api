import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database';
import { Account } from '../models/Account';
import dotenv from 'dotenv';

dotenv.config();

export const accountsRouter = express.Router();

accountsRouter.get('/', async (req: Request, res: Response) => {
  console.log('teste');
  try {
    const accounts = await collections.accounts.find({}).toArray();
    console.log(accounts);

    return res.status(200).send(accounts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// accountsRouter.post('/', async (req: Request, res: Response) => {
//   const data = req.body;
//   if (data && Object.keys(data).length === 0) return res.status(404).json({ message: 'Not Found - [404]' });

//   try {
//     const db = await connectDB();
//     const accounts = db.collection('accounts');
//     await accounts.insertOne(data);

//     return res.status(201).json(data);
//   } catch (err) {
//     console.log(err.message);
//   } finally {
//     await client.close();
//     console.log('Connection close.');
//   }
//   return res.status(500).json({ message: 'Internal Server Error - [500]' });
// });

// accountsRouter.get('/:id', async (req, res) => {
//   const id = req?.params?.id;
//   const query = { _id: new ObjectId(id) };

//   if (id) {
//     try {
//       const db = await connectDB();
//       const account = await db.collection('accounts').findOne(query);

//       return res.status(200).json(account);
//     } catch (err) {
//       console.log(err.message);
//     } finally {
//       await client.close();
//       console.log('Connection close.');
//     }
//   }

//   return res.status(404).json({ message: 'Not Found - [404]' });
// });

// accountsRouter.put('/:id', async (req, res) => {
//   const id = req?.params?.id;

//   try {
//     const updatedAccount = req.body;
//     const query = { _id: new ObjectId(id) };

//     const database = await connectDB();
//     const result = await database.collection('accounts').updateOne(query, { $set: updatedAccount });

//     return result ? res.status(200).send(`Updated id -> ${id}`) : res.status(304).send(`Not updated id -> ${id}`);
//   } catch (err) {
//     console.log(err.message);
//   } finally {
//     await client.close();
//     console.log('Connection close.');
//   }
// });

// accountsRouter.delete('/:id', async (req, res) => {
//   const id = req?.params?.id;

//   const query = { _id: new ObjectId(id) };
//   if (!id) {
//     return res.status(404).json({ message: 'Bad Request - [400]' });
//   }

//   try {
//     const database = await connectDB();
//     const accounts = await database.collection('accounts').deleteOne(query);
//     return res.status(200).json({ accounts });
//   } catch (err) {
//     console.log(err.message);
//   } finally {
//     await client.close();
//     console.log('Connection close.');
//   }
// });
