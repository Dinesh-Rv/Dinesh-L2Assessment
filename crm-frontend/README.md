# Modern CRM Frontend Application

A modern, feature-rich CRM (Customer Relationship Management) frontend application built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: React Query (TanStack Query)
- **Icons**: Lucide React
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library
- **API Mocking**: MSW (Mock Service Worker)

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── customers/
│   │   ├── dashboard/
│   │   ├── pipeline/
│   │   ├── tasks/
│   │   └── reports/
│   ├── auth/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── forms/
│   ├── tables/
│   ├── charts/
│   ├── dashboard-stats.tsx
│   ├── recent-activity.tsx
│   ├── sidebar.tsx
│   ├── header.tsx
│   └── providers.tsx
├── lib/
│   ├── types.ts
│   ├── utils.ts
│   ├── validations.ts
│   └── store.ts
├── hooks/
├── services/
├── mocks/
│   ├── handlers.ts
│   └── browser.ts
└── tests/
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crm-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Tests are located in the `src/tests/` directory
- Uses Jest and React Testing Library
- MSW is configured for API mocking in tests

## 📊 Features

### Dashboard
- **Overview Statistics**: Key metrics and KPIs
- **Sales Charts**: Visual representation of sales data
- **Recent Activity**: Latest updates and activities
- **Quick Actions**: Common tasks and shortcuts

### Customer Management
- **Customer List**: View all customers with filtering
- **Customer Details**: Detailed customer information
- **Add/Edit Customers**: Create and update customer records
- **Customer Status**: Track customer lifecycle

### Pipeline Management
- **Deal Pipeline**: Visual pipeline with drag-and-drop
- **Deal Stages**: Lead → Proposal → Negotiation → Closed
- **Deal Tracking**: Monitor deal progress and value
- **Forecasting**: Revenue predictions and analytics

### Task Management
- **Task List**: View and manage tasks
- **Task Assignment**: Assign tasks to team members
- **Priority Levels**: High, medium, low priority tasks
- **Due Date Tracking**: Monitor task deadlines

### Reports & Analytics
- **Sales Reports**: Revenue and performance metrics
- **Customer Analytics**: Customer behavior and trends
- **Pipeline Analytics**: Deal flow and conversion rates
- **Custom Reports**: Create custom report templates

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=CRM Dashboard
```

### Tailwind CSS
The project uses Tailwind CSS with custom configuration for:
- Color scheme (light/dark mode support)
- Custom components and utilities
- Responsive design breakpoints

### TypeScript
Strict TypeScript configuration with:
- Path aliases (`@/*` points to `src/*`)
- Strict type checking
- ESLint integration

## 🎨 UI Components

The application uses shadcn/ui components built on top of Radix UI primitives:

- **Button**: Various button styles and sizes
- **Card**: Content containers with headers and footers
- **Form Components**: Input, Select, Checkbox, etc.
- **Navigation**: Sidebar, Header, Breadcrumbs
- **Data Display**: Tables, Lists, Badges
- **Feedback**: Toasts, Alerts, Modals

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Collapsible sidebar for mobile
- Responsive grid layouts
- Touch-friendly interactions

## 🔐 Authentication

Mock authentication system with:
- Login/logout functionality
- Protected routes
- User session management
- Role-based access control

## 📈 Data Management

### React Query Integration
- Automatic caching and background updates
- Optimistic updates
- Error handling and retry logic
- DevTools for debugging

### MSW (Mock Service Worker)
- API mocking for development
- Realistic API responses
- Network error simulation
- Request/response logging

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
1. Set production environment variables
2. Configure API endpoints
3. Set up database connections
4. Configure authentication providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ using modern web technologies**
