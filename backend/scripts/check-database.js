import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for database files
console.log(chalk.cyan.bold('\n🔍 AI Library Database Checker\n'));

// Define paths to check
const rootDbPath = path.resolve(__dirname, '../../database.sqlite');
const backendDbPath = path.resolve(__dirname, '../database.sqlite');
const scriptsDbPath = path.resolve(__dirname, './database.sqlite');

const paths = [
  { path: rootDbPath, label: 'Root database' },
  { path: backendDbPath, label: 'Backend database' },
  { path: scriptsDbPath, label: 'Scripts database' }
];

// Check each path
paths.forEach(({ path: dbPath, label }) => {
  try {
    const stats = fs.statSync(dbPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(chalk.green(`✅ ${label} exists:`));
    console.log(`   Path: ${path.resolve(dbPath)}`);
    console.log(`   Size: ${sizeInMB} MB`);
    console.log(`   Modified: ${stats.mtime}`);
  } catch (error) {
    console.log(chalk.red(`❌ ${label} not found at ${path.resolve(dbPath)}`));
  }
});

// Try to connect to the root database
console.log(chalk.cyan.bold('\n🔌 Attempting to connect to root database...\n'));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: rootDbPath,
  logging: false
});

console.log(chalk.blue(`Connecting to database at: ${rootDbPath}`));

// Define a simple model for testing
const Resource = sequelize.define('Resource', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  url: Sequelize.STRING,
  category: Sequelize.STRING,
  status: Sequelize.STRING,
  submittedBy: Sequelize.JSON,
  submittedAt: Sequelize.DATE
});

async function checkDatabase() {
  try {
    await sequelize.authenticate();
    console.log(chalk.green('✅ Connection successful!'));

    // Check for tables
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log(chalk.blue(`\nFound ${tables.length} tables: ${tables.join(', ')}`));

    // Count resources
    const count = await Resource.count();
    console.log(chalk.blue(`\nFound ${count} resources in the database`));

    if (count > 0) {
      // Show resource statuses
      const resources = await Resource.findAll();
      const statusCounts = {};
      resources.forEach(r => {
        statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
      });

      console.log(chalk.blue('\nResource status counts:'));
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`${status}: ${count}`);
      });

      // Show the most recent 5 resources
      console.log(chalk.blue('\nMost recent resources:'));
      const recentResources = await Resource.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5
      });

      recentResources.forEach(r => {
        console.log(chalk.cyan('\n----------------------------------------'));
        console.log(chalk.bold(`ID: ${r.id}`));
        console.log(`Name: ${chalk.yellow(r.name)}`);
        console.log(`Status: ${r.status}`);
        console.log(`Created: ${r.createdAt}`);
      });
    }
  } catch (error) {
    console.error(chalk.red('❌ Database connection error:'), error);
  } finally {
    await sequelize.close();
  }
}

checkDatabase();
