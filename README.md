# 🚀 Evolution SaaS Platform

A complete WhatsApp integration SaaS platform built with Evolution API.

## 📁 Project Structure

```
evolution-saas-platform/
├── apps/
│   ├── backend/          # Node.js + Express API
│   ├── frontend/         # Next.js + React UI
│   └── admin-dashboard/  # Admin panel
├── packages/
│   ├── sdk/              # TypeScript SDK
│   ├── utils/            # Shared utilities
│   ├── types/            # Shared types
│   └── database/         # Database schemas
├── plugins/
│   ├── shopify/          # Shopify integration
│   ├── woocommerce/      # WooCommerce integration
│   ├── crm/              # CRM integration
│   ├── zapier/           # Zapier integration
│   ├── make/             # Make.com integration
│   └── custom/           # Custom plugins
└── docs/                 # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL 12+

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# Create databases
createdb evolution_saas_dev
createdb evolution_saas_test
```

### Development

```bash
# Start backend
npm run backend:dev

# Start frontend (in another terminal)
npm run frontend:dev
```

### Build

```bash
# Build all packages
npm run build

# Build specific package
npm run backend:build
npm run frontend:build
```

## 📊 Features

- ✅ WhatsApp Integration (Evolution API)
- ✅ Multi-tenant SaaS Architecture
- ✅ User Authentication & Authorization
- ✅ Message Management
- ✅ Contact Management
- ✅ Plugin System
- ✅ Webhook Support
- ✅ Analytics Dashboard
- ✅ Payment Integration (Stripe)
- ✅ Email Notifications

## 💰 Pricing

- **Starter:** ₹999/month (100 messages/day)
- **Professional:** ₹4,999/month (1000 messages/day)
- **Enterprise:** ₹9,999/month (Unlimited)

## 📚 Documentation

- [Backend Setup](./apps/backend/README.md)
- [Frontend Setup](./apps/frontend/README.md)
- [API Documentation](./docs/API.md)
- [Plugin Development](./docs/PLUGINS.md)

## 🔗 Links

- [Evolution API](https://github.com/EvolutionAPI/evolution-api)
- [Documentation](https://docs.evolution-api.com)
- [Community](https://discord.gg/evolution-api)

## 📝 License

Apache License 2.0 - See LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 📧 Support

For support, email support@evolutionsaas.com or open an issue on GitHub.

---

**Built with ❤️ using Evolution API**
