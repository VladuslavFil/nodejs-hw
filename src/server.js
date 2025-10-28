import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(
  express.json({
    limit: '200kb',
    type: ['application/json', 'application/vnd.api+json'],
  }),
);
app.use(cors());

await connectMongoDB();

app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
