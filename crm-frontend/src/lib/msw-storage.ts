import {
  Customer,
  Contact,
  Lead,
  Task,
  User,
  CustomerFilters,
  LeadFilters,
  TaskFilters,
  SearchParams,
  PaginatedResponse,
} from './types'

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  CUSTOMERS: 'crm-customers',
  CONTACTS: 'crm-contacts',
  LEADS: 'crm-leads',
  TASKS: 'crm-tasks',
  USERS: 'crm-users',
} as const

// ============================================================================
// STORAGE UTILITIES
// ============================================================================

export class MSWStorage {
  private static instance: MSWStorage
  private storage: Storage

  constructor() {
    this.storage = typeof window !== 'undefined' ? window.localStorage : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    }
  }

  static getInstance(): MSWStorage {
    if (!MSWStorage.instance) {
      MSWStorage.instance = new MSWStorage()
    }
    return MSWStorage.instance
  }

  // ============================================================================
  // CUSTOMER STORAGE
  // ============================================================================

  getCustomers(): Customer[] {
    const data = this.storage.getItem(STORAGE_KEYS.CUSTOMERS)
    return data ? JSON.parse(data) : []
  }

  setCustomers(customers: Customer[]): void {
    this.storage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers))
  }

  addCustomer(customer: Customer): void {
    const customers = this.getCustomers()
    customers.push(customer)
    this.setCustomers(customers)
  }

  updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
    const customers = this.getCustomers()
    const index = customers.findIndex(c => c.id === id)
    if (index === -1) return null

    customers[index] = { ...customers[index], ...updates, updatedAt: new Date() }
    this.setCustomers(customers)
    return customers[index]
  }

  deleteCustomer(id: string): boolean {
    const customers = this.getCustomers()
    const filtered = customers.filter(c => c.id !== id)
    if (filtered.length === customers.length) return false

    this.setCustomers(filtered)
    return true
  }

  // ============================================================================
  // CONTACT STORAGE
  // ============================================================================

  getContacts(): Contact[] {
    const data = this.storage.getItem(STORAGE_KEYS.CONTACTS)
    return data ? JSON.parse(data) : []
  }

  setContacts(contacts: Contact[]): void {
    this.storage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts))
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts()
    contacts.push(contact)
    this.setContacts(contacts)
  }

  updateContact(id: string, updates: Partial<Contact>): Contact | null {
    const contacts = this.getContacts()
    const index = contacts.findIndex(c => c.id === id)
    if (index === -1) return null

    contacts[index] = { ...contacts[index], ...updates, updatedAt: new Date() }
    this.setContacts(contacts)
    return contacts[index]
  }

  deleteContact(id: string): boolean {
    const contacts = this.getContacts()
    const filtered = contacts.filter(c => c.id !== id)
    if (filtered.length === contacts.length) return false

    this.setContacts(filtered)
    return true
  }

  // ============================================================================
  // LEAD STORAGE
  // ============================================================================

  getLeads(): Lead[] {
    const data = this.storage.getItem(STORAGE_KEYS.LEADS)
    return data ? JSON.parse(data) : []
  }

  setLeads(leads: Lead[]): void {
    this.storage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads))
  }

  addLead(lead: Lead): void {
    const leads = this.getLeads()
    leads.push(lead)
    this.setLeads(leads)
  }

  updateLead(id: string, updates: Partial<Lead>): Lead | null {
    const leads = this.getLeads()
    const index = leads.findIndex(l => l.id === id)
    if (index === -1) return null

    leads[index] = { ...leads[index], ...updates, updatedAt: new Date() }
    this.setLeads(leads)
    return leads[index]
  }

  deleteLead(id: string): boolean {
    const leads = this.getLeads()
    const filtered = leads.filter(l => l.id !== id)
    if (filtered.length === leads.length) return false

    this.setLeads(filtered)
    return true
  }

  // ============================================================================
  // TASK STORAGE
  // ============================================================================

  getTasks(): Task[] {
    const data = this.storage.getItem(STORAGE_KEYS.TASKS)
    return data ? JSON.parse(data) : []
  }

  setTasks(tasks: Task[]): void {
    this.storage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks))
  }

  addTask(task: Task): void {
    const tasks = this.getTasks()
    tasks.push(task)
    this.setTasks(tasks)
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks()
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) return null

    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date() }
    this.setTasks(tasks)
    return tasks[index]
  }

  deleteTask(id: string): boolean {
    const tasks = this.getTasks()
    const filtered = tasks.filter(t => t.id !== id)
    if (filtered.length === tasks.length) return false

    this.setTasks(filtered)
    return true
  }

  // ============================================================================
  // USER STORAGE
  // ============================================================================

  getUsers(): User[] {
    const data = this.storage.getItem(STORAGE_KEYS.USERS)
    return data ? JSON.parse(data) : []
  }

  setUsers(users: User[]): void {
    this.storage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  initializeWithMockData(mockData: {
    customers: Customer[]
    contacts: Contact[]
    leads: Lead[]
    tasks: Task[]
    users: User[]
  }): void {
    // Only initialize if storage is empty
    if (this.getCustomers().length === 0) {
      this.setCustomers(mockData.customers)
    }
    if (this.getContacts().length === 0) {
      this.setContacts(mockData.contacts)
    }
    if (this.getLeads().length === 0) {
      this.setLeads(mockData.leads)
    }
    if (this.getTasks().length === 0) {
      this.setTasks(mockData.tasks)
    }
    if (this.getUsers().length === 0) {
      this.setUsers(mockData.users)
    }
  }

  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      this.storage.removeItem(key)
    })
  }

  exportData(): Record<string, any> {
    return {
      customers: this.getCustomers(),
      contacts: this.getContacts(),
      leads: this.getLeads(),
      tasks: this.getTasks(),
      users: this.getUsers(),
    }
  }

  importData(data: Record<string, any>): void {
    if (data.customers) this.setCustomers(data.customers)
    if (data.contacts) this.setContacts(data.contacts)
    if (data.leads) this.setLeads(data.leads)
    if (data.tasks) this.setTasks(data.tasks)
    if (data.users) this.setUsers(data.users)
  }
}

