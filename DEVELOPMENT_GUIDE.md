# 🚀 Evolution SaaS - Complete Development Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Development Workflow](#development-workflow)
5. [API Documentation](#api-documentation)
6. [Plugin Development](#plugin-development)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 📊 Project Overview

**Evolution SaaS** is a complete WhatsApp integration platform built on top of Evolution API. It provides:

- ✅ Multi-tenant SaaS architecture
- ✅ WhatsApp message management
- ✅ Contact management
- ✅ Plugin ecosystem
- ✅ Webhook support
- ✅ Analytics dashboard
- ✅ Payment integration
- ✅ Email notifications

### Tech Stack

**Backend:**
- Node.js 18+
- Express.js
- TypeScript
- PostgreSQL
- Socket.io

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)

**Infrastructure:**
- Docker
- Docker Compose
- GitHub Actions (CI/CD)

---

## 🏗️ Architecture

### Monorepo Structure

```
evolution-saas-platform/
├── apps/
│   ├── backend/          # REST API + WebSocket server
│   ├── frontend/         # Marketing + Dashboard UI
│   └── admin-dashboard/  # Admin panel (coming soon)
├── packages/
│   ├── sdk/              # TypeScript SDK for clients
│   ├── utils/            # Shared utilities
│   ├── types/            # Shared TypeScript types
│   └── database/         # Database schemas & migrations
├── plugins/
│   ├── shopify/          # Shopify integration
│   ├── woocommerce/      # WooCommerce integration
│   ├── crm/              # CRM integration
│   ├── zapier/           # Zapier integration
│   ├── make/             # Make.com integration
│   └── custom/           # Custom plugins template
└── docs/                 # Documentation
```

### Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  subscription_tier VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- WhatsApp Instances
CREATE TABLE whatsapp_instances (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  instance_name VARCHAR(255),
  phone_number VARCHAR(20),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  instance_id UUID REFERENCES whatsapp_instances(id),
  from_number VARCHAR(20),
  to_number VARCHAR(20),
  message_text TEXT,
  message_type VARCHAR(50),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contacts
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  instance_id UUID REFERENCES whatsapp_instances(id),
  phone_number VARCHAR(20),
  name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Webhooks
CREATE TABLE webhooks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  url VARCHAR(500),
  events TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔧 Setup Instructions

### Prerequisites

```bash
# Check Node.js version (18+)
node --version

# Check npm version (9+)
npm --version

# Check PostgreSQL version (12+)
psql --version
```

### Step 1: Clone & Install

```bash
cd /home/code/evolution-saas-platform

# Install all dependencies
npm install

# This will install dependencies for all workspaces
```

### Step 2: Database Setup

```bash
# Create development database
createdb evolution_saas_dev

# Create test database
createdb evolution_saas_test

# Run migrations (coming soon)
npm run db:migrate
```

### Step 3: Environment Configuration

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Frontend
cp apps/frontend/.env.example apps/frontend/.env

# Edit .env files with your configuration
```

### Step 4: Start Development Servers

```bash
# Terminal 1: Start backend
npm run backend:dev

# Terminal 2: Start frontend
npm run frontend:dev
```

### Step 5: Verify Installation

```bash
# Backend health check
curl http://localhost:3000/health

# Frontend
open http://localhost:3001
```

---

## 💻 Development Workflow

### Backend Development

```bash
# Start development server with hot reload
npm run backend:dev

# Run tests
npm run backend:test

# Build for production
npm run backend:build

# Lint code
npm run backend:lint
```

### Frontend Development

```bash
# Start development server
npm run frontend:dev

# Build for production
npm run frontend:build

# Run tests
npm run frontend:test

# Lint code
npm run frontend:lint
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

---

## 📡 API Documentation

### Authentication

```bash
# Register
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Corp"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### WhatsApp Instances

```bash
# Get instances
GET /api/v1/whatsapp/instances
Authorization: Bearer {token}

# Create instance
POST /api/v1/whatsapp/instances
Authorization: Bearer {token}
Content-Type: application/json

{
  "instanceName": "my-instance",
  "phoneNumber": "+1234567890"
}

# Get instance details
GET /api/v1/whatsapp/instances/{instanceId}
Authorization: Bearer {token}
```

### Messages

```bash
# Send message
POST /api/v1/messages/send
Authorization: Bearer {token}
Content-Type: application/json

{
  "instanceId": "uuid",
  "toNumber": "+1234567890",
  "message": "Hello, World!"
}

# Get messages
GET /api/v1/messages?instanceId={instanceId}&limit=50
Authorization: Bearer {token}
```

### Webhooks

```bash
# Create webhook
POST /api/v1/webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://your-domain.com/webhook",
  "events": ["message.received", "message.sent", "instance.connected"]
}

# List webhooks
GET /api/v1/webhooks
Authorization: Bearer {token}

# Delete webhook
DELETE /api/v1/webhooks/{webhookId}
Authorization: Bearer {token}
```

---

## 🔌 Plugin Development

### Plugin Structure

```
plugins/shopify/
├── package.json
├── src/
│   ├── index.ts
│   ├── config.ts
│   ├── handlers/
│   │   ├── product-sync.ts
│   │   ├── order-notification.ts
│   │   └── customer-sync.ts
│   └── types.ts
└── README.md
```

### Creating a Plugin

```typescript
// plugins/shopify/src/index.ts

import { Plugin, PluginConfig } from '@evolution-saas/sdk';

export class ShopifyPlugin implements Plugin {
  name = 'shopify';
  version = '1.0.0';
  
  async initialize(config: PluginConfig) {
    console.log('Shopify plugin initialized');
  }
  
  async handleWebhook(data: any) {
    // Handle Shopify webhook
  }
  
  async syncProducts() {
    // Sync products from Shopify
  }
}

export default new ShopifyPlugin();
```

### Plugin Configuration

```json
{
  "name": "shopify",
  "version": "1.0.0",
  "description": "Shopify integration plugin",
  "main": "dist/index.js",
  "config": {
    "apiKey": "required",
    "apiSecret": "required",
    "shopName": "required"
  }
}
```

---

## 🚀 Deployment

### Docker Deployment

```bash
# Build Docker image
docker build -t evolution-saas:latest .

# Run container
docker run -p 3000:3000 -p 3001:3001 evolution-saas:latest

# Using Docker Compose
docker-compose up -d
```

### Environment Variables for Production

```bash
# Backend
NODE_ENV=production
PORT=3000
DB_HOST=prod-db.example.com
DB_NAME=evolution_saas_prod
JWT_SECRET=your_secure_secret_key
EVOLUTION_API_URL=https://api.evolution-api.com
STRIPE_SECRET_KEY=sk_live_...

# Frontend
NEXT_PUBLIC_API_URL=https://api.evolutionsaas.com
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      - name: Deploy to production
        run: npm run deploy
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Port 3000 already in use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

**Issue: Database connection error**
```bash
# Check PostgreSQL is running
psql -U postgres -d evolution_saas_dev -c "SELECT 1"

# Check connection string in .env
```

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**Issue: TypeScript compilation errors**
```bash
# Check TypeScript version
npm list typescript

# Rebuild TypeScript
npm run build
```

---

## 📚 Additional Resources

- [Evolution API Documentation](https://docs.evolution-api.com)
- [Express.js Guide](https://expressjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

---

## 📞 Support

For issues and questions:
- GitHub Issues: [evolution-saas/issues](https://github.com/your-org/evolution-saas/issues)
- Email: support@evolutionsaas.com
- Discord: [Join our community](https://discord.gg/evolution-saas)

---

**Happy Coding! 🚀**
