import { Customer, Deal, Task, DashboardStats, ApiResponse } from '@/lib/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Dashboard API
export const dashboardApi = {
  getStats: (): Promise<ApiResponse<DashboardStats>> =>
    fetchApi<ApiResponse<DashboardStats>>('/dashboard/stats'),
}

// Customers API
export const customersApi = {
  getAll: (): Promise<ApiResponse<Customer[]>> =>
    fetchApi<ApiResponse<Customer[]>>('/customers'),
  
  getById: (id: string): Promise<ApiResponse<Customer>> =>
    fetchApi<ApiResponse<Customer>>(`/customers/${id}`),
  
  create: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Customer>> =>
    fetchApi<ApiResponse<Customer>>('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    }),
  
  update: (id: string, customer: Partial<Customer>): Promise<ApiResponse<Customer>> =>
    fetchApi<ApiResponse<Customer>>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    }),
  
  delete: (id: string): Promise<ApiResponse<void>> =>
    fetchApi<ApiResponse<void>>(`/customers/${id}`, {
      method: 'DELETE',
    }),
}

// Deals API
export const dealsApi = {
  getAll: (): Promise<ApiResponse<Deal[]>> =>
    fetchApi<ApiResponse<Deal[]>>('/deals'),
  
  getById: (id: string): Promise<ApiResponse<Deal>> =>
    fetchApi<ApiResponse<Deal>>(`/deals/${id}`),
  
  create: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Deal>> =>
    fetchApi<ApiResponse<Deal>>('/deals', {
      method: 'POST',
      body: JSON.stringify(deal),
    }),
  
  update: (id: string, deal: Partial<Deal>): Promise<ApiResponse<Deal>> =>
    fetchApi<ApiResponse<Deal>>(`/deals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(deal),
    }),
}

// Tasks API
export const tasksApi = {
  getAll: (): Promise<ApiResponse<Task[]>> =>
    fetchApi<ApiResponse<Task[]>>('/tasks'),
  
  getById: (id: string): Promise<ApiResponse<Task>> =>
    fetchApi<ApiResponse<Task>>(`/tasks/${id}`),
  
  create: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Task>> =>
    fetchApi<ApiResponse<Task>>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }),
  
  update: (id: string, task: Partial<Task>): Promise<ApiResponse<Task>> =>
    fetchApi<ApiResponse<Task>>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    }),
}

// Auth API
export const authApi = {
  login: (email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> =>
    fetchApi<ApiResponse<{ user: any; token: string }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  logout: (): Promise<ApiResponse<void>> =>
    fetchApi<ApiResponse<void>>('/auth/logout', {
      method: 'POST',
    }),
}
