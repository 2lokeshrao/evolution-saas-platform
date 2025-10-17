# 🧪 Evolution SaaS Platform - Testing Links & Guide

**Last Updated:** October 17, 2025
**Status:** ✅ Ready for Testing

---

## 📚 Documentation Links

### Start Here
- **[INDEX.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/INDEX.md)** - Navigation guide for all documentation
- **[README.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/README.md)** - Project introduction

### Quick Setup
- **[QUICK_START.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/QUICK_START.md)** - 5-minute setup guide
- **[COMPLETE_OVERVIEW.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/COMPLETE_OVERVIEW.md)** - Full project overview

### API & Development
- **[API_DOCUMENTATION.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/API_DOCUMENTATION.md)** - Complete API reference with examples
- **[DEVELOPMENT_GUIDE.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/DEVELOPMENT_GUIDE.md)** - Development workflow

### Deployment & Testing
- **[DEPLOYMENT_GUIDE.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/DEPLOYMENT_GUIDE.md)** - Deployment instructions
- **[TESTING_GUIDE.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/TESTING_GUIDE.md)** - Testing strategies

### Architecture & Production
- **[BUILD_SUMMARY.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/BUILD_SUMMARY.md)** - Architecture overview
- **[PRODUCTION_READY_SUMMARY.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/PRODUCTION_READY_SUMMARY.md)** - Production checklist
- **[DELIVERY_CHECKLIST.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/DELIVERY_CHECKLIST.md)** - Verification checklist

---

## 🔗 GitHub Repository Links

### Main Repository
- **Repository:** https://github.com/2lokeshrao/evolution-saas-platform
- **Clone URL:** `https://github.com/2lokeshrao/evolution-saas-platform.git`

### Key Files
- **Backend Index:** https://github.com/2lokeshrao/evolution-saas-platform/blob/main/apps/backend/src/index.ts
- **Frontend Page:** https://github.com/2lokeshrao/evolution-saas-platform/blob/main/apps/frontend/app/page.tsx
- **Auth Controller:** https://github.com/2lokeshrao/evolution-saas-platform/blob/main/apps/backend/src/controllers/authController.ts
- **WhatsApp Controller:** https://github.com/2lokeshrao/evolution-saas-platform/blob/main/apps/backend/src/controllers/whatsappController.ts

### Folders
- **Backend:** https://github.com/2lokeshrao/evolution-saas-platform/tree/main/apps/backend
- **Frontend:** https://github.com/2lokeshrao/evolution-saas-platform/tree/main/apps/frontend
- **Apps:** https://github.com/2lokeshrao/evolution-saas-platform/tree/main/apps

---

## 🚀 Quick Start Testing (30 Seconds)

### Step 1: Clone Repository
```bash
git clone https://github.com/2lokeshrao/evolution-saas-platform.git
cd evolution-saas-platform
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Files
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
```

### Step 4: Create Database
```bash
createdb evolution_saas_dev
```

### Step 5: Run Development Servers
```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - Frontend
npm run frontend:dev
```

### Step 6: Access Application
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000/api/v1
- **Health Check:** http://localhost:3000/health

---

## 🧪 API Testing Links

### Authentication Endpoints

