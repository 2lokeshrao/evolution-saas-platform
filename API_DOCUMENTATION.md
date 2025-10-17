# Evolution SaaS Platform - API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Get User Profile
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## WhatsApp Endpoints

### 1. Create WhatsApp Instance
**POST** `/whatsapp/instances`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "instanceName": "My Business Account"
}
```

**Response:**
```json
{
  "message": "Instance created successfully",
  "instance": {
    "id": "instance_123",
    "userId": "user_123",
    "instanceName": "My Business Account",
    "status": "pending",
    "createdAt": "2025-10-17T18:20:00Z",
    "qrCode": null
  }
}
```

---

### 2. Get All Instances
**GET** `/whatsapp/instances`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "instances": [
    {
      "id": "instance_123",
      "userId": "user_123",
      "instanceName": "My Business Account",
      "status": "connected",
      "phoneNumber": "+919876543210",
      "createdAt": "2025-10-17T18:20:00Z"
    }
  ]
}
```

---

### 3. Get Instance Status
**GET** `/whatsapp/instances/:instanceId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "instance": {
    "id": "instance_123",
    "userId": "user_123",
    "instanceName": "My Business Account",
    "status": "connected",
    "phoneNumber": "+919876543210",
    "createdAt": "2025-10-17T18:20:00Z"
  }
}
```

---

### 4. Send Message
**POST** `/whatsapp/messages/send`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "instanceId": "instance_123",
  "phoneNumber": "919876543210",
  "message": "Hello! This is a test message from Evolution SaaS Platform."
}
```

**Response:**
```json
{
  "message": "Message sent successfully",
  "data": {
    "id": "msg_456",
    "instanceId": "instance_123",
    "phoneNumber": "919876543210",
    "message": "Hello! This is a test message from Evolution SaaS Platform.",
    "status": "sent",
    "createdAt": "2025-10-17T18:20:00Z"
  }
}
```

---

### 5. Get Messages
**GET** `/whatsapp/messages?instanceId=instance_123`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `instanceId` (optional): Filter messages by instance ID

**Response:**
```json
{
  "messages": [
    {
      "id": "msg_456",
      "instanceId": "instance_123",
      "phoneNumber": "919876543210",
      "message": "Hello! This is a test message.",
      "status": "delivered",
      "createdAt": "2025-10-17T18:20:00Z"
    }
  ]
}
```

---

## Webhook Endpoints

### 1. Evolution API Webhook
**POST** `/webhooks/evolution`

**Request Body (from Evolution API):**
```json
{
  "event": "message.received",
  "data": {
    "instanceId": "instance_123",
    "phoneNumber": "919876543210",
    "message": "Incoming message text",
    "timestamp": "2025-10-17T18:20:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "path": "/api/v1/invalid-endpoint",
  "method": "GET"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Error details"
}
```

---

## Rate Limiting

- **Starter Plan**: 100 messages/day
- **Professional Plan**: 1,000 messages/day
- **Enterprise Plan**: Unlimited messages

---

## Example Usage

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe"
  }'
```

**Send Message:**
```bash
curl -X POST http://localhost:3000/api/v1/whatsapp/messages/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceId": "instance_123",
    "phoneNumber": "919876543210",
    "message": "Hello from Evolution!"
  }'
```

### Using JavaScript/Fetch

```javascript
// Register
const registerResponse = await fetch('http://localhost:3000/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securepassword123',
    name: 'John Doe'
  })
});

const { token } = await registerResponse.json();

// Send Message
const messageResponse = await fetch('http://localhost:3000/api/v1/whatsapp/messages/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    instanceId: 'instance_123',
    phoneNumber: '919876543210',
    message: 'Hello from Evolution!'
  })
});

const result = await messageResponse.json();
console.log(result);
```

---

## Support

For issues or questions, please refer to:
- [QUICK_START.md](./QUICK_START.md)
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
- GitHub Issues: https://github.com/2lokeshrao/evolution-saas-platform/issues
