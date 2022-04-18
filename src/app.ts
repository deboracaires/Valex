import cors from 'cors';
import express, { json } from 'express';

const app = express();

app.use(cors());
app.use(json());

export default app;