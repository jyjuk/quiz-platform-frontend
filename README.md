# Quiz Platform - Frontend

React + TypeScript + Material UI application for Quiz Management System.

## 🚀 Getting Started

### Prerequisites

- Node.js 22.12+ (or 20.19+)
- npm 10+
- Docker Desktop (for containerized deployment)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:jyjuk/quiz-platform-frontend.git
cd quiz-platform-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from `.env.sample`:

```bash
cp .env.sample .env
```

4. Fill in the `.env` file with your configuration values.

### Running the Application

**Development mode:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**Production build:**

```bash
npm run build
npm run preview
```

### Code Formatting

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## 📁 Project Structure

```
src/
├── api/            # API services and HTTP clients
├── components/     # Reusable UI components
├── constants/      # Application constants
├── pages/          # Page components
├── store/          # Global state management
├── types/          # TypeScript type definitions
├── utils/          # Helper functions
└── theme.ts        # Material UI theme configuration
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📝 Environment Variables

See `.env.sample` for required environment variables.

**Example `.env` file:**

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
VITE_APP_NAME=Quiz Platform
VITE_APP_VERSION=1.0.0
```

## 🔗 Backend API

Backend repository: [Quiz Platform Backend](https://github.com/jyjuk/backend-internship)

**Local Backend:**

- API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- OpenAPI Schema: `http://localhost:8000/openapi.json`

## 🐳 Docker

### Prerequisites

- Docker Desktop installed
- Docker Compose installed

### Building Docker Image

Build the production Docker image:

```bash
docker build -t quiz-platform-frontend .
```

### Running with Docker

#### Option 1: Frontend Only

Run only the frontend container:

```bash
docker run -d -p 3000:80 --name quiz-platform-frontend quiz-platform-frontend
```

The application will be available at `http://localhost:3000`

**Note:** You need to have the backend running separately on `http://localhost:8000`

#### Option 2: Frontend with Docker Compose

Run frontend with docker-compose:

```bash
docker-compose up -d
```

This starts only the frontend container on port 3000.

**View logs:**

```bash
docker-compose logs -f frontend
```

**Stop services:**

```bash
docker-compose down
```

**Rebuild and restart:**

```bash
docker-compose up -d --build
```

#### Option 3: Full Stack (Frontend + Backend + PostgreSQL + Redis)

Run the complete application stack:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This will start:

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

**Prerequisites for Full Stack:**

- Backend project must be in `../../backend_internship/` directory
- Backend Dockerfile must exist

**View all logs:**

```bash
docker-compose -f docker-compose.dev.yml logs -f
```

**Stop all services:**

```bash
docker-compose -f docker-compose.dev.yml down
```

**Stop and remove volumes:**

```bash
docker-compose -f docker-compose.dev.yml down -v
```

### Docker Commands Reference

#### Basic Commands

```bash
# Build image
docker build -t quiz-platform-frontend .

# Run container
docker run -d -p 3000:80 --name quiz-platform-frontend quiz-platform-frontend

# Stop container
docker stop quiz-platform-frontend

# Remove container
docker rm quiz-platform-frontend

# View logs
docker logs quiz-platform-frontend

# Follow logs in real-time
docker logs -f quiz-platform-frontend

# Access container shell
docker exec -it quiz-platform-frontend sh

# Inspect container
docker inspect quiz-platform-frontend
```

#### Docker Compose Commands

```bash
# Start services (frontend only)
docker-compose up -d

# Start with build
docker-compose up -d --build

# Start full stack
docker-compose -f docker-compose.dev.yml up -d

# View logs (frontend only)
docker-compose logs -f frontend

# View all logs (full stack)
docker-compose -f docker-compose.dev.yml logs -f

# View specific service logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose up -d --build frontend

# Check running containers
docker-compose ps

# Restart specific service
docker-compose restart frontend
```

#### Cleanup Commands

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove all unused data
docker system prune -a

# Remove specific image
docker rmi quiz-platform-frontend

# List images
docker images

# List all containers
docker ps -a
```

### Multi-stage Build

The Dockerfile uses a multi-stage build approach for optimal production deployment:

**Stage 1: Builder (Node.js)**

- Base image: `node:20-alpine`
- Installs dependencies with `npm ci`
- Builds production bundle with `npm run build`
- Optimizes assets for production

**Stage 2: Production (Nginx)**

- Base image: `nginx:alpine` (~25MB)
- Copies built static files from builder stage
- Configured with custom nginx.conf
- Serves optimized static content

**Benefits:**

- ✅ Minimal image size (~25MB vs ~1GB with Node.js)
- ✅ No development dependencies in production
- ✅ Fast container startup time
- ✅ Optimized for serving static files
- ✅ Production-ready with caching and compression
- ✅ Secure - only production code included

### Nginx Configuration

The included `nginx.conf` provides:

- **SPA Routing Support**: Handles React Router client-side routing with fallback to index.html
- **Gzip Compression**: Reduces file sizes by ~70% for faster load times
- **Static Asset Caching**: 1-year cache headers for JS/CSS/images
- **Security Headers**:
    - `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
    - `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
    - `X-XSS-Protection: 1; mode=block` - XSS protection

### Network Configuration

Both docker-compose files use the `quiz-network` bridge network:

- Allows secure inter-container communication
- Frontend can reach backend via service name (`http://backend:8000`)
- Backend can reach PostgreSQL via service name (`postgres:5432`)
- Backend can reach Redis via service name (`redis:6379`)
- Isolated from other Docker networks

### Environment Variables in Docker

### Environment Variables in Docker

**For Frontend Development:**
Environment variables are loaded from `.env` file during build time.

**For Full Stack Development (`docker-compose.dev.yml`):**

1. Create `.env.docker` from template:

```bash
cp .env.docker.sample .env.docker
```

2. Fill in the values (or use defaults for local development):

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=internship_db

JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_REFRESH_SECRET_KEY=your-refresh-secret-key-change-in-production
SECRET_KEY=your-general-secret-key
```

3. Start the full stack:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Security Notes:**

- ✅ `.env.docker.sample` is committed to Git (template with empty values)
- ❌ `.env.docker` is in `.gitignore` (contains real credentials)
- ⚠️ Never commit files with real passwords or secrets
- 🔒 Use strong, unique passwords for production environments

**For Production:**
Create `.env.production` file for frontend build:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
VITE_APP_NAME=Quiz Platform
VITE_APP_VERSION=1.0.0
```

Build with production environment:

```bash
docker build --build-arg NODE_ENV=production -t quiz-platform-frontend:prod .
```

**Important:**

- Vite bakes frontend environment variables into the build at build time, not runtime
- Backend environment variables are loaded at runtime from `.env.docker`

### Connecting to Backend

Configure backend URL based on your deployment:

**Option 1: Backend on Host Machine**

```env
VITE_API_BASE_URL=http://host.docker.internal:8000
```

**Option 2: Backend in Same Docker Network**

```env
VITE_API_BASE_URL=http://backend:8000
```

**Option 3: Full Stack with docker-compose.dev.yml**

- Frontend automatically connects to `http://backend:8000` within Docker network
- Accessible externally at `http://localhost:8000`

### Directory Structure Note

The `docker-compose.dev.yml` is configured for this directory structure:

```
C:\
├── backend_internship\          # Backend project
└── frontend_internship\
    └── quiz-platform-frontend\  # Frontend project (this repo)
```

If your directory structure is different, update the `context` path in `docker-compose.dev.yml`:

```yaml
backend:
  build:
    context: ../../backend_internship  # Adjust this path
```

### Troubleshooting

**Frontend can't connect to backend:**

```bash
# Check if backend is running
docker ps | findstr backend

# Check network
docker network inspect quiz-platform-frontend_quiz-network

# Test connection from frontend container
docker exec -it quiz-platform-frontend sh
wget -O- http://backend:8000
```

**Build fails:**

```bash
# Clean Docker cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t quiz-platform-frontend .

# Check Docker disk space
docker system df
```

**Port already in use:**

```bash
# Check what's using the port (Windows)
netstat -ano | findstr :3000

# Use different port
docker run -d -p 3001:80 quiz-platform-frontend
```

**Container exits immediately:**

```bash
# Check container logs
docker logs quiz-platform-frontend

# Run container in foreground to see errors
docker run -p 3000:80 quiz-platform-frontend
```

**Changes not reflecting:**

```bash
# Rebuild with --no-cache
docker-compose up -d --build --no-cache

# Or for full stack
docker-compose -f docker-compose.dev.yml up -d --build --no-cache
```

### Verified Working Configuration

**Successfully tested on:**

- Operating System: Windows 11
- Docker Desktop: Latest version
- Node.js: 22.11.0
- npm: 10.9.0
- Python: 3.12 (for backend)

**Container sizes:**

- Frontend: ~25MB (nginx:alpine)
- Backend: ~200MB (python:3.12-slim)
- PostgreSQL: ~250MB (postgres:16-alpine)
- Redis: ~40MB (redis:7-alpine)
- **Total stack**: ~515MB

**Startup time:**

- Full stack (first time): ~30-40 seconds
- Full stack (cached): ~10 seconds
- Frontend only: ~5 seconds

**Build time:**

- Frontend: ~20-30 seconds
- Backend: ~10-15 seconds (cached dependencies)

### Production Deployment

For production deployment:

1. **Build production image:**

```bash
docker build --build-arg NODE_ENV=production -t quiz-platform-frontend:prod .
```

2. **Tag for registry:**

```bash
docker tag quiz-platform-frontend:prod your-registry/quiz-platform-frontend:latest
```

3. **Push to registry:**

```bash
docker push your-registry/quiz-platform-frontend:latest
```

4. **Deploy to orchestration platform:**
    - AWS ECS/Fargate
    - Google Cloud Run
    - Azure Container Instances
    - Kubernetes
    - Docker Swarm

**Production docker-compose example:**

```yaml
services:
  frontend:
    image: your-registry/quiz-platform-frontend:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: always
    healthcheck:
      test: [ "CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80" ]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# The build output will be in the `dist/` directory
```

## 🎨 Code Style

- **Prettier**: Automatic code formatting
- **ESLint**: Code linting (configured by Vite)
- **TypeScript**: Strict type checking

**Format before commit:**

```bash
npm run format
```

## 🔧 Development Workflow

1. Create a new branch from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b FE-X-feature-name
```

2. Make your changes and commit:

```bash
npm run format
git add .
git commit -m "FE-X: Description of changes"
```

3. Push your branch:

```bash
git push -u origin FE-X-feature-name
```

4. Create Pull Request on GitHub:
    - Base: `develop`
    - Compare: `FE-X-feature-name`
    - Add reviewers (mentors)
    - Set yourself as assignee

5. Wait for code review and approval

6. After approval, mentor will merge the PR

**Important:** Never merge your own PRs. Always wait for mentor approval.

## 📚 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🤝 Contributing

1. Follow the Git workflow described above
2. Use conventional commit messages
3. Format code before committing
4. Write tests for new features
5. Update documentation as needed

## 📄 License

This project is part of an internship program.

## 👥 Authors

- [@jyjuk](https://github.com/jyjuk)

## 👨‍🏫 Mentors

- tkach-v
- FUZIR
- Ilia-puzdranovskuy

## 🔗 Related Repositories

- [Backend Repository](https://github.com/jyjuk/backend-internship)