import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import authRoutes from './routes/authRoutes';
import whatsappRoutes from './routes/whatsappRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request ID middleware
app.use((req: Request, res: Response, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Documentation
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    name: 'Evolution SaaS Platform API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login',
        profile: 'GET /api/v1/auth/profile',
      },
      whatsapp: {
        createInstance: 'POST /api/v1/whatsapp/instances',
        getInstances: 'GET /api/v1/whatsapp/instances',
        getInstanceStatus: 'GET /api/v1/whatsapp/instances/:instanceId',
        sendMessage: 'POST /api/v1/whatsapp/messages/send',
        getMessages: 'GET /api/v1/whatsapp/messages',
      },
      webhooks: {
        evolution: 'POST /api/v1/webhooks/evolution',
      },
    },
  });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/whatsapp', whatsappRoutes);

// Webhook endpoint
app.post('/api/v1/webhooks/evolution', (req: Request, res: Response) => {
  try {
    console.log('Webhook received:', req.body);
    res.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API docs: http://localhost:${PORT}/api/v1`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

export default app;
