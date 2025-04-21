# AI Resource Library

A full-stack web application for discovering, sharing, and managing AI resources. Built with modern web technologies, this platform allows users to browse curated AI tools and submit new resources for review.
Soon to be tranformed into AI Agent Library... Hoping for this project to turn into an opensource project where developers are allowed submit their agents, both free and paid for more advanced and sophisticated agents. 

**Live Demo** → [ai-library-tfelbor.netlify.app](https://ai-library-tfelbor.netlify.app/) (takes about 30 seconds)

**Website Status** → [![Netlify Status](https://api.netlify.com/api/v1/badges/85620708-e5b8-491e-992a-1c473fd7cb92/deploy-status)](https://app.netlify.com/sites/ai-library-tfelbor/deploys)

## Key Features ✨
- Browse curated AI resources by category
- Submit new AI tools and resources for review
- Admin interface for managing resource submissions
- Responsive design with dark/light theme support
- Interactive UI with smooth animations

## Tech Stack 🛠️
**Frontend**:
- React + Vite + TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

**Backend**:
- Node.js + Express
- SQLite + Sequelize ORM
- JWT for admin authentication

## Installation Guide 🚀

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Option 1: Using the Setup Script

The easiest way to set up the project is using the provided setup script:

```bash
# Clone the repository
git clone https://github.com/TFelbor/ai-resource-library.git
cd ai-resource-library

# Make the setup script executable (if needed)
chmod +x setup.sh

# Run the setup script
./setup.sh

# Start the development servers
npm run dev
```

### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/TFelbor/ai-resource-library.git
cd ai-resource-library

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root and start both servers
cd ..
npm run dev
```

### Running the Application

Once setup is complete, the application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

You can also run the frontend and backend separately:

```bash
# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend
```

### Troubleshooting Form Submission Issues

If you encounter issues with form submissions, ensure that:

1. Both frontend and backend servers are running
2. The backend server is accessible at http://localhost:5000
3. All required form fields are filled out correctly

## Project Structure 📂

```
├── backend/
│ ├── controllers/  # API controllers
│ ├── middleware/   # Express middleware
│ ├── models/       # Database schemas
│ ├── routes/       # Express routes
│ └── scripts/      # Admin utilities
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── context/    # React context providers
│ │ ├── data/       # Static data
│ │ ├── pages/      # Route components
│ │ ├── types/      # TypeScript type definitions
│ │ └── utils/      # Utility functions
│ └── public/       # Static assets
├── .env            # Environment variables
├── database.sqlite # SQLite database file
└── package.json    # Root package configuration
```

## Admin Interface 🛡️

The project includes an interactive command-line admin interface for managing resources:

```bash
# Start the interactive admin interface
cd backend/scripts
node admin.js
```

The admin interface provides the following features:
- 🔑 Generate admin authentication tokens
- 📋 List all resources with detailed information
- ⏳ List pending resources awaiting review
- ✅ Approve resources
- ❌ Reject resources

Use arrow keys to navigate and Enter to select options.

### Database Utilities

The project includes a database checker utility to help troubleshoot database issues:

```bash
# Check database status and content
cd backend/scripts
node check-database.js
```

This utility will:
- Check for database files in different locations
- Attempt to connect to the main database
- Show tables and resource counts
- Display recent resources and their statuses

## Contributing 🤝

1. Fork the repository
2. Create feature branch:

```bash
git checkout -b feature/your-feature
```

3. Commit changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to branch and open a PR

## Deployment 🚀

### Deploying to Netlify

This project is configured for easy deployment to Netlify. The repository includes:

- `netlify.toml` configuration file
- Build scripts optimized for Netlify deployment
- Proper redirects for SPA routing

To deploy to Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Use the following build settings:
   - Build command: `npm run netlify-build`
   - Publish directory: `frontend/dist`

### Environment Variables

For production deployment, the following environment variables are recommended:

- `NODE_VERSION`: Set to `18` or higher

## License 📄

MIT License - see [LICENSE](https://github.com/TFelbor/ai-resource-library/blob/main/LICENSE) for details

---