// ============================================================================
// FILTERING AND SEARCH UTILITIES
// ============================================================================

export const filterCustomers = (
  customers: Customer[],
  filters: CustomerFilters,
  search?: string
): Customer[] => {
  let filtered = [...customers]

  // Apply status filter
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(customer => filters.status!.includes(customer.status))
  }

  // Apply source filter
  if (filters.source && filters.source.length > 0) {
    filtered = filtered.filter(customer => filters.source!.includes(customer.source))
  }

  // Apply assignedTo filter
  if (filters.assignedTo && filters.assignedTo.length > 0) {
    filtered = filtered.filter(customer => filters.assignedTo!.includes(customer.assignedTo))
  }

  // Apply tags filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(customer => 
      filters.tags!.some(tag => customer.tags.includes(tag))
    )
  }

  // Apply date range filter
  if (filters.dateRange) {
    filtered = filtered.filter(customer => {
      const customerDate = new Date(customer.createdAt)
      return customerDate >= filters.dateRange!.start && customerDate <= filters.dateRange!.end
    })
  }

  // Apply search
  if (search) {
    const searchTerm = search.toLowerCase()
    filtered = filtered.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.company.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm)
    )
  }

  return filtered
}

export const filterLeads = (
  leads: Lead[],
  filters: LeadFilters,
  search?: string
): Lead[] => {
  let filtered = [...leads]

  // Apply stage filter
  if (filters.stage && filters.stage.length > 0) {
    filtered = filtered.filter(lead => filters.stage!.includes(lead.stage))
  }

  // Apply assignedTo filter
  if (filters.assignedTo && filters.assignedTo.length > 0) {
    filtered = filtered.filter(lead => filters.assignedTo!.includes(lead.assignedTo))
  }

  // Apply value range filter
  if (filters.valueRange) {
    filtered = filtered.filter(lead =>
      lead.value >= filters.valueRange!.min && lead.value <= filters.valueRange!.max
    )
  }

  // Apply expected close date filter
  if (filters.expectedCloseDate) {
    filtered = filtered.filter(lead => {
      if (!lead.expectedCloseDate) return false
      const closeDate = new Date(lead.expectedCloseDate)
      return closeDate >= filters.expectedCloseDate!.start && closeDate <= filters.expectedCloseDate!.end
    })
  }

  // Apply search
  if (search) {
    const searchTerm = search.toLowerCase()
    filtered = filtered.filter(lead =>
      lead.title.toLowerCase().includes(searchTerm) ||
      lead.description.toLowerCase().includes(searchTerm)
    )
  }

  return filtered
}

export const filterTasks = (
  tasks: Task[],
  filters: TaskFilters,
  search?: string
): Task[] => {
  let filtered = [...tasks]

  // Apply status filter
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(task => filters.status!.includes(task.status))
  }

  // Apply priority filter
  if (filters.priority && filters.priority.length > 0) {
    filtered = filtered.filter(task => filters.priority!.includes(task.priority))
  }

  // Apply type filter
  if (filters.type && filters.type.length > 0) {
    filtered = filtered.filter(task => filters.type!.includes(task.type))
  }

  // Apply assignedTo filter
  if (filters.assignedTo && filters.assignedTo.length > 0) {
    filtered = filtered.filter(task => filters.assignedTo!.includes(task.assignedTo))
  }

  // Apply due date filter
  if (filters.dueDate) {
    filtered = filtered.filter(task => {
      const dueDate = new Date(task.dueDate)
      return dueDate >= filters.dueDate!.start && dueDate <= filters.dueDate!.end
    })
  }

  // Apply search
  if (search) {
    const searchTerm = search.toLowerCase()
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    )
  }

  return filtered
}

// ============================================================================
// PAGINATION UTILITIES
// ============================================================================

export const paginateData = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> => {
  const total = data.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

// ============================================================================
// SORTING UTILITIES
// ============================================================================

export const sortData = <T>(
  data: T[],
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): T[] => {
  if (!sortBy) return data

  return [...data].sort((a, b) => {
    const aValue = (a as any)[sortBy]
    const bValue = (b as any)[sortBy]

    if (aValue === bValue) return 0

    let comparison = 0
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue)
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime()
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue
    } else {
      comparison = String(aValue).localeCompare(String(bValue))
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })
}

// ============================================================================
// ERROR SIMULATION
// ============================================================================

export const simulateError = (probability: number = 0.05): boolean => {
  return Math.random() < probability
}

export const simulateDelay = (min: number = 100, max: number = 1000): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}

// ============================================================================
// EXPORT STORAGE INSTANCE
// ============================================================================

export const storage = MSWStorage.getInstance()
