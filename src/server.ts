import express from 'express';
import entryRoutes from './controllers/EntryController';
import dotenv from 'dotenv';

dotenv.config();

const router = express();
router.use(express.json());
router.use('/entry', entryRoutes);

router.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
