# ⚡ Quick Start Guide - Evolution SaaS

## 🎯 5-Minute Setup

### Step 1: Install Dependencies (2 min)
```bash
cd /home/code/evolution-saas-platform
npm install
```

### Step 2: Setup Database (1 min)
```bash
createdb evolution_saas_dev
```

### Step 3: Configure Environment (1 min)
```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Frontend  
cp apps/frontend/.env.example apps/frontend/.env
```

### Step 4: Start Development (1 min)
```bash
# Terminal 1: Backend
npm run backend:dev

# Terminal 2: Frontend
npm run frontend:dev
```

### Step 5: Verify
```bash
# Backend health check
curl http://localhost:3000/health

# Frontend
open http://localhost:3001
```

---

## 📁 Project Structure at a Glance

```
evolution-saas-platform/
├── apps/
│   ├── backend/          ← REST API (Port 3000)
│   └── frontend/         ← Next.js UI (Port 3001)
├── packages/
│   ├── sdk/              ← TypeScript SDK
│   ├── types/            ← Shared types
│   └── utils/            ← Utilities
├── plugins/
│   ├── shopify/          ← Shopify plugin
│   ├── woocommerce/      ← WooCommerce plugin
│   ├── crm/              ← CRM plugin
│   ├── zapier/           ← Zapier plugin
│   └── make/             ← Make.com plugin
└── docs/                 ← Documentation
```

---

## 🚀 Common Commands

### Development
```bash
# Start backend with hot reload
npm run backend:dev

# Start frontend with hot reload
npm run frontend:dev

# Run both (from root)
npm run dev
```

### Building
```bash
# Build backend
npm run backend:build

# Build frontend
npm run frontend:build

# Build all
npm run build
```

### Testing
```bash
# Test backend
npm run backend:test

# Test frontend
npm run frontend:test

# Test all
npm run test
```

### Linting
```bash
# Lint backend
npm run backend:lint

# Lint frontend
npm run frontend:lint

# Lint all
npm run lint
```

---

## 🔌 API Endpoints

### Health Check
```bash
GET http://localhost:3000/health
```

### API Documentation
```bash
GET http://localhost:3000/api/v1
```

### Authentication
```bash
POST http://localhost:3000/api/v1/auth/register
POST http://localhost:3000/api/v1/auth/login
```

### WhatsApp
```bash
GET http://localhost:3000/api/v1/whatsapp/instances
POST http://localhost:3000/api/v1/whatsapp/instances
```

### Messages
```bash
POST http://localhost:3000/api/v1/messages/send
GET http://localhost:3000/api/v1/messages
```

---

## 📊 Frontend Pages

- **Home:** http://localhost:3001
- **Features:** http://localhost:3001#features
- **Pricing:** http://localhost:3001#pricing

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 3001
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Check database exists
psql -U postgres -l | grep evolution_saas_dev
```

### npm Install Issues
```bash
# Clear cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📚 Next Steps

1. **Read Documentation:** `DEVELOPMENT_GUIDE.md`
2. **Explore Backend:** `apps/backend/src/index.ts`
3. **Explore Frontend:** `apps/frontend/app/page.tsx`
4. **Create First Plugin:** `plugins/shopify/`
5. **Deploy:** See `DEVELOPMENT_GUIDE.md` → Deployment

---

## 💡 Tips

- Use `npm run backend:dev` for backend development
- Use `npm run frontend:dev` for frontend development
- Check `.env.example` files for configuration options
- Read API docs at `http://localhost:3000/api/v1`
- Use TypeScript for type safety
- Follow Git workflow: `feature/your-feature-name`

---

## 🎓 Learning Resources

- [Evolution API Docs](https://docs.evolution-api.com)
- [Express.js Guide](https://expressjs.com)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

## 🆘 Need Help?

1. Check `DEVELOPMENT_GUIDE.md` for detailed setup
2. Check `.env.example` files for configuration
3. Run `npm run backend:dev` to see server logs
4. Check browser console for frontend errors
5. Open GitHub issue for bugs

---

**Happy Coding! 🚀**

Last Updated: October 17, 2025
