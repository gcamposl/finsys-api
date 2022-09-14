import express from 'express';
import dotenv from 'dotenv';
import { accountsRouter } from './routes/accounts.routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use('/accounts', accountsRouter);
