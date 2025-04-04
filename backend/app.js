import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import resourceRoutes from './routes/resourceRoutes.js';
import { sequelize } from './models/Resource.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add request logging middleware (moved up to log all requests)
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(
    chalk.gray(`[${timestamp}]`),
    chalk.cyan(req.method),
    chalk.yellow(req.url),
    chalk.gray('from'),
    chalk.blue(req.ip)
  );
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'AI Library API Server',
    status: 'running',
    endpoints: {
      resources: '/api/resources',
      approved: '/api/resources/approved',
      pending: '/api/resources/pending',
    }
  });
});

// Routes
app.use('/api/resources', resourceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(chalk.red('🚨 Error:'), err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;
const BACKUP_PORTS = [5001, 5002, 5003, 5004, 5005];

async function startServer(port = PORT, backupIndex = 0) {
  try {
    await sequelize.sync();
    console.log(chalk.cyan('\n🔄 Database synchronized successfully'));

    const server = app.listen(port, () => {
      console.log(chalk.green('\n🚀 Server Status:'));
      console.log(chalk.cyan('----------------------------------------'));
      console.log(`📡 Port: ${chalk.yellow(port)}`);
      console.log(`🌐 URL: ${chalk.yellow(`http://localhost:${port}`)}`);
      console.log(`🔑 Environment: ${chalk.yellow(process.env.NODE_ENV || 'development')}`);
      console.log(chalk.cyan('----------------------------------------'));
      console.log(chalk.gray('\n📝 Request Log:'));
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE' && backupIndex < BACKUP_PORTS.length) {
        console.log(chalk.yellow(`\n⚠️ Port ${port} is already in use, trying port ${BACKUP_PORTS[backupIndex]}...`));
        server.close();
        startServer(BACKUP_PORTS[backupIndex], backupIndex + 1);
      } else {
        console.error(chalk.red('\n❌ Failed to start server:'), err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error(chalk.red('\n❌ Failed to start server:'), error);
    process.exit(1);
  }
}

startServer();
