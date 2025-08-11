# MSW (Mock Service Worker) Setup Documentation

This document provides comprehensive documentation for the MSW setup in the CRM system, including API endpoints, mock data structure, and usage examples.

## Table of Contents

1. [Overview](#overview)
2. [Mock Data Structure](#mock-data-structure)
3. [API Endpoints](#api-endpoints)
4. [Data Persistence](#data-persistence)
5. [Filtering & Search](#filtering--search)
6. [Pagination](#pagination)
7. [Error Handling](#error-handling)
8. [Usage Examples](#usage-examples)
9. [Development Workflow](#development-workflow)

## Overview

The MSW setup provides a complete mock API for the CRM system with the following features:

- **50+ realistic customers** with varied profiles and relationships
- **200+ contact interactions** with different types and outcomes
- **30+ pipeline opportunities** across all sales stages
- **100+ tasks** with different statuses and priorities
- **5 users** for assignments and relationships
- **Full CRUD operations** for all entities
- **Advanced filtering and search** capabilities
- **Pagination support** for large datasets
- **Data persistence** in browser localStorage
- **Realistic error handling** and response delays

## Mock Data Structure

### Data Volume
- **Customers**: 50 records
- **Contacts**: 200 records
- **Leads**: 30 records
- **Tasks**: 100 records
- **Users**: 5 records

### Data Relationships
- Each customer can have multiple contacts, leads, and tasks
- Tasks can be associated with both customers and leads
- All entities are assigned to users
- Realistic data distribution across statuses and stages

### Data Variety
- **Customer Statuses**: Active, Inactive, Prospect
- **Customer Sources**: Website, Referral, Cold Call, Social Media, Trade Show, Advertising
- **Lead Stages**: Lead, Qualified, Proposal, Negotiation, Closed Won, Closed Lost
- **Task Statuses**: Pending, In Progress, Completed, Cancelled
- **Task Priorities**: Low, Medium, High, Urgent
- **Interaction Types**: Call, Email, Meeting, Note, Text, Video Call

## API Endpoints

### Authentication
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "admin@crm.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { /* User object */ },
    "token": "mock-jwt-token-1234567890"
  },
  "message": "Login successful"
}
```

### Dashboard
```
GET /api/dashboard/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCustomers": 50,
    "totalLeads": 30,
    "totalDeals": 8,
    "totalRevenue": 1250000,
    "activeDeals": 18,
    "conversionRate": 68,
    "averageDealSize": 28000,
    "monthlyGrowth": 12.5,
    "topPerformingUsers": [ /* Array of user performance */ ],
    "recentActivities": [ /* Array of activity logs */ ]
  },
  "message": "Dashboard stats retrieved successfully"
}
```

### Customers

#### List Customers
```
GET /api/customers?page=1&limit=10&search=tech&status=active&source=website&assignedTo=user-1&tags=enterprise&sortBy=createdAt&sortOrder=desc
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term for name, email, company, phone
- `status`: Filter by customer status (comma-separated)
- `source`: Filter by customer source (comma-separated)
- `assignedTo`: Filter by assigned user (comma-separated)
- `tags`: Filter by tags (comma-separated)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (asc/desc, default: desc)

**Response:**
```json
{
  "success": true,
  "data": [ /* Array of customers */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Customers retrieved successfully"
}
```

#### Get Single Customer
```
GET /api/customers/:id
```

#### Create Customer
```
POST /api/customers
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "company": "TechCorp Solutions",
  "address": {
    "street": "123 Innovation Drive",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94105",
    "country": "USA"
  },
  "status": "active",
  "source": "website",
  "assignedTo": "user-1",
  "tags": ["enterprise", "tech"],
  "notes": "Interested in enterprise solutions"
}
```

#### Update Customer
```
PUT /api/customers/:id
```

#### Delete Customer
```
DELETE /api/customers/:id
```

### Contacts

#### List Contacts
```
GET /api/contacts?customerId=customer-1&page=1&limit=10
```

#### Get Customer Contacts
```
GET /api/customers/:customerId/contacts
```

#### Create Contact
```
POST /api/contacts
```

**Request Body:**
```json
{
  "customerId": "customer-1",
  "type": "call",
  "subject": "Initial Discovery Call",
  "description": "Discussed current pain points and potential solutions",
  "outcome": "Scheduled follow-up demo",
  "date": "2024-01-15T14:00:00Z",
  "duration": 45
}
```

#### Update Contact
```
PUT /api/contacts/:id
```

#### Delete Contact
```
DELETE /api/contacts/:id
```

### Leads/Pipeline

#### List Leads
```
GET /api/leads?stage=qualified,proposal&assignedTo=user-1&search=enterprise&sortBy=value&sortOrder=desc
```

**Query Parameters:**
- `stage`: Filter by lead stage (comma-separated)
- `assignedTo`: Filter by assigned user (comma-separated)
- `search`: Search term for title and description
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (asc/desc, default: desc)

#### Get Customer Leads
```
GET /api/customers/:customerId/leads
```

#### Create Lead
```
POST /api/leads
```

**Request Body:**
```json
{
  "customerId": "customer-1",
  "title": "Enterprise Software License",
  "description": "Full enterprise license for 500 users",
  "stage": "qualified",
  "value": 150000,
  "probability": 75,
  "expectedCloseDate": "2024-02-15",
  "assignedTo": "user-1"
}
```

#### Update Lead
```
PUT /api/leads/:id
```

#### Delete Lead
```
DELETE /api/leads/:id
```

### Tasks

#### List Tasks
```
GET /api/tasks?status=pending,in_progress&priority=high,urgent&assignedTo=user-1&search=follow&sortBy=dueDate&sortOrder=asc
```

**Query Parameters:**
- `status`: Filter by task status (comma-separated)
- `priority`: Filter by task priority (comma-separated)
- `type`: Filter by task type (comma-separated)
- `assignedTo`: Filter by assigned user (comma-separated)
- `search`: Search term for title and description
- `sortBy`: Sort field (default: dueDate)
- `sortOrder`: Sort direction (asc/desc, default: asc)

#### Get Customer Tasks
```
GET /api/customers/:customerId/tasks
```

#### Create Task
```
POST /api/tasks
```

**Request Body:**
```json
{
  "customerId": "customer-1",
  "leadId": "lead-1",
  "title": "Follow up on proposal",
  "description": "Call customer to discuss proposal feedback",
  "type": "call",
  "priority": "high",
  "dueDate": "2024-01-20",
  "assignedTo": "user-1"
}
```

#### Update Task
```
PUT /api/tasks/:id
```

#### Delete Task
```
DELETE /api/tasks/:id
```

### Users

#### List Users
```
GET /api/users
```

#### Get Single User
```
GET /api/users/:id
```

### Utility Endpoints

#### Get Statistics
```
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "customers": {
      "total": 50,
      "active": 35,
      "prospects": 10,
      "inactive": 5
    },
    "leads": {
      "total": 30,
      "won": 8,
      "lost": 4,
      "active": 18,
      "totalValue": 2500000
    },
    "tasks": {
      "total": 100,
      "completed": 45,
      "pending": 30,
      "inProgress": 20,
      "overdue": 5
    }
  },
  "message": "Statistics retrieved successfully"
}
```

#### Reset Data
```
POST /api/reset
```

#### Export Data
```
GET /api/export
```

#### Import Data
```
POST /api/import
```

## Data Persistence

The MSW setup includes data persistence using browser localStorage:

### Storage Keys
- `crm-customers`: Customer data
- `crm-contacts`: Contact data
- `crm-leads`: Lead data
- `crm-tasks`: Task data
- `crm-users`: User data

### Features
- **Automatic initialization** with mock data on first load
- **CRUD operations** persist changes to localStorage
- **Data export/import** functionality
- **Reset capability** to restore initial state

### Storage Class Methods
```typescript
// Customer operations
storage.getCustomers()
storage.setCustomers(customers)
storage.addCustomer(customer)
storage.updateCustomer(id, updates)
storage.deleteCustomer(id)

// Contact operations
storage.getContacts()
storage.setContacts(contacts)
storage.addContact(contact)
storage.updateContact(id, updates)
storage.deleteContact(id)

// Lead operations
storage.getLeads()
storage.setLeads(leads)
storage.addLead(lead)
storage.updateLead(id, updates)
storage.deleteLead(id)

// Task operations
storage.getTasks()
storage.setTasks(tasks)
storage.addTask(task)
storage.updateTask(id, updates)
storage.deleteTask(id)

// Utility operations
storage.initializeWithMockData(mockData)
storage.clearAll()
storage.exportData()
storage.importData(data)
```

## Filtering & Search

### Customer Filters
```typescript
interface CustomerFilters {
  status?: CustomerStatus[]
  source?: CustomerSource[]
  assignedTo?: string[]
  tags?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
}
```

### Lead Filters
```typescript
interface LeadFilters {
  stage?: LeadStage[]
  assignedTo?: string[]
  valueRange?: {
    min: number
    max: number
  }
  expectedCloseDate?: {
    start: Date
    end: Date
  }
}
```

### Task Filters
```typescript
interface TaskFilters {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  type?: TaskType[]
  assignedTo?: string[]
  dueDate?: {
    start: Date
    end: Date
  }
}
```

### Search Functionality
- **Customer search**: name, email, company, phone
- **Lead search**: title, description
- **Task search**: title, description
- **Case-insensitive** matching
- **Partial string** matching

## Pagination

All list endpoints support pagination with the following parameters:

### Query Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

### Response Structure
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Sorting
- `sortBy`: Field to sort by
- `sortOrder`: Sort direction (asc/desc)

## Error Handling

### Error Simulation
- **5% error probability** for most operations
- **Realistic error messages** and status codes
- **Network delay simulation** (100ms - 1500ms)

### Error Responses
```json
{
  "success": false,
  "message": "Failed to load customers",
  "errors": ["Network error", "Invalid parameters"]
}
```

### Common Error Scenarios
- **404 Not Found**: Resource doesn't exist
- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Simulated server errors
- **Network delays**: Realistic response times

## Usage Examples

### Fetching Customers with Filters
```typescript
const response = await fetch('/api/customers?status=active&source=website&page=1&limit=20')
const data = await response.json()
console.log(data.data) // Array of customers
console.log(data.pagination) // Pagination info
```

### Creating a New Customer
```typescript
const newCustomer = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '+1-555-0456',
  company: 'Design Studio Pro',
  address: {
    street: '456 Creative Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  status: 'prospect',
  source: 'referral',
  assignedTo: 'user-2',
  tags: ['design', 'creative'],
  notes: 'Referred by existing customer'
}

const response = await fetch('/api/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newCustomer)
})

const result = await response.json()
console.log(result.data) // Created customer
```

### Updating a Lead Stage
```typescript
const updates = {
  stage: 'negotiation',
  probability: 85,
  expectedCloseDate: '2024-02-28'
}

const response = await fetch('/api/leads/lead-1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updates)
})

const result = await response.json()
console.log(result.data) // Updated lead
```

### Searching Tasks
```typescript
const response = await fetch('/api/tasks?search=follow&status=pending&priority=high')
const data = await response.json()
console.log(data.data) // Filtered tasks
```

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. MSW Initialization
MSW automatically starts in development mode and initializes with mock data.

### 3. Data Persistence
- Changes persist in localStorage
- Data survives page refreshes
- Use `/api/reset` to restore initial state

### 4. Testing Different Scenarios
- **Empty state**: Clear localStorage and refresh
- **Large datasets**: Use pagination parameters
- **Error scenarios**: Errors are randomly simulated
- **Network delays**: Realistic response times

### 5. Data Export/Import
```typescript
// Export current data
const exportResponse = await fetch('/api/export')
const exportData = await exportResponse.json()

// Import data
const importResponse = await fetch('/api/import', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(exportData.data)
})
```

### 6. Customizing Mock Data
Edit `src/lib/mock-data.ts` to modify:
- Data volume
- Data variety
- Relationships
- Realistic scenarios

### 7. Adding New Endpoints
1. Add handler in `src/mocks/handlers.ts`
2. Add storage methods in `src/lib/msw-storage.ts`
3. Update types in `src/lib/types.ts`

## Best Practices

1. **Use realistic data**: Mock data should represent real-world scenarios
2. **Test edge cases**: Include various statuses, stages, and relationships
3. **Simulate errors**: Test error handling with realistic error scenarios
4. **Performance testing**: Use pagination for large datasets
5. **Data consistency**: Maintain relationships between entities
6. **Documentation**: Keep API documentation up to date

This comprehensive MSW setup provides a robust foundation for developing and testing the CRM application with realistic data and full API functionality.
