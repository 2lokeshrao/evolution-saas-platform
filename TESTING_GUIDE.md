# Evolution SaaS Platform - Testing Guide

## Testing Strategy

This guide covers unit tests, integration tests, and end-to-end tests for the Evolution SaaS Platform.

---

## Setup Testing Environment

### Install Testing Dependencies

```bash
npm install --save-dev jest @types/jest ts-jest
npm install --save-dev supertest @types/supertest
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

---

## Backend Testing

### Unit Tests

#### Example: Auth Controller Tests

Create `apps/backend/src/controllers/__tests__/authController.test.ts`:

```typescript
import { register, login } from '../authController';
import { Request, Response } from 'express';

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('register', () => {
    it('should register a new user', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      await register(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return error if email already exists', async () => {
      req.body = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User',
      };

      await register(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return error if missing required fields', async () => {
      req.body = { email: 'test@example.com' };

      await register(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login', () => {
    it('should login user with correct credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      await login(req as any, res as any);

      expect(res.json).toHaveBeenCalled();
    });

    it('should return error with incorrect credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await login(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
```

### Integration Tests

Create `apps/backend/src/__tests__/api.integration.test.ts`:

```typescript
import request from 'supertest';
import app from '../index';

describe('API Integration Tests', () => {
  let token: string;
  let userId: string;

  describe('Authentication Flow', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'integration@test.com',
          password: 'password123',
          name: 'Integration Test',
        });

      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      token = response.body.token;
      userId = response.body.user.id;
    });

    it('should login user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'integration@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should get user profile', async () => {
      const response = await request(app)
        .get('/api/v1/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user.id).toBe(userId);
    });
  });

  describe('WhatsApp Endpoints', () => {
    it('should create WhatsApp instance', async () => {
      const response = await request(app)
        .post('/api/v1/whatsapp/instances')
        .set('Authorization', `Bearer ${token}`)
        .send({
          instanceName: 'Test Instance',
        });

      expect(response.status).toBe(201);
      expect(response.body.instance.instanceName).toBe('Test Instance');
    });

    it('should get all instances', async () => {
      const response = await request(app)
        .get('/api/v1/whatsapp/instances')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.instances)).toBe(true);
    });

    it('should send message', async () => {
      const response = await request(app)
        .post('/api/v1/whatsapp/messages/send')
        .set('Authorization', `Bearer ${token}`)
        .send({
          instanceId: 'test_instance',
          phoneNumber: '919876543210',
          message: 'Test message',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.status).toBe('sent');
    });
  });

  describe('Error Handling', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/v1/whatsapp/instances');

      expect(response.status).toBe(401);
    });

    it('should return 404 for invalid endpoint', async () => {
      const response = await request(app)
        .get('/api/v1/invalid-endpoint');

      expect(response.status).toBe(404);
    });
  });
});
```

### Run Backend Tests

```bash
# Run all tests
npm run backend:test

# Run tests in watch mode
npm run backend:test:watch

# Run tests with coverage
npm run backend:test:coverage
```

---

## Frontend Testing

### Component Tests

Create `apps/frontend/components/__tests__/Navbar.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Evolution')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders get started button', () => {
    render(<Navbar />);
    
    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    menuButton.click();
    
    expect(screen.getByText('Features')).toBeVisible();
  });
});
```

### API Client Tests

Create `apps/frontend/lib/__tests__/api.test.ts`:

```typescript
import { api } from '../api';

describe('API Client', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('auth', () => {
    it('should register user', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          token: 'test-token',
          user: { id: '1', email: 'test@example.com' },
        }),
      });

      const result = await api.auth.register(
        'test@example.com',
        'password123',
        'Test User'
      );

      expect(result.token).toBe('test-token');
    });

    it('should login user', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          token: 'test-token',
          user: { id: '1', email: 'test@example.com' },
        }),
      });

      const result = await api.auth.login('test@example.com', 'password123');

      expect(result.token).toBe('test-token');
    });
  });

  describe('whatsapp', () => {
    it('should create instance', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          instance: { id: '1', instanceName: 'Test' },
        }),
      });

      const result = await api.whatsapp.createInstance(
        'test-token',
        'Test Instance'
      );

      expect(result.instance.instanceName).toBe('Test');
    });

    it('should send message', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          data: { id: '1', status: 'sent' },
        }),
      });

      const result = await api.whatsapp.sendMessage(
        'test-token',
        'instance-1',
        '919876543210',
        'Test message'
      );

      expect(result.data.status).toBe('sent');
    });
  });
});
```

### Run Frontend Tests

```bash
# Run all tests
npm run frontend:test

# Run tests in watch mode
npm run frontend:test:watch

# Run tests with coverage
npm run frontend:test:coverage
```

---

## End-to-End Testing

### Setup Cypress

```bash
npm install --save-dev cypress
npx cypress open
```

### Create E2E Tests

Create `cypress/e2e/auth.cy.ts`:

```typescript
describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should register new user', () => {
    cy.contains('Get Started').click();
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.contains('Register').click();
    cy.contains('Welcome').should('be.visible');
  });

  it('should login user', () => {
    cy.contains('Login').click();
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('Login').click();
    cy.contains('Dashboard').should('be.visible');
  });
});
```

### Run E2E Tests

```bash
# Open Cypress UI
npx cypress open

# Run tests headless
npx cypress run
```

---

## Performance Testing

### Load Testing with Artillery

```bash
npm install --save-dev artillery
```

Create `load-test.yml`:

```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: 'Warm up'
    - duration: 120
      arrivalRate: 50
      name: 'Ramp up'
    - duration: 60
      arrivalRate: 100
      name: 'Spike'

scenarios:
  - name: 'Send Messages'
    flow:
      - post:
          url: '/api/v1/auth/login'
          json:
            email: 'test@example.com'
            password: 'password123'
          capture:
            json: '$.token'
            as: 'token'
      - post:
          url: '/api/v1/whatsapp/messages/send'
          headers:
            Authorization: 'Bearer {{ token }}'
          json:
            instanceId: 'test'
            phoneNumber: '919876543210'
            message: 'Load test message'
```

Run load test:
```bash
artillery run load-test.yml
```

---

## Test Coverage

### Generate Coverage Report

```bash
npm run test:coverage
```

### Coverage Targets

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run backend tests
        run: npm run backend:test:coverage

      - name: Run frontend tests
        run: npm run frontend:test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

---

## Best Practices

1. **Write tests first** - TDD approach
2. **Keep tests isolated** - No dependencies between tests
3. **Use meaningful names** - Describe what is being tested
4. **Mock external services** - Don't call real APIs
5. **Test edge cases** - Error scenarios, boundary conditions
6. **Maintain high coverage** - Aim for 80%+ coverage
7. **Run tests before commit** - Use pre-commit hooks
8. **Automate testing** - Use CI/CD pipeline

---

## Troubleshooting

### Tests Failing Locally

```bash
# Clear cache
npm run test:clear-cache

# Reinstall dependencies
rm -rf node_modules
npm install

# Run specific test
npm run test -- authController.test.ts
```

### Database Issues in Tests

```bash
# Reset test database
npm run db:reset:test

# Run migrations
npm run db:migrate:up
```

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)
- [Artillery Load Testing](https://artillery.io/)

