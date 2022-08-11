import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuid } from 'uuid';
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

// consume datas
let data = fs.readFileSync(path.join(__dirname, 'data.json'));
let dbData = JSON.parse(data.toString());
console.log(dbData);

// CRUD routes
router.post('/', (req: Request, res: Response) => {
  const data: IEntry = req.body;
  if (data && Object.keys(data).length === 0) {
    return res.status(404).json({ message: 'No content - [404]' });
  }
  console.log(data);
  dbData.push(data);
  return res.json({ mes: data });
});

router.get('/', (req, res) => {
  return res.json({ message: 'get' });
});

router.put('/', (req, res) => {
  return res.json({ message: 'put' });
});
