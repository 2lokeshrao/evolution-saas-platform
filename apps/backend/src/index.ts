import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request ID middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
  });
});

// API version endpoint
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    name: 'Evolution SaaS API',
    version: '1.0.0',
    description: 'WhatsApp Integration SaaS Platform',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      whatsapp: '/api/v1/whatsapp',
      messages: '/api/v1/messages',
      contacts: '/api/v1/contacts',
      plugins: '/api/v1/plugins',
      webhooks: '/api/v1/webhooks'
    }
  });
});

// ============================================
// AUTH ROUTES (Placeholder)
// ============================================

app.post('/api/v1/auth/register', (req: Request, res: Response) => {
  res.json({
    message: 'Registration endpoint',
    status: 'coming_soon'
  });
});

app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  res.json({
    message: 'Login endpoint',
    status: 'coming_soon'
  });
});

// ============================================
// WHATSAPP ROUTES (Placeholder)
// ============================================

app.get('/api/v1/whatsapp/instances', (req: Request, res: Response) => {
  res.json({
    message: 'Get WhatsApp instances',
    status: 'coming_soon',
    instances: []
  });
});

app.post('/api/v1/whatsapp/instances', (req: Request, res: Response) => {
  res.json({
    message: 'Create WhatsApp instance',
    status: 'coming_soon'
  });
});

// ============================================
// MESSAGE ROUTES (Placeholder)
// ============================================

app.post('/api/v1/messages/send', (req: Request, res: Response) => {
  res.json({
    message: 'Send message endpoint',
    status: 'coming_soon'
  });
});

app.get('/api/v1/messages', (req: Request, res: Response) => {
  res.json({
    message: 'Get messages endpoint',
    status: 'coming_soon',
    messages: []
  });
});

// ============================================
// WEBHOOK ROUTES (Placeholder)
// ============================================

app.post('/api/v1/webhooks/evolution', (req: Request, res: Response) => {
  console.log('Webhook received:', req.body);
  res.json({
    status: 'received',
    message: 'Webhook processed'
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    requestId: req.id
  });
});

// ============================================
// SERVER START
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Evolution SaaS Backend Started       ║
╠════════════════════════════════════════╣
║ 🚀 Server: http://localhost:${PORT}
║ 📝 Environment: ${NODE_ENV}
║ 🔗 API Docs: http://localhost:${PORT}/api/v1
║ ❤️  Health: http://localhost:${PORT}/health
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export default app;
