# 🧪 Testing Quick Reference - Evolution SaaS Platform

**तेजी से टेस्टिंग के लिए सभी लिंक्स और कमांड्स**

---

## 📚 सभी महत्वपूर्ण लिंक्स (All Important Links)

### 📖 Documentation Links
| Document | Link | Purpose |
|----------|------|---------|
| **Navigation Guide** | [INDEX.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/INDEX.md) | सभी डॉक्स के लिए शुरुआत करें |
| **Quick Start** | [QUICK_START.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/QUICK_START.md) | 5 मिनट में शुरू करें |
| **API Reference** | [API_DOCUMENTATION.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/API_DOCUMENTATION.md) | सभी API endpoints |
| **Testing Guide** | [TESTING_LINKS.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/TESTING_LINKS.md) | विस्तृत टेस्टिंग गाइड |
| **Deployment** | [DEPLOYMENT_GUIDE.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/DEPLOYMENT_GUIDE.md) | Deploy करने के लिए |
| **Development** | [DEVELOPMENT_GUIDE.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/DEVELOPMENT_GUIDE.md) | Development workflow |

### 🔗 GitHub Links
| Link | Purpose |
|------|---------|
| [Repository](https://github.com/2lokeshrao/evolution-saas-platform) | Main repository |
| [Backend Code](https://github.com/2lokeshrao/evolution-saas-platform/tree/main/apps/backend) | Backend folder |
| [Frontend Code](https://github.com/2lokeshrao/evolution-saas-platform/tree/main/apps/frontend) | Frontend folder |
| [Issues](https://github.com/2lokeshrao/evolution-saas-platform/issues) | Report issues |

---

## 🚀 Quick Start Commands

### 1️⃣ Clone करें (Clone Repository)
```bash
git clone https://github.com/2lokeshrao/evolution-saas-platform.git
cd evolution-saas-platform
```

### 2️⃣ Dependencies Install करें
```bash
npm install
```

### 3️⃣ Environment Setup करें
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
```

### 4️⃣ Database Create करें
```bash
createdb evolution_saas_dev
```

### 5️⃣ Development Servers चलाएं
```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - Frontend
npm run frontend:dev
```

### 6️⃣ Access करें
- **Frontend:** http://localhost:3001
- **Backend:** http://localhost:3000/api/v1
- **Health:** http://localhost:3000/health

---

## 🧪 API Testing - cURL Commands

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456",
    "name": "Test User"
  }'
```

### 3. Login User
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456"
  }'
```

### 4. Get Profile (Replace TOKEN)
```bash
curl -X GET http://localhost:3000/api/v1/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### 5. Create WhatsApp Instance (Replace TOKEN)
```bash
curl -X POST http://localhost:3000/api/v1/whatsapp/instances \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Instance",
    "phoneNumber": "+1234567890"
  }'
```

### 6. List Instances (Replace TOKEN)
```bash
curl -X GET http://localhost:3000/api/v1/whatsapp/instances \
  -H "Authorization: Bearer TOKEN"
```

### 7. Send Message (Replace TOKEN & IDs)
```bash
curl -X POST http://localhost:3000/api/v1/whatsapp/messages/send \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceId": "instance-id",
    "to": "+1234567890",
    "message": "Hello!"
  }'
```

---

## 📊 API Endpoints Summary

### Authentication (3 endpoints)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/auth/register` | नया user register करें |
| POST | `/api/v1/auth/login` | Login करें |
| GET | `/api/v1/auth/profile` | Profile देखें |

### WhatsApp Management (3 endpoints)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/whatsapp/instances` | Instance बनाएं |
| GET | `/api/v1/whatsapp/instances` | सभी instances देखें |
| GET | `/api/v1/whatsapp/instances/:id` | Instance status देखें |

### Messaging (2 endpoints)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/whatsapp/messages/send` | Message भेजें |
| GET | `/api/v1/whatsapp/messages` | Message history देखें |

### Webhooks & Health (1 endpoint)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/webhooks/evolution` | Webhooks receive करें |
| GET | `/health` | Health check |

---

## 🧪 Testing Checklist

### Backend Testing
- [ ] Health check endpoint काम करता है
- [ ] User registration काम करता है
- [ ] User login काम करता है
- [ ] JWT token generate होता है
- [ ] Protected routes काम करते हैं
- [ ] WhatsApp instance creation काम करता है
- [ ] Message sending काम करता है
- [ ] Error handling काम करता है

### Frontend Testing
- [ ] Landing page load होता है
- [ ] Navigation काम करता है
- [ ] Responsive design काम करता है
- [ ] सभी components render होते हैं
- [ ] Mobile menu काम करता है

### Security Testing
- [ ] Passwords hash होते हैं
- [ ] JWT tokens काम करते हैं
- [ ] CORS configured है
- [ ] Environment variables protected हैं

---

## 🛠️ Troubleshooting

### Backend Port 3000 में issue
```bash
# Port 3000 को kill करें
lsof -i :3000
kill -9 <PID>

# फिर से चलाएं
npm run backend:dev
```

### Frontend Port 3001 में issue
```bash
# Port 3001 को kill करें
lsof -i :3001
kill -9 <PID>

# फिर से चलाएं
npm run frontend:dev
```

### Database Connection Error
```bash
# PostgreSQL check करें
psql -U postgres

# Database create करें
createdb evolution_saas_dev

# Connection test करें
psql -U postgres -d evolution_saas_dev
```

---

## 📱 Testing Tools

### Online Tools
- **JWT Debugger:** https://jwt.io/
- **Postman:** https://www.postman.com/
- **Insomnia:** https://insomnia.rest/

### Command Line Tools
- **cURL:** Built-in (सभी OS में)
- **HTTPie:** `brew install httpie`
- **Thunder Client:** VS Code extension

---

## 📝 Test Scenarios

### Scenario 1: Complete User Flow
1. Register करें
2. Login करें
3. Token प्राप्त करें
4. Profile access करें

### Scenario 2: WhatsApp Integration
1. Instance create करें
2. Instances list करें
3. Instance status check करें
4. Message भेजें

### Scenario 3: Error Handling
1. Wrong password से login करें
2. Token के बिना protected route access करें
3. Invalid data के साथ request भेजें

---

## 🎯 Next Steps

### आज (Today)
1. Repository clone करें
2. Dependencies install करें
3. Environment setup करें
4. Servers चलाएं

### इस हफ्ते (This Week)
1. सभी API endpoints test करें
2. Frontend explore करें
3. Database setup करें
4. Deployment guide पढ़ें

### अगले हफ्ते (Next Week)
1. Staging में deploy करें
2. Production setup करें
3. Monitoring setup करें

---

## 📞 Support

### Documentation
- 📖 [INDEX.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/INDEX.md) - शुरुआत करें
- 📖 [TESTING_LINKS.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/TESTING_LINKS.md) - विस्तृत गाइड
- 📖 [API_DOCUMENTATION.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/API_DOCUMENTATION.md) - API reference

### GitHub
- 🔗 [Repository](https://github.com/2lokeshrao/evolution-saas-platform)
- 🔗 [Issues](https://github.com/2lokeshrao/evolution-saas-platform/issues)

---

## ✅ Quick Verification

### सब कुछ काम कर रहा है या नहीं check करने के लिए:

```bash
# 1. Health check
curl http://localhost:3000/health

# 2. Frontend access
curl http://localhost:3001

# 3. Backend API
curl http://localhost:3000/api/v1/auth/register
```

अगर सभी काम कर रहे हैं तो आप ready हो! ✅

---

## 🎉 Ready to Test!

सभी कुछ तैयार है। अब:

1. **Clone करें:** `git clone https://github.com/2lokeshrao/evolution-saas-platform.git`
2. **Setup करें:** Follow QUICK_START.md
3. **Test करें:** ऊपर दिए गए commands use करें
4. **Deploy करें:** DEPLOYMENT_GUIDE.md पढ़ें

---

**Happy Testing! 🚀**

**Last Updated:** October 17, 2025
**Status:** ✅ Production Ready

