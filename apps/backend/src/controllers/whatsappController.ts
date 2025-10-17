import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import axios from 'axios';

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';

// Mock database for instances
const instances: any[] = [];
const messages: any[] = [];

export const createInstance = async (req: AuthRequest, res: Response) => {
  try {
    const { instanceName } = req.body;

    if (!instanceName) {
      return res.status(400).json({ error: 'Instance name required' });
    }

    const instance = {
      id: Date.now().toString(),
      userId: req.user?.id,
      instanceName,
      status: 'pending',
      createdAt: new Date(),
      qrCode: null,
    };

    instances.push(instance);

    res.status(201).json({
      message: 'Instance created successfully',
      instance,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create instance' });
  }
};

export const getInstances = async (req: AuthRequest, res: Response) => {
  try {
    const userInstances = instances.filter(i => i.userId === req.user?.id);
    res.json({ instances: userInstances });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get instances' });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { instanceId, phoneNumber, message } = req.body;

    if (!instanceId || !phoneNumber || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const instance = instances.find(i => i.id === instanceId && i.userId === req.user?.id);
    if (!instance) {
      return res.status(404).json({ error: 'Instance not found' });
    }

    const msg = {
      id: Date.now().toString(),
      instanceId,
      phoneNumber,
      message,
      status: 'sent',
      createdAt: new Date(),
    };

    messages.push(msg);

    res.json({
      message: 'Message sent successfully',
      data: msg,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { instanceId } = req.query;

    let userMessages = messages.filter(m => {
      const instance = instances.find(i => i.id === m.instanceId && i.userId === req.user?.id);
      return !!instance;
    });

    if (instanceId) {
      userMessages = userMessages.filter(m => m.instanceId === instanceId);
    }

    res.json({ messages: userMessages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get messages' });
  }
};

export const getInstanceStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { instanceId } = req.params;

    const instance = instances.find(i => i.id === instanceId && i.userId === req.user?.id);
    if (!instance) {
      return res.status(404).json({ error: 'Instance not found' });
    }

    res.json({ instance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get instance status' });
  }
};
