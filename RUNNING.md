# Running the AI Resource Library Application

This guide provides detailed instructions on how to run the AI Resource Library application, including setup, running the development servers, and troubleshooting common issues.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)

You can check your versions with:
```bash
node --version
npm --version
```

## Setting Up the Application

### Option 1: Using the Setup Script (Recommended)

The easiest way to set up the project is using the provided setup script:

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/TFelbor/ai-resource-library.git
cd ai-resource-library

# Make the setup script executable (if needed)
chmod +x setup.sh

# Run the setup script
./setup.sh
```

The setup script will:
1. Install root dependencies
2. Install backend dependencies
3. Install frontend dependencies

### Option 2: Manual Setup

If you prefer to set up the project manually:

```bash
# Clone the repository (if you haven't already)
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

# Return to the root directory
cd ..
```

## Running the Application

### Running Both Frontend and Backend

To run both the frontend and backend servers simultaneously:

```bash
# From the root directory
npm run dev
```

This command uses `concurrently` to start both servers at once.

### Running Frontend and Backend Separately

If you need to run the servers separately:

```bash
# Start frontend only (from the root directory)
npm run dev:frontend

# Start backend only (from the root directory)
npm run dev:backend
```

### Accessing the Application

Once the servers are running, you can access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Using the Application

1. **Browse Resources**: View the curated list of AI resources on the main page
2. **Filter by Category**: Use the category filter to find resources by type
3. **Submit a Resource**: Click the "Submit Resource" button to open the submission form
4. **Fill Out the Form**: Enter all required information about the resource
5. **Submit**: Click the "Submit" button to send your resource for review

## Admin Interface

To manage resources as an admin:

```bash
# From the root directory
cd backend/scripts
node admin.js
```

The admin interface allows you to:
- Generate admin authentication tokens
- List all resources
- List pending resources awaiting review
- Approve resources
- Reject resources

### Using the Admin Interface

1. **Start the admin interface**:
   ```bash
   cd backend/scripts
   node admin.js
   ```

2. **View pending resources**:
   - Select "List pending resources" from the main menu
   - You'll see a list of resources awaiting approval

3. **Approve or reject resources**:
   - After viewing pending resources, you'll be prompted with options:
     - "✅ Approve a resource"
     - "❌ Reject a resource"
     - "🔙 Return to main menu"
   - Select the desired action and enter the resource ID when prompted
   - After approving or rejecting, you can choose to view the updated list

4. **Navigate the interface**:
   - Use arrow keys to navigate menus
   - Press Enter to select options
   - Follow the prompts to perform actions

### Important Note About the Database

The application uses a single SQLite database located at the root of the project (`database.sqlite`). All components (frontend, backend, and admin interface) now use this single database file to avoid synchronization issues.

If you don't see your submitted resources in the admin interface, check that:

1. You're running the admin script from the correct location (`backend/scripts`)
2. The database file exists at the root of the project
3. The resources were successfully submitted through the web interface (check the server logs)

You can verify the database location by looking at the output when running the admin script, which will show the path it's using to access the database.

### Database File Location

The database file is located at:
```
/ai-resource-library/library/database.sqlite
```

This is the only database file used by the application. Any other database.sqlite files that may have been created in other directories should be deleted to avoid confusion.

## Troubleshooting

### Form Submission Issues

If you encounter problems when submitting resources:

1. **Check Server Status**: Ensure both frontend and backend servers are running
2. **Verify Backend Connection**: Confirm the backend is accessible at http://localhost:5000
3. **Required Fields**: Make sure all required form fields are filled out correctly
4. **Check Console**: Look for error messages in the browser's developer console
5. **Check Server Logs**: Review the terminal output for backend error messages

### Common Errors and Solutions

#### "Failed to submit resource" Error

This usually indicates one of the following issues:

- **Backend not running**: Start the backend server with `npm run dev:backend`
- **Data validation error**: Ensure all form fields are filled correctly
- **Database issue**: Check the server logs for database-related errors

#### Port Conflicts

If you see errors about ports already being in use:

1. Check if you have other applications running on ports 5000 or 5173
2. Stop those applications or change the ports in the configuration

## Building for Production

To build the application for production:

```bash
# From the root directory
npm run build
```

This will create a production build of the frontend in the `dist` directory.

To start the production server:

```bash
# From the root directory
npm start
```

## Need More Help?

If you encounter issues not covered in this guide, please:

1. Check the GitHub repository issues section
2. Create a new issue with detailed information about your problem
3. Include error messages and steps to reproduce the issue
