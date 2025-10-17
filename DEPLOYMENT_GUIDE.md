# Evolution SaaS Platform - Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Docker (optional)
- Git

---

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/2lokeshrao/evolution-saas-platform.git
cd evolution-saas-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
createdb evolution_saas_dev
```

### 4. Configure Environment Variables

**Backend (.env):**
```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/evolution_saas_dev
JWT_SECRET=your-super-secret-jwt-key
EVOLUTION_API_URL=http://localhost:8080
EVOLUTION_API_KEY=your-evolution-api-key
CORS_ORIGIN=http://localhost:3001
LOG_LEVEL=debug
```

**Frontend (.env.local):**
```bash
cp apps/frontend/.env.example apps/frontend/.env.local
```

Edit `apps/frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_NAME=Evolution SaaS Platform
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
npm run backend:dev
```

**Terminal 2 - Frontend:**
```bash
npm run frontend:dev
```

Visit:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api/v1
- Health Check: http://localhost:3000/health

---

## Production Deployment

### Option 1: Deploy to Heroku

#### Backend Deployment

1. **Create Heroku App:**
```bash
heroku create evolution-saas-backend
```

2. **Add PostgreSQL:**
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. **Set Environment Variables:**
```bash
heroku config:set JWT_SECRET=your-production-secret
heroku config:set EVOLUTION_API_KEY=your-api-key
heroku config:set NODE_ENV=production
```

4. **Deploy:**
```bash
git push heroku main
```

#### Frontend Deployment

1. **Create Heroku App:**
```bash
heroku create evolution-saas-frontend
```

2. **Set Environment Variables:**
```bash
heroku config:set NEXT_PUBLIC_API_URL=https://evolution-saas-backend.herokuapp.com/api/v1
```

3. **Deploy:**
```bash
git push heroku main
```

---

### Option 2: Deploy to Vercel (Frontend)

1. **Connect GitHub Repository:**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Select `apps/frontend` as root directory

2. **Set Environment Variables:**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

3. **Deploy:**
   - Vercel will automatically deploy on push to main

---

### Option 3: Deploy to AWS

#### Using EC2

1. **Launch EC2 Instance:**
   - Ubuntu 20.04 LTS
   - t2.micro (free tier eligible)

2. **SSH into Instance:**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

3. **Install Dependencies:**
```bash
sudo apt update
sudo apt install nodejs npm postgresql postgresql-contrib
```

4. **Clone Repository:**
```bash
git clone https://github.com/2lokeshrao/evolution-saas-platform.git
cd evolution-saas-platform
npm install
```

5. **Setup PostgreSQL:**
```bash
sudo -u postgres createdb evolution_saas_prod
```

6. **Configure Environment:**
```bash
cp apps/backend/.env.example apps/backend/.env
# Edit .env with production values
```

7. **Start Services:**
```bash
# Using PM2 for process management
npm install -g pm2
pm2 start apps/backend/src/index.ts --name "evolution-backend"
pm2 start "npm run frontend:start" --name "evolution-frontend"
pm2 save
```

8. **Setup Nginx Reverse Proxy:**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
upstream backend {
    server localhost:3000;
}

upstream frontend {
    server localhost:3001;
}

server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 4: Docker Deployment

#### Create Dockerfile for Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY apps/backend ./apps/backend
COPY apps/backend/.env.example ./apps/backend/.env

EXPOSE 3000

CMD ["npm", "run", "backend:start"]
```

#### Create Dockerfile for Frontend

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY apps/frontend ./apps/frontend
RUN npm run frontend:build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/package*.json ./apps/frontend/

EXPOSE 3001

CMD ["npm", "run", "frontend:start"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: evolution_saas_prod
      POSTGRES_PASSWORD: your-password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    environment:
      DATABASE_URL: postgresql://postgres:your-password@postgres:5432/evolution_saas_prod
      JWT_SECRET: your-secret
      NODE_ENV: production
    ports:
      - "3000:3000"
    depends_on:
      - postgres

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3000/api/v1
    ports:
      - "3001:3001"
    depends_on:
      - backend

volumes:
  postgres_data:
```

**Deploy with Docker Compose:**
```bash
docker-compose up -d
```

---

## Database Migrations

### Create Migration
```bash
npm run db:migrate:create -- --name migration_name
```

### Run Migrations
```bash
npm run db:migrate:up
```

### Rollback Migration
```bash
npm run db:migrate:down
```

---

## Monitoring & Logging

### Setup PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 monit
```

### View Logs
```bash
pm2 logs evolution-backend
pm2 logs evolution-frontend
```

---

## Performance Optimization

### Frontend
- Enable Next.js Image Optimization
- Setup CDN (CloudFront, Cloudflare)
- Enable Gzip compression
- Minify CSS/JS

### Backend
- Setup Redis caching
- Enable database connection pooling
- Setup load balancing
- Monitor API response times

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Setup rate limiting
- [ ] Enable logging and monitoring
- [ ] Regular security updates
- [ ] Backup database regularly

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Support

For deployment issues:
- Check logs: `pm2 logs`
- Review environment variables
- Verify database connection
- Check firewall rules
- Contact support: support@evolution-saas.com

