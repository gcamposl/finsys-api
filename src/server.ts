import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fakeDb from './data.json';
import fs from 'fs';

enum Type {
  INCOME = 'INCOME',
  COST = 'COST',
}

interface IEntry {
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

// consuming json file with fake db
let data = fs.readFileSync(path.join(__dirname, 'data.json'));
let dbData = JSON.parse(data.toString());
console.log(dbData);

// CRUD routes for entry
router.post('/', (req: Request, res: Response) => {
  const data: IEntry = req.body;

  if (data && Object.keys(data).length === 0) {
    return res.status(404).json({ message: 'No content - [404]' });
  }

  fakeDb.push(data);

  //
  // for (let i in fakeDb) {
  //   fakeDb[i].type == '';
  // }

  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(fakeDb), (err) => {
    console.log(err);
  });

  return res.json({ mes: data });
});

router.get('/', (req, res) => {
  return res.json({ message: 'get' });
});

router.put('/', (req, res) => {
  return res.json({ message: 'put' });
});