#### 1. Register User
```
POST http://localhost:3000/api/v1/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test@123456",
  "name": "Test User"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

#### 2. Login User
```
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test@123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-id",
      "email": "test@example.com",
      "name": "Test User"
    }
  }
}
```

#### 3. Get User Profile
```
GET http://localhost:3000/api/v1/auth/profile
Authorization: Bearer <token>
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "test@example.com",
    "name": "Test User",
    "createdAt": "2025-10-17T..."
  }
}
```

---

### WhatsApp Management Endpoints

#### 4. Create WhatsApp Instance
```
POST http://localhost:3000/api/v1/whatsapp/instances
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My WhatsApp Instance",
  "phoneNumber": "+1234567890"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Instance created successfully",
  "data": {
    "id": "instance-id",
    "name": "My WhatsApp Instance",
    "phoneNumber": "+1234567890",
    "status": "pending",
    "createdAt": "2025-10-17T..."
  }
}
```

#### 5. List WhatsApp Instances
```
GET http://localhost:3000/api/v1/whatsapp/instances
Authorization: Bearer <token>
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "instance-id",
      "name": "My WhatsApp Instance",
      "phoneNumber": "+1234567890",
      "status": "active",
      "createdAt": "2025-10-17T..."
    }
  ]
}
```

#### 6. Get Instance Status
```
GET http://localhost:3000/api/v1/whatsapp/instances/instance-id
Authorization: Bearer <token>
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "instance-id",
    "name": "My WhatsApp Instance",
    "phoneNumber": "+1234567890",
    "status": "active",
    "lastSyncedAt": "2025-10-17T...",
    "createdAt": "2025-10-17T..."
  }
}
```

---

### Messaging Endpoints

#### 7. Send Message
```
POST http://localhost:3000/api/v1/whatsapp/messages/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "instanceId": "instance-id",
  "to": "+1234567890",
  "message": "Hello, this is a test message!"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "message-id",
    "instanceId": "instance-id",
    "to": "+1234567890",
    "message": "Hello, this is a test message!",
    "status": "sent",
    "sentAt": "2025-10-17T..."
  }
}
```

#### 8. Get Message History
```
GET http://localhost:3000/api/v1/whatsapp/messages?instanceId=instance-id
Authorization: Bearer <token>
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "message-id",
      "instanceId": "instance-id",
      "to": "+1234567890",
      "message": "Hello, this is a test message!",
      "status": "sent",
      "sentAt": "2025-10-17T..."
    }
  ]
}
```

---

### Webhook Endpoint

#### 9. Webhook Receiver
```
POST http://localhost:3000/api/v1/webhooks/evolution
Content-Type: application/json

{
  "event": "message.received",
  "data": {
    "instanceId": "instance-id",
    "from": "+1234567890",
    "message": "Hello from WhatsApp!"
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Webhook received successfully"
}
```

---

### Health Check

#### Health Check Endpoint
```
GET http://localhost:3000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-17T..."
}
```

---

## 🧪 Testing with cURL

### Test 1: Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456",
    "name": "Test User"
  }'
```

### Test 2: Login User
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456"
  }'
```

### Test 3: Get Profile (Replace TOKEN with actual token)
```bash
curl -X GET http://localhost:3000/api/v1/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Test 4: Create Instance (Replace TOKEN with actual token)
```bash
curl -X POST http://localhost:3000/api/v1/whatsapp/instances \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My WhatsApp Instance",
    "phoneNumber": "+1234567890"
  }'
```

### Test 5: List Instances (Replace TOKEN with actual token)
```bash
curl -X GET http://localhost:3000/api/v1/whatsapp/instances \
  -H "Authorization: Bearer TOKEN"
```

### Test 6: Health Check
```bash
curl -X GET http://localhost:3000/health
```

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import"
3. Paste the following JSON as a collection

```json
{
  "info": {
    "name": "Evolution SaaS Platform",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/api/v1/auth/register",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"email\": \"test@example.com\", \"password\": \"Test@123456\", \"name\": \"Test User\"}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/api/v1/auth/login",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"email\": \"test@example.com\", \"password\": \"Test@123456\"}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## 🧪 Testing with Insomnia

### Create Requests
1. Open Insomnia
2. Create new workspace
3. Add requests:

**Request 1: Register**
- Method: POST
- URL: `http://localhost:3000/api/v1/auth/register`
- Body: `{"email": "test@example.com", "password": "Test@123456", "name": "Test User"}`

**Request 2: Login**
- Method: POST
- URL: `http://localhost:3000/api/v1/auth/login`
- Body: `{"email": "test@example.com", "password": "Test@123456"}`

**Request 3: Get Profile**
- Method: GET
- URL: `http://localhost:3000/api/v1/auth/profile`
- Header: `Authorization: Bearer <token>`

---

## 🌐 Frontend Testing

### Access Frontend
- **URL:** http://localhost:3001
- **Expected:** Landing page with navigation, hero section, features, pricing, CTA, and footer

