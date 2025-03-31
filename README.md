# AI Library Project 🤖

A full-stack web application showcasing AI/ML implementations with interactive demos and educational resources. Built with modern web technologies for seamless integration of machine learning models into web interfaces.

**Live Demo**: [ai-library-tfelbor.netlify.app](https://ai-library-tfelbor.netlify.app/)  
[![Netlify Status](https://api.netlify.com/api/v1/badges/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/deploy-status)](https://app.netlify.com/sites/ai-library-tfelbor/deploys)

## Key Features ✨
- Interactive AI model demonstrations
- Educational resources for machine learning concepts
- API integration with popular ML frameworks
- Responsive web design with dark/light themes
- User authentication system
- Model performance visualization tools

## Tech Stack 🛠️
**Frontend**:
- React + Vite + TypeScript
- Redux Toolkit for state management
- Chart.js for data visualization
- Tailwind CSS + Framer Motion

**Backend**:
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- TensorFlow.js integration

## Installation Guide 🚀
1. Clone repository:

''' bash
git clone https://github.com/TFelbor/ai-library.git
cd ai-library
'''

2. Set up backend:

''' bash
cd backend
npm install
cp .env.example .env
npm run dev
'''

3. Set up frontend:

''' bash
cd ../frontend
npm install
npm run dev
'''

## Project Structure 📂

''' bash
├── backend
│ ├── controllers/  # API controllers
│ ├── models/       # MongoDB schemas
│ ├── routes/       # Express routes
│ └── utils/        # ML model handlers
├── frontend
│ ├── public/       # Static assets
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── features/   # Redux slices
│ │ ├── models/     # TypeScript interfaces
│ │ └── pages/      # Route components
'''

## Contributing 🤝
1. Fork the repository
2. Create feature branch:

''' bash
git checkout -b feature/your-feature
'''

3. Commit changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to branch and open a PR

## License 📄
MIT License - see [LICENSE](https://github.com/TFelbor/ai-library/blob/main/LICENSE) for details

---

**Special Thanks** to the TensorFlow.js team and Netlify for deployment support.