import express from 'express';
import entryRoutes from './controllers/EntryController';

const router = express();

router.get('/', (request, response) => response.json({ message: 'teste' }));

router.use('/entry', entryRoutes);

router.listen(3333);
