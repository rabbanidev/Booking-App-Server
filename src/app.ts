import cors from 'cors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import notFoundHandler from './app/middlewares/notFoundHandler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes';

const app: Application = express();

// cors use
app.use(cors());
app.use(cookieParser());

// parser use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplication routes
app.use('/api/v1', Routes);

// Test
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Wellcome to booking application server...' });
});

// Global Error Hnadler
app.use(globalErrorHandler);

// Not Found Handler
app.use(notFoundHandler);

export default app;
