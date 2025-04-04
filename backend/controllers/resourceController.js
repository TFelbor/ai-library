import { Resource } from '../models/Resource.js';
import chalk from 'chalk';

export const submitResource = async (req, res) => {
  try {
    // Handle both direct properties and nested properties
    const resourceData = {
      name: req.body.name || req.body.resourceName,
      description: req.body.description,
      url: req.body.url || req.body.resourceUrl,
      category: req.body.category,
      submittedBy: req.body.submittedBy || {
        name: req.body.name,
        email: req.body.email
      }
    };

    const resource = await Resource.create(resourceData);
    res.status(201).json(resource);
  } catch (error) {
    console.error('Submission error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getApprovedResources = async (req, res) => {
  try {
    console.log(chalk.blue('Fetching approved resources...'));

    // Check if the database has any resources at all
    const totalCount = await Resource.count();
    console.log(chalk.blue(`Total resources in database: ${totalCount}`));

    // Get all resources with their statuses for debugging
    const allResources = await Resource.findAll({ attributes: ['id', 'name', 'status'] });
    console.log(chalk.blue('All resources:'));
    allResources.forEach(r => {
      console.log(`ID: ${r.id}, Name: ${r.name}, Status: ${r.status}`);
    });

    // Get approved resources
    const resources = await Resource.findAll({
      where: { status: 'approved' },
      order: [['submittedAt', 'DESC']]
    });

    console.log(
      chalk.green('✅ Found'),
      chalk.yellow(`${resources.length}`),
      chalk.green('approved resources')
    );

    // Log the resources being sent
    console.log(chalk.green('Sending approved resources:'));
    resources.forEach(r => {
      console.log(`ID: ${r.id}, Name: ${r.name}, Status: ${r.status}`);
    });

    res.json(resources);
  } catch (error) {
    console.error(chalk.red('❌ Fetch error:'), error);
    res.status(500).json({ message: error.message });
  }
};

export const getPendingResources = async (req, res) => {
  try {
    const resources = await Resource.findAll({
      where: { status: 'pending' },
      order: [['submittedAt', 'DESC']]
    });
    console.log(
      chalk.blue('⏳ Found'),
      chalk.yellow(`${resources.length}`),
      chalk.blue('pending resources')
    );
    res.json(resources);
  } catch (error) {
    console.error(chalk.red('❌ Fetch error:'), error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.status = status;
    await resource.save();

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
