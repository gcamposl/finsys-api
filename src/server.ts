import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fakeDb from './data.json';
import fs, { rmSync } from 'fs';

enum Type {
  INCOME = 'INCOME',
  COST = 'COST',
}

type Entry = {
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

  if (data && Object.keys(data).length === 0) {
    return res.status(404).json({ message: 'No content - [404]' });
  }

  fakeDb.push(data);

  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(fakeDb), (err) => {
    console.log(err);
  });

  return res.json({ mes: data });
});

router.get('/', (req, res) => {
  if (!fakeDb) return res.status(404).json({ message: 'No content - [404]' });
  return res.json({ message: fakeDb });
});

router.get('/:description', (req, res) => {
  const description = req.params.description;
  // ver params e query params
  console.log(description);
  let i = 0;
  // verbose method
  // if (description)
  //   for (let fdb of fakeDb) {
  //     console.log(i++, ' -> ', fdb);
  //     if (fdb.description === description) return res.json({ message: 'achou po!', obj: fdb });
  //   }

  // functional method
  if (description) {
    const account = fakeDb.filter((acc) => acc.description === description);
    if (account && Object.keys(account).length > 0) return res.json(account);
  }
  return res.status(404).json({ message: 'No content - [404]' });
});

router.put('/:description', (req, res) => {
  const desc = req.params.description;
  const obj = req.body;
  console.log(obj);

  let newDb = fakeDb.map((entry) => {
    if (entry.description === desc) entry = obj;
    return entry;
  });

  if (newDb && Object.keys(newDb).length > 0) {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newDb), (err) => {
      console.log(err);
    });
    console.log(newDb);
    return res.status(201).json({ message: 'Updated', newDb });
  }
  return res.status(404).json({ message: 'No content - [404]' });
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
  return res.status(404).json({ message: 'No content - [404]' });
});

// TODO:
/*
  - [X] POST
  - [] PUT
  - [X] GET
  - [X] GET BY ID
  - [X] DELETE

  proximos passos...
  inserir mongodb
  inserir typeorm
  inserir swagger
  inserir uma arquitetura
*/
