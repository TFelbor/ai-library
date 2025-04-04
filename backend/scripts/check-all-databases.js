import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths to check
const rootDbPath = path.resolve(__dirname, '../../database.sqlite');
const backendDbPath = path.resolve(__dirname, '../database.sqlite');
const scriptsDbPath = path.resolve(__dirname, './database.sqlite');

const paths = [
  { path: rootDbPath, label: 'Root database' },
  { path: backendDbPath, label: 'Backend database' },
  { path: scriptsDbPath, label: 'Scripts database' }
];

// Check each database
async function checkAllDatabases() {
  console.log(chalk.cyan.bold('\n🔍 AI Library Database Checker\n'));

  for (const { path: dbPath, label } of paths) {
    try {
      // Check if file exists
      const stats = fs.statSync(dbPath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(chalk.green(`\n✅ ${label} exists:`));
      console.log(`   Path: ${path.resolve(dbPath)}`);
      console.log(`   Size: ${sizeInMB} MB`);
      console.log(`   Modified: ${stats.mtime}`);

      // Try to connect and check content
      console.log(chalk.cyan(`\n   Checking content of ${label}...`));

      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        logging: false
      });

      try {
        await sequelize.authenticate();
        console.log(chalk.green('   ✅ Connection successful!'));

        // Check for tables
        const tables = await sequelize.getQueryInterface().showAllTables();
        console.log(chalk.blue(`   Found ${tables.length} tables: ${tables.join(', ')}`));

        // If Resources table exists, check content
        if (tables.includes('Resources')) {
          // Define Resource model
          const Resource = sequelize.define('Resource', {
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
            url: Sequelize.STRING,
            category: Sequelize.STRING,
            status: Sequelize.STRING,
            submittedBy: Sequelize.JSON,
            submittedAt: Sequelize.DATE
          }, { tableName: 'Resources' });

          // Count resources
          const count = await Resource.count();
          console.log(chalk.blue(`   Found ${count} resources in the database`));

          if (count > 0) {
            // Show resource statuses
            const resources = await Resource.findAll();
            const statusCounts = {};
            resources.forEach(r => {
              statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
            });

            console.log(chalk.blue('   Resource status counts:'));
            Object.entries(statusCounts).forEach(([status, count]) => {
              console.log(`   ${status}: ${count}`);
            });

            // Show the most recent 3 resources
            console.log(chalk.blue('\n   Most recent resources:'));
            const recentResources = await Resource.findAll({
              order: [['createdAt', 'DESC']],
              limit: 3
            });

            recentResources.forEach(r => {
              console.log(chalk.cyan('   ----------------------------------------'));
              console.log(`   ID: ${r.id}`);
              console.log(`   Name: ${r.name}`);
              console.log(`   Status: ${r.status}`);
              console.log(`   Created: ${r.createdAt}`);
            });
          }
        } else {
          console.log(chalk.yellow('   ⚠️ No Resources table found in this database'));
        }

        await sequelize.close();
      } catch (error) {
        console.error(chalk.red(`   ❌ Error accessing database: ${error.message}`));
      }
    } catch (error) {
      console.log(chalk.red(`❌ ${label} not found or not accessible at ${path.resolve(dbPath)}`));
    }
  }

  console.log(chalk.cyan.bold('\n🔍 Database Check Complete\n'));
}

checkAllDatabases();
