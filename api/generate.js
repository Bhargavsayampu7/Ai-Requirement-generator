import generateRouter from '../backend/routes/generate.js';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Mount the generate router at root '/'
// Vercel maps /api/generate → this file, so Express sees the path as '/'
app.use('/', generateRouter);

export default app;
