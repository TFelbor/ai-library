import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Resource, sequelize } from '../models/Resource.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '../.env' });

// Override the database path to use the root database
sequelize.options.storage = path.resolve(__dirname, '../../database.sqlite');

console.log(chalk.blue(`Using database at: ${path.resolve(__dirname, '../../database.sqlite')}`));

// Initialize database first
async function initializeDatabase() {
  try {
    // Use sync without force: true to preserve data
    await sequelize.sync();
    console.log(chalk.green('Database connected successfully\n'));

    // Check if we can access resources
    const count = await Resource.count();
    console.log(chalk.blue(`Found ${count} resources in the database`));

    // Check for pending resources specifically
    const pendingCount = await Resource.count({ where: { status: 'pending' } });
    console.log(chalk.yellow(`Found ${pendingCount} pending resources that need review`));

    return true;
  } catch (error) {
    console.error(chalk.red('Database initialization error:'), error);
    return false;
  }
}

const generateToken = () => {
  try {
    console.clear(); // Clear console before showing token
    const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET || 'fallback-secret');
    console.log('\nAdmin Token:', chalk.green(token));
    // Add a pause to copy the token
    return new Promise(resolve => {
      console.log(chalk.yellow('\nPress Enter to continue...'));
      process.stdin.once('data', () => {
        resolve(token);
      });
    });
  } catch (error) {
    console.error(chalk.red('Error generating token:'), error);
    return null;
  }
};

const listAllResources = async () => {
  try {
    console.clear(); // Clear console before showing results
    console.log(chalk.cyan('\nFetching resources from database...'));

    const resources = await Resource.findAll({
      order: [['submittedAt', 'DESC']]
    });

    if (resources.length === 0) {
      console.log(chalk.yellow('\nNo resources found in the database.'));
      console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));
      return;
    }

    console.log(chalk.green(`\nFound ${resources.length} resources:`));
    resources.forEach(r => {
      console.log(chalk.cyan('\n----------------------------------------'));
      console.log(chalk.bold(`ID: ${r.id}`));
      console.log(`Name: ${chalk.yellow(r.name)}`);
      console.log(`Category: ${chalk.blue(r.category)}`);
      console.log(`Status: ${getStatusColor(r.status)(r.status)}`);
      console.log(`Submitted By: ${r.submittedBy.name}`);
      console.log(`URL: ${chalk.underline(r.url)}`);
      console.log(`Description: ${r.description}`);
      console.log(`Submitted At: ${chalk.gray(new Date(r.submittedAt).toLocaleString())}`);
    });

    // Add a pause to read the results
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error(chalk.red('Error listing resources:'), error);
    console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));
  }
};

const listPendingResources = async () => {
  try {
    console.clear(); // Clear console before showing results
    console.log(chalk.cyan('\nFetching pending resources from database...'));

    const resources = await Resource.findAll({
      where: { status: 'pending' },
      order: [['createdAt', 'DESC']]
    });

    if (resources.length === 0) {
      console.log(chalk.yellow('\nNo pending resources found.'));
      console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));

      // Show all resources to help troubleshoot
      const allResources = await Resource.findAll();
      if (allResources.length > 0) {
        console.log(chalk.blue(`\nFound ${allResources.length} total resources with statuses:`));
        const statusCounts = {};
        allResources.forEach(r => {
          statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
        });
        Object.entries(statusCounts).forEach(([status, count]) => {
          console.log(`${status}: ${count}`);
        });
      }

      console.log(chalk.gray('\nPress Enter to continue...'));
      await new Promise(resolve => process.stdin.once('data', resolve));

      // Return to main menu if no pending resources
      return await mainMenu();
    }

    console.log(chalk.green(`\nFound ${resources.length} pending resources:`));
    resources.forEach(r => {
      console.log(chalk.cyan('\n----------------------------------------'));
      console.log(chalk.bold(`ID: ${r.id}`));
      console.log(`Name: ${chalk.yellow(r.name)}`);
      console.log(`Category: ${chalk.blue(r.category)}`);
      console.log(`Submitted By: ${r.submittedBy.name}`);
      console.log(`URL: ${chalk.underline(r.url)}`);
      console.log(`Description: ${r.description.substring(0, 100)}${r.description.length > 100 ? '...' : ''}`);
    });

    // Ask if user wants to approve or reject a resource
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do with these pending resources?',
        choices: [
          { name: '✅ Approve a resource', value: 'approve' },
          { name: '❌ Reject a resource', value: 'reject' },
          { name: '🔙 Return to main menu', value: 'back' }
        ]
      }
    ]);

    if (action === 'back') {
      // Return to main menu
      return await mainMenu();
    } else if (action === 'approve' || action === 'reject') {
      const { id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: `Enter the resource ID to ${action}:`,
          validate: input => !isNaN(input) || 'Please enter a valid number'
        }
      ]);

      if (action === 'approve') {
        await approveResource(id);
      } else {
        await rejectResource(id);
      }

      // Ask if user wants to see the updated list
      const { viewUpdated } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'viewUpdated',
          message: 'Would you like to see the updated list of pending resources?',
          default: true
        }
      ]);

      if (viewUpdated) {
        await listPendingResources();
      } else {
        // Return to main menu
        await mainMenu();
      }
    }
  } catch (error) {
    console.error(chalk.red('Error listing pending resources:'), error);
    console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));
    console.log(chalk.gray('\nPress Enter to continue...'));
    await new Promise(resolve => process.stdin.once('data', resolve));

    // Return to main menu after error
    return await mainMenu();
  }
};

