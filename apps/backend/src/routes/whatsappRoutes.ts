import { Router } from 'express';
import { 
  createInstance, 
  getInstances, 
  sendMessage, 
  getMessages,
  getInstanceStatus 
} from '../controllers/whatsappController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/instances', createInstance);
router.get('/instances', getInstances);
router.get('/instances/:instanceId', getInstanceStatus);
router.post('/messages/send', sendMessage);
router.get('/messages', getMessages);

export default router;
