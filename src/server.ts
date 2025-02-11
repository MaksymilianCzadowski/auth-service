import app from './app';
import { config } from './config/environment';
import mongoose from 'mongoose';
import { logger } from './utils/logger';

// Connect to MongoDB
mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Start server
const server = app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
}); 