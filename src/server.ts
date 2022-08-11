import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express();
router.use(express.json());
router.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

router.post('/', (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  return res.json({ mes: data });
});