### Test Navigation
- Click on "Features" - should scroll to features section
- Click on "Pricing" - should scroll to pricing section
- Click on "Get Started" - should scroll to CTA section

### Test Responsive Design
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on mobile, tablet, and desktop sizes

---

## 📊 Test Scenarios

### Scenario 1: User Registration & Login
1. Register new user with email and password
2. Verify success response
3. Login with same credentials
4. Verify JWT token is returned
5. Use token to access protected routes

### Scenario 2: WhatsApp Instance Management
1. Create new WhatsApp instance
2. List all instances
3. Get specific instance status
4. Verify instance data

### Scenario 3: Message Sending
1. Create WhatsApp instance
2. Send message to phone number
3. Verify message status
4. Get message history

### Scenario 4: Error Handling
1. Try to login with wrong password
2. Try to access protected route without token
3. Try to create instance with invalid data
4. Verify error responses

### Scenario 5: Security
1. Verify JWT token expiration
2. Verify password is hashed
3. Verify CORS is configured
4. Verify environment variables are protected

---

## 📝 Test Checklist

### Backend Tests
- [ ] Health check endpoint works
- [ ] User registration works
- [ ] User login works
- [ ] JWT token is generated
- [ ] Protected routes require token
- [ ] WhatsApp instance creation works
- [ ] Instance listing works
- [ ] Message sending works
- [ ] Error handling works
- [ ] Input validation works

### Frontend Tests
- [ ] Landing page loads
- [ ] Navigation works
- [ ] Responsive design works
- [ ] All components render
- [ ] Links work correctly
- [ ] Mobile menu works
- [ ] Styling is correct

### Security Tests
- [ ] Passwords are hashed
- [ ] JWT tokens work
- [ ] CORS is configured
- [ ] Environment variables are protected
- [ ] Error messages don't expose sensitive data

### Performance Tests
- [ ] API responds within 200ms
- [ ] Frontend loads within 2s
- [ ] Database queries are optimized
- [ ] No memory leaks

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process on port 3000
kill -9 <PID>

# Try again
npm run backend:dev
```

### Frontend Won't Start
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill process on port 3001
kill -9 <PID>

# Try again
npm run frontend:dev
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
psql -U postgres

# Create database if not exists
createdb evolution_saas_dev

# Check connection
psql -U postgres -d evolution_saas_dev
```

### JWT Token Issues
- Verify token is in Authorization header
- Verify token format: `Bearer <token>`
- Verify token hasn't expired (7 days)
- Check token in https://jwt.io

---

## 📚 Additional Resources

### Documentation
- [INDEX.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/INDEX.md) - Navigation guide
- [API_DOCUMENTATION.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/API_DOCUMENTATION.md) - API reference
- [TESTING_GUIDE.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/TESTING_GUIDE.md) - Testing strategies

### Tools
- **Postman:** https://www.postman.com/
- **Insomnia:** https://insomnia.rest/
- **cURL:** Built-in command-line tool
- **JWT Debugger:** https://jwt.io/

### GitHub
- **Repository:** https://github.com/2lokeshrao/evolution-saas-platform
- **Issues:** https://github.com/2lokeshrao/evolution-saas-platform/issues

---

## ✅ Testing Checklist

Before considering the project complete:

- [ ] All documentation links work
- [ ] Backend starts without errors
- [ ] Frontend loads correctly
- [ ] All 9 API endpoints work
- [ ] Authentication works
- [ ] WhatsApp integration works
- [ ] Error handling works
- [ ] Frontend is responsive
- [ ] Security features work
- [ ] Database connection works

---

## 🎉 Ready to Test!

Everything is set up and ready for testing. Start with:

1. **Read:** [QUICK_START.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/QUICK_START.md)
2. **Clone:** `git clone https://github.com/2lokeshrao/evolution-saas-platform.git`
3. **Setup:** Follow the quick start guide
4. **Test:** Use the API endpoints above
5. **Deploy:** Follow [DEPLOYMENT_GUIDE.md](https://github.com/2lokeshrao/evolution-saas-platform/blob/main/DEPLOYMENT_GUIDE.md)

---

**Happy Testing! 🚀**