const approveResource = async (id) => {
  try {
    console.log(chalk.cyan(`\nLooking for resource with ID: ${id}...`));
    const resource = await Resource.findByPk(id);

    if (resource) {
      if (resource.status === 'approved') {
        console.log(chalk.yellow(`\nResource ${id} (${resource.name}) is already approved.`));
      } else {
        console.log(chalk.blue(`\nFound resource: ${resource.name}`));
        await resource.update({ status: 'approved' });
        console.log(chalk.green(`\nResource ${id} (${resource.name}) has been approved!`));
      }
    } else {
      console.log(chalk.red(`\nResource with ID ${id} not found in the database.`));
      console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));

      // Show available IDs to help troubleshoot
      const allResources = await Resource.findAll({ attributes: ['id', 'name', 'status'] });
      if (allResources.length > 0) {
        console.log(chalk.blue('\nAvailable resources:'));
        allResources.forEach(r => {
          console.log(`ID: ${r.id}, Name: ${r.name}, Status: ${r.status}`);
        });
      }
    }

    console.log(chalk.gray('\nPress Enter to continue...'));
    await new Promise(resolve => process.stdin.once('data', resolve));
  } catch (error) {
    console.error(chalk.red('Error approving resource:'), error);
    console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));
    console.log(chalk.gray('\nPress Enter to continue...'));
    await new Promise(resolve => process.stdin.once('data', resolve));
  }
};

const rejectResource = async (id) => {
  try {
    console.log(chalk.cyan(`\nLooking for resource with ID: ${id}...`));
    const resource = await Resource.findByPk(id);

    if (resource) {
      if (resource.status === 'rejected') {
        console.log(chalk.yellow(`\nResource ${id} (${resource.name}) is already rejected.`));
      } else {
        console.log(chalk.blue(`\nFound resource: ${resource.name}`));
        await resource.update({ status: 'rejected' });
        console.log(chalk.yellow(`\nResource ${id} (${resource.name}) has been rejected.`));
      }
    } else {
      console.log(chalk.red(`\nResource with ID ${id} not found in the database.`));
      console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));

      // Show available IDs to help troubleshoot
      const allResources = await Resource.findAll({ attributes: ['id', 'name', 'status'] });
      if (allResources.length > 0) {
        console.log(chalk.blue('\nAvailable resources:'));
        allResources.forEach(r => {
          console.log(`ID: ${r.id}, Name: ${r.name}, Status: ${r.status}`);
        });
      }
    }

    console.log(chalk.gray('\nPress Enter to continue...'));
    await new Promise(resolve => process.stdin.once('data', resolve));
  } catch (error) {
    console.error(chalk.red('Error rejecting resource:'), error);
    console.log(chalk.gray('\nDatabase path: ../../database.sqlite'));
    console.log(chalk.gray('\nPress Enter to continue...'));
    await new Promise(resolve => process.stdin.once('data', resolve));
  }
};

const getStatusColor = (status) => {
  const colors = {
    pending: chalk.yellow,
    approved: chalk.green,
    rejected: chalk.red
  };
  return colors[status] || chalk.white;
};

const mainMenu = async () => {
  try {
    console.clear();
    console.log(chalk.cyan.bold('\n🔧 AI Library Admin Interface\n'));

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: '🔑 Generate admin token', value: 'token' },
          { name: '📋 List all resources', value: 'list-all' },
          { name: '⏳ List pending resources', value: 'list-pending' },
          { name: '✅ Approve a resource', value: 'approve' },
          { name: '❌ Reject a resource', value: 'reject' },
          { name: '🚪 Exit', value: 'exit' }
        ]
      }
    ]);

    if (action === 'exit') {
      await sequelize.close();
      console.log(chalk.gray('\nGoodbye! 👋\n'));
      process.exit(0);
    }

    if (action === 'approve' || action === 'reject') {
      const { id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: `Enter the resource ID to ${action}:`,
          validate: input => !isNaN(input) || 'Please enter a valid number'
        }
      ]);
      if (action === 'approve') {
        await approveResource(id);
      } else {
        await rejectResource(id);
      }
    } else if (action === 'token') {
      generateToken();
    } else if (action === 'list-all') {
      await listAllResources();
    } else if (action === 'list-pending') {
      await listPendingResources();
    }

    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to perform another action?',
        default: true
      }
    ]);

    if (shouldContinue) {
      await mainMenu();
    } else {
      await sequelize.close();
      console.log(chalk.gray('\nGoodbye! 👋\n'));
      process.exit(0);
    }
  } catch (error) {
    console.error(chalk.red('Error in main menu:'), error);
    process.exit(1);
  }
};

// Modified main entry point
async function start() {
  console.clear();
  console.log(chalk.cyan.bold('\nWelcome to AI Library Admin Interface 🚀\n'));

  // Initialize database before showing menu
  const dbInitialized = await initializeDatabase();

  if (dbInitialized) {
    // Start the menu
    await mainMenu().catch(error => {
      console.error(chalk.red('An error occurred:'), error);
      sequelize.close().then(() => process.exit(1));
    });
  } else {
    console.log(chalk.red('\nFailed to initialize database. Please check the database file exists.'));
    console.log(chalk.yellow('\nMake sure you have submitted at least one resource through the web interface.'));
    console.log(chalk.gray('\nPress Enter to exit...'));
    await new Promise(resolve => process.stdin.once('data', resolve));
    process.exit(1);
  }
}

// Start the application
start();
