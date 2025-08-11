import { z } from 'zod'
import {
  CustomerStatus,
  CustomerSource,
  InteractionType,
  LeadStage,
  TaskType,
  TaskStatus,
  TaskPriority,
  UserRole,
} from './types'

// ============================================================================
// BASE SCHEMAS
// ============================================================================

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
})

export const dateSchema = z.preprocess(
  (arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
  },
  z.date()
)

// ============================================================================
// CUSTOMER SCHEMAS
// ============================================================================

export const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  company: z.string().min(1, 'Company is required').max(100, 'Company must be less than 100 characters'),
  address: addressSchema,
  status: z.nativeEnum(CustomerStatus),
  source: z.nativeEnum(CustomerSource),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
})

export const customerUpdateSchema = customerSchema.partial().extend({
  id: z.string().min(1, 'Customer ID is required'),
})

export const customerFiltersSchema = z.object({
  status: z.array(z.nativeEnum(CustomerStatus)).optional(),
  source: z.array(z.nativeEnum(CustomerSource)).optional(),
  assignedTo: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  dateRange: z.object({
    start: dateSchema,
    end: dateSchema,
  }).optional(),
  search: z.string().optional(),
})

// ============================================================================
// CONTACT/INTERACTION SCHEMAS
// ============================================================================

export const contactSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, 'Customer ID is required'),
  type: z.nativeEnum(InteractionType),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  outcome: z.string().optional(),
  date: dateSchema,
  duration: z.number().min(0, 'Duration must be positive').optional(),
  createdBy: z.string().min(1, 'Created by user is required'),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
})

export const contactUpdateSchema = contactSchema.partial().extend({
  id: z.string().min(1, 'Contact ID is required'),
})

// ============================================================================
// LEAD/PIPELINE SCHEMAS
// ============================================================================

export const leadSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, 'Customer ID is required'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  stage: z.nativeEnum(LeadStage),
  value: z.number().min(0, 'Value must be positive'),
  probability: z.number().min(0, 'Probability must be between 0 and 100').max(100),
  expectedCloseDate: dateSchema.optional(),
  actualCloseDate: dateSchema.optional(),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
})

export const leadUpdateSchema = leadSchema.partial().extend({
  id: z.string().min(1, 'Lead ID is required'),
})

export const leadFiltersSchema = z.object({
  stage: z.array(z.nativeEnum(LeadStage)).optional(),
  assignedTo: z.array(z.string()).optional(),
  valueRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }).optional(),
  expectedCloseDate: z.object({
    start: dateSchema,
    end: dateSchema,
  }).optional(),
  search: z.string().optional(),
})

// ============================================================================
// TASK SCHEMAS
// ============================================================================

export const taskSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, 'Customer ID is required'),
  leadId: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  type: z.nativeEnum(TaskType),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  dueDate: dateSchema,
  completedAt: dateSchema.optional(),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  createdBy: z.string().min(1, 'Created by user is required'),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
})

export const taskUpdateSchema = taskSchema.partial().extend({
  id: z.string().min(1, 'Task ID is required'),
})

export const taskFiltersSchema = z.object({
  status: z.array(z.nativeEnum(TaskStatus)).optional(),
  priority: z.array(z.nativeEnum(TaskPriority)).optional(),
  type: z.array(z.nativeEnum(TaskType)).optional(),
  assignedTo: z.array(z.string()).optional(),
  dueDate: z.object({
    start: dateSchema,
    end: dateSchema,
  }).optional(),
  search: z.string().optional(),
})

// ============================================================================
// USER SCHEMAS
// ============================================================================

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  role: z.nativeEnum(UserRole),
  avatar: z.string().url('Invalid avatar URL').optional(),
  isActive: z.boolean().default(true),
  lastLoginAt: dateSchema.optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
})

export const userUpdateSchema = userSchema.partial().extend({
  id: z.string().min(1, 'User ID is required'),
})

// ============================================================================
// AUTHENTICATION SCHEMAS
// ============================================================================

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.nativeEnum(UserRole).default(UserRole.SALES_REP),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// ============================================================================
// FORM DATA SCHEMAS
// ============================================================================

export const customerFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  company: z.string().min(1, 'Company is required').max(100, 'Company must be less than 100 characters'),
  address: addressSchema,
  status: z.nativeEnum(CustomerStatus),
  source: z.nativeEnum(CustomerSource),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
})

export const contactFormSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  type: z.nativeEnum(InteractionType),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  outcome: z.string().optional(),
  date: dateSchema,
  duration: z.number().min(0, 'Duration must be positive').optional(),
})

export const leadFormSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  stage: z.nativeEnum(LeadStage),
  value: z.number().min(0, 'Value must be positive'),
  probability: z.number().min(0, 'Probability must be between 0 and 100').max(100),
  expectedCloseDate: dateSchema.optional(),
  assignedTo: z.string().min(1, 'Assigned user is required'),
})

export const taskFormSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  leadId: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  type: z.nativeEnum(TaskType),
  priority: z.nativeEnum(TaskPriority),
  dueDate: dateSchema,
  assignedTo: z.string().min(1, 'Assigned user is required'),
})

export const userFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  role: z.nativeEnum(UserRole),
  avatar: z.string().url('Invalid avatar URL').optional(),
})

// ============================================================================
// API RESPONSE SCHEMAS
// ============================================================================

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string(),
    errors: z.array(z.string()).optional(),
  })

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  })

export const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string(),
  details: z.record(z.any()).optional(),
})

// ============================================================================
// SEARCH & FILTER SCHEMAS
// ============================================================================

export const searchParamsSchema = z.object({
  query: z.string().optional(),
  filters: z.record(z.any()).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
})

// ============================================================================
// UTILITY SCHEMAS
// ============================================================================

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
})

export const dateRangeSchema = z.object({
  start: dateSchema,
  end: dateSchema,
}).refine((data) => data.start <= data.end, {
  message: 'Start date must be before or equal to end date',
  path: ['end'],
})

// ============================================================================
// EXPORT ALL SCHEMAS
// ============================================================================

export {
  customerSchema,
  customerUpdateSchema,
  customerFiltersSchema,
  contactSchema,
  contactUpdateSchema,
  leadSchema,
  leadUpdateSchema,
  leadFiltersSchema,
  taskSchema,
  taskUpdateSchema,
  taskFiltersSchema,
  userSchema,
  userUpdateSchema,
  loginSchema,
  registerSchema,
  changePasswordSchema,
  customerFormSchema,
  contactFormSchema,
  leadFormSchema,
  taskFormSchema,
  userFormSchema,
  apiResponseSchema,
  paginatedResponseSchema,
  apiErrorSchema,
  searchParamsSchema,
  idParamSchema,
  paginationSchema,
  dateRangeSchema,
  addressSchema,
  dateSchema,
}
