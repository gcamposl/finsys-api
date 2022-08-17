import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fakeDb from './data.json';
import fs, { rmSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { RandomUUIDOptions } from 'crypto';

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
let dbData = JSON.parse(data.toString());

// CRUD routes for entry
router.post('/', (req: Request, res: Response) => {
  const data: Entry = req.body;
  data.id = uuid();

  if (data && Object.keys(data).length === 0) {
    return res.status(404).json({ message: 'Not Found - [404]' });
  }

  fakeDb.push(data);

  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(fakeDb), (err) => {
    console.log(err);
  });

  return res.json(data);
});

router.get('/', (req, res) => {
  if (!fakeDb) return res.status(404).json({ message: 'Not Found - [404]' });
  return res.json({ message: fakeDb });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    const account = fakeDb.filter((acc) => acc.id === id);
    if (account && Object.keys(account).length > 0) return res.json(account);
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

router.delete('/:description', (req, res) => {
  const description = req.params.description;
  if (description) {
    const newDb = fakeDb.filter((db) => db.description !== description);
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newDb), (err) => {
      console.log(err);
    });
    return res.status(200).json({ message: 'Deleted - [200]', newDb });
  }
  return res.status(404).json({ message: 'Not Found - [404]' });
});
