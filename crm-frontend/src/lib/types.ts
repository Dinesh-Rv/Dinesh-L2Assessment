// ============================================================================
// ENUMS
// ============================================================================

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PROSPECT = 'prospect',
}

export enum CustomerSource {
  WEBSITE = 'website',
  REFERRAL = 'referral',
  COLD_CALL = 'cold_call',
  SOCIAL_MEDIA = 'social_media',
  TRADE_SHOW = 'trade_show',
  ADVERTISING = 'advertising',
  OTHER = 'other',
}

export enum InteractionType {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  NOTE = 'note',
  TEXT = 'text',
  VIDEO_CALL = 'video_call',
}

export enum LeadStage {
  LEAD = 'lead',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost',
}

export enum TaskType {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  FOLLOW_UP = 'follow_up',
  DEMO = 'demo',
  PROPOSAL = 'proposal',
  CONTRACT = 'contract',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SALES_REP = 'sales_rep',
  SUPPORT = 'support',
  VIEWER = 'viewer',
}

// ============================================================================
// BASE INTERFACES
// ============================================================================

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface Customer extends BaseEntity {
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

export interface Contact extends BaseEntity {
  customerId: string
  type: InteractionType
  subject: string
  description: string
  outcome?: string
  date: Date
  duration?: number // in minutes
  createdBy: string // User ID
}

export interface Lead extends BaseEntity {
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

export interface Task extends BaseEntity {
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

export interface User extends BaseEntity {
  name: string
  email: string
  role: UserRole
  avatar?: string
  isActive: boolean
  lastLoginAt?: Date
}

// ============================================================================
// DASHBOARD & ANALYTICS
// ============================================================================

export interface DashboardStats {
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

export interface UserPerformance {
  userId: string
  userName: string
  dealsClosed: number
  revenueGenerated: number
  conversionRate: number
}

export interface ActivityLog {
  id: string
  type: 'customer_created' | 'lead_updated' | 'deal_closed' | 'task_completed'
  description: string
  userId: string
  userName: string
  timestamp: Date
  metadata?: Record<string, any>
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
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

export interface ApiError {
  message: string
  code: string
  details?: Record<string, any>
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface CustomerFormData {
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

export interface ContactFormData {
  customerId: string
  type: InteractionType
  subject: string
  description: string
  outcome?: string
  date: Date
  duration?: number
}

export interface LeadFormData {
  customerId: string
  title: string
  description: string
  stage: LeadStage
  value: number
  probability: number
  expectedCloseDate?: Date
  assignedTo: string
}

export interface TaskFormData {
  customerId: string
  leadId?: string
  title: string
  description: string
  type: TaskType
  priority: TaskPriority
  dueDate: Date
  assignedTo: string
}

export interface UserFormData {
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface CustomerFilters {
  status?: CustomerStatus[]
  source?: CustomerSource[]
  assignedTo?: string[]
  tags?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface LeadFilters {
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

export interface TaskFilters {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  type?: TaskType[]
  assignedTo?: string[]
  dueDate?: {
    start: Date
    end: Date
  }
}

export interface SearchParams {
  query: string
  filters?: CustomerFilters | LeadFilters | TaskFilters
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type CustomerWithRelations = Customer & {
  assignedUser?: User
  contacts?: Contact[]
  leads?: Lead[]
  tasks?: Task[]
}

export type LeadWithRelations = Lead & {
  customer?: Customer
  assignedUser?: User
  tasks?: Task[]
}

export type TaskWithRelations = Task & {
  customer?: Customer
  lead?: Lead
  assignedUser?: User
  createdByUser?: User
}

export type ContactWithRelations = Contact & {
  customer?: Customer
  createdByUser?: User
}

export type UserWithStats = User & {
  stats: {
    totalCustomers: number
    totalLeads: number
    totalDeals: number
    totalRevenue: number
    conversionRate: number
  }
}

// ============================================================================
// STATE MANAGEMENT TYPES
// ============================================================================

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notifications: Notification[]
  modals: {
    [key: string]: boolean
  }
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

// ============================================================================
// END OF TYPES
// ============================================================================
