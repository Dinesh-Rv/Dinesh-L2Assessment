# CRM System TypeScript Types Documentation

This document provides comprehensive documentation for all TypeScript types, enums, interfaces, and utilities used in the CRM system.

## Table of Contents

1. [Enums](#enums)
2. [Core Entities](#core-entities)
3. [Form Types](#form-types)
4. [API Response Types](#api-response-types)
5. [Utility Types](#utility-types)
6. [State Management Types](#state-management-types)
7. [Validation Schemas](#validation-schemas)
8. [Utility Functions](#utility-functions)

## Enums

### CustomerStatus
Defines the possible statuses for customers.

```typescript
enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PROSPECT = 'prospect',
}
```

### CustomerSource
Defines the source of customer acquisition.

```typescript
enum CustomerSource {
  WEBSITE = 'website',
  REFERRAL = 'referral',
  COLD_CALL = 'cold_call',
  SOCIAL_MEDIA = 'social_media',
  TRADE_SHOW = 'trade_show',
  ADVERTISING = 'advertising',
  OTHER = 'other',
}
```

### InteractionType
Defines the types of customer interactions.

```typescript
enum InteractionType {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  NOTE = 'note',
  TEXT = 'text',
  VIDEO_CALL = 'video_call',
}
```

### LeadStage
Defines the stages in the sales pipeline.

```typescript
enum LeadStage {
  LEAD = 'lead',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost',
}
```

### TaskType
Defines the types of tasks.

```typescript
enum TaskType {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  FOLLOW_UP = 'follow_up',
  DEMO = 'demo',
  PROPOSAL = 'proposal',
  CONTRACT = 'contract',
}
```

### TaskStatus
Defines the status of tasks.

```typescript
enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
```

### TaskPriority
Defines the priority levels for tasks.

```typescript
enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}
```

### UserRole
Defines user roles in the system.

```typescript
enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SALES_REP = 'sales_rep',
  SUPPORT = 'support',
  VIEWER = 'viewer',
}
```

## Core Entities

### BaseEntity
Base interface for all entities with common fields.

```typescript
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
```

### Address
Address information structure.

```typescript
interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}
```

### Customer
Customer entity with all related information.

```typescript
interface Customer extends BaseEntity {
  name: string
  email: string
  phone: string
  company: string
  address: Address
  status: CustomerStatus
  source: CustomerSource
  assignedTo: string // User ID
  tags: string[]
  notes?: string
}
```

### Contact
Customer interaction/contact record.

```typescript
interface Contact extends BaseEntity {
  customerId: string
  type: InteractionType
  subject: string
  description: string
  outcome?: string
  date: Date
  duration?: number // in minutes
  createdBy: string // User ID
}
```

### Lead
Sales lead/pipeline opportunity.

```typescript
interface Lead extends BaseEntity {
  customerId: string
  title: string
  description: string
  stage: LeadStage
  value: number
  probability: number // percentage
  expectedCloseDate?: Date
  actualCloseDate?: Date
  assignedTo: string // User ID
}
```

### Task
Task/activity record.

```typescript
interface Task extends BaseEntity {
  customerId: string
  leadId?: string
  title: string
  description: string
  type: TaskType
  status: TaskStatus
  priority: TaskPriority
  dueDate: Date
  completedAt?: Date
  assignedTo: string // User ID
  createdBy: string // User ID
}
```

### User
User account information.

```typescript
interface User extends BaseEntity {
  name: string
  email: string
  role: UserRole
  avatar?: string
  isActive: boolean
  lastLoginAt?: Date
}
```

## Dashboard & Analytics

### DashboardStats
Dashboard statistics and metrics.

```typescript
interface DashboardStats {
  totalCustomers: number
  totalLeads: number
  totalDeals: number
  totalRevenue: number
  activeDeals: number
  conversionRate: number
  averageDealSize: number
  monthlyGrowth: number
  topPerformingUsers: UserPerformance[]
  recentActivities: ActivityLog[]
}
```

### UserPerformance
User performance metrics.

```typescript
interface UserPerformance {
  userId: string
  userName: string
  dealsClosed: number
  revenueGenerated: number
  conversionRate: number
}
```

### ActivityLog
System activity log entry.

```typescript
interface ActivityLog {
  id: string
  type: 'customer_created' | 'lead_updated' | 'deal_closed' | 'task_completed'
  description: string
  userId: string
  userName: string
  timestamp: Date
  metadata?: Record<string, any>
}
```

## Form Types

### CustomerFormData
Form data for creating/editing customers.

```typescript
interface CustomerFormData {
  name: string
  email: string
  phone: string
  company: string
  address: Address
  status: CustomerStatus
  source: CustomerSource
  assignedTo: string
  tags: string[]
  notes?: string
}
```

### ContactFormData
Form data for creating contacts.

```typescript
interface ContactFormData {
  customerId: string
  type: InteractionType
  subject: string
  description: string
  outcome?: string
  date: Date
  duration?: number
}
```

### LeadFormData
Form data for creating leads.

```typescript
interface LeadFormData {
  customerId: string
  title: string
  description: string
  stage: LeadStage
  value: number
  probability: number
  expectedCloseDate?: Date
  assignedTo: string
}
```

### TaskFormData
Form data for creating tasks.

```typescript
interface TaskFormData {
  customerId: string
  leadId?: string
  title: string
  description: string
  type: TaskType
  priority: TaskPriority
  dueDate: Date
  assignedTo: string
}
```

## API Response Types

### ApiResponse
Generic API response wrapper.

```typescript
interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
  errors?: string[]
}
```

### PaginatedResponse
Paginated API response.

```typescript
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
```

### ApiError
API error response.

```typescript
interface ApiError {
  message: string
  code: string
  details?: Record<string, any>
}
```

## Filter & Search Types

### CustomerFilters
Filters for customer queries.

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

### LeadFilters
Filters for lead queries.

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

### TaskFilters
Filters for task queries.

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

## Utility Types

### CustomerWithRelations
Customer with related entities.

```typescript
type CustomerWithRelations = Customer & {
  assignedUser?: User
  contacts?: Contact[]
  leads?: Lead[]
  tasks?: Task[]
}
```

### LeadWithRelations
Lead with related entities.

```typescript
type LeadWithRelations = Lead & {
  customer?: Customer
  assignedUser?: User
  tasks?: Task[]
}
```

### TaskWithRelations
Task with related entities.

```typescript
type TaskWithRelations = Task & {
  customer?: Customer
  lead?: Lead
  assignedUser?: User
  createdByUser?: User
}
```

## State Management Types

### AuthState
Authentication state.

```typescript
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
```

### UIState
UI state management.

```typescript
interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notifications: Notification[]
  modals: {
    [key: string]: boolean
  }
}
```

### Notification
Notification object.

```typescript
interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
}
```

## Validation Schemas

The system uses Zod for validation. Key schemas include:

- `customerSchema` - Customer validation
- `contactSchema` - Contact validation
- `leadSchema` - Lead validation
- `taskSchema` - Task validation
- `userSchema` - User validation
- `loginSchema` - Login form validation
- `registerSchema` - Registration form validation

## Utility Functions

### Formatting Functions

- `formatCurrency(amount: number)` - Format currency values
- `formatDate(date: Date | string)` - Format dates
- `formatDateTime(date: Date | string)` - Format date and time
- `formatDuration(minutes: number)` - Format duration
- `formatPhoneNumber(phone: string)` - Format phone numbers

### Status & Color Functions

- `getCustomerStatusColor(status: CustomerStatus)` - Get CSS classes for customer status
- `getLeadStageColor(stage: LeadStage)` - Get CSS classes for lead stage
- `getTaskStatusColor(status: TaskStatus)` - Get CSS classes for task status
- `getTaskPriorityColor(priority: TaskPriority)` - Get CSS classes for task priority

### Calculation Functions

- `calculateLeadValue(leads: Lead[])` - Calculate total lead value
- `calculateConversionRate(leads: Lead[])` - Calculate conversion rate
- `calculateAverageDealSize(leads: Lead[])` - Calculate average deal size
- `calculateTaskCompletionRate(tasks: Task[])` - Calculate task completion rate
- `calculateOverdueTasks(tasks: Task[])` - Calculate overdue tasks

### Filtering Functions

- `filterCustomersByStatus(customers: Customer[], status: CustomerStatus[])`
- `filterLeadsByStage(leads: Lead[], stages: LeadStage[])`
- `filterTasksByStatus(tasks: Task[], statuses: TaskStatus[])`
- `searchItems(items: T[], query: string, searchFields: (keyof T)[])`

### Sorting Functions

- `sortByDate(items: T[], order: 'asc' | 'desc')`
- `sortByValue(leads: Lead[], order: 'asc' | 'desc')`
- `sortByPriority(tasks: Task[])`
- `sortByDueDate(tasks: Task[])`

### Data Transformation Functions

- `groupCustomersByStatus(customers: Customer[])`
- `groupLeadsByStage(leads: Lead[])`
- `groupTasksByStatus(tasks: Task[])`
- `getCustomerStats(customers: Customer[])`
- `getLeadStats(leads: Lead[])`
- `getTaskStats(tasks: Task[])`

## Usage Examples

### Creating a Customer

```typescript
import { Customer, CustomerStatus, CustomerSource } from '@/lib/types'

const newCustomer: Customer = {
  id: 'customer-123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-0123',
  company: 'Acme Corp',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
  },
  status: CustomerStatus.ACTIVE,
  source: CustomerSource.WEBSITE,
  assignedTo: 'user-456',
  tags: ['enterprise', 'tech'],
  notes: 'Interested in enterprise solution',
  createdAt: new Date(),
  updatedAt: new Date(),
}
```

### Using Validation Schemas

```typescript
import { customerSchema } from '@/lib/validations'
import { CustomerStatus, CustomerSource } from '@/lib/types'

const customerData = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '+1-555-0456',
  company: 'Tech Solutions',
  address: {
    street: '456 Oak Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
  },
  status: CustomerStatus.PROSPECT,
  source: CustomerSource.REFERRAL,
  assignedTo: 'user-789',
  tags: ['startup', 'saas'],
}

const validatedCustomer = customerSchema.parse(customerData)
```

### Using Utility Functions

```typescript
import { 
  formatCurrency, 
  getCustomerStatusColor, 
  calculateLeadValue 
} from '@/lib/utils/crm-utils'
import { Lead, LeadStage } from '@/lib/types'

const leads: Lead[] = [
  {
    id: 'lead-1',
    customerId: 'customer-1',
    title: 'Enterprise Deal',
    description: 'Large enterprise opportunity',
    stage: LeadStage.NEGOTIATION,
    value: 100000,
    probability: 75,
    assignedTo: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

const totalValue = calculateLeadValue(leads)
const formattedValue = formatCurrency(totalValue)
const statusColor = getCustomerStatusColor(CustomerStatus.ACTIVE)
```

## Best Practices

1. **Always use TypeScript types** - Don't use `any` unless absolutely necessary
2. **Use enums for constants** - Use the provided enums instead of string literals
3. **Validate data** - Use Zod schemas for form validation and API responses
4. **Use utility functions** - Leverage the provided utility functions for common operations
5. **Handle optional fields** - Always check for optional fields before using them
6. **Use proper error handling** - Handle API errors and validation errors appropriately
7. **Keep types in sync** - Update types when changing data structures
8. **Document complex types** - Add JSDoc comments for complex interfaces

## Migration Guide

When updating types:

1. Update the interface/type definition
2. Update corresponding Zod schemas
3. Update mock data in handlers
4. Update components using the types
5. Run TypeScript compiler to catch any issues
6. Update tests if necessary
7. Update documentation

This comprehensive type system provides type safety, validation, and utility functions for building a robust CRM application.
