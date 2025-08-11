import {
  Customer,
  Contact,
  Lead,
  Task,
  User,
  CustomerStatus,
  CustomerSource,
  LeadStage,
  TaskStatus,
  TaskPriority,
  InteractionType,
  TaskType,
} from '../types'

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj)
}

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // Format as +X (XXX) XXX-XXXX
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}

// ============================================================================
// STATUS & STAGE UTILITIES
// ============================================================================

export const getCustomerStatusColor = (status: CustomerStatus): string => {
  switch (status) {
    case CustomerStatus.ACTIVE:
      return 'text-green-600 bg-green-100'
    case CustomerStatus.INACTIVE:
      return 'text-gray-600 bg-gray-100'
    case CustomerStatus.PROSPECT:
      return 'text-blue-600 bg-blue-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getLeadStageColor = (stage: LeadStage): string => {
  switch (stage) {
    case LeadStage.LEAD:
      return 'text-gray-600 bg-gray-100'
    case LeadStage.QUALIFIED:
      return 'text-blue-600 bg-blue-100'
    case LeadStage.PROPOSAL:
      return 'text-yellow-600 bg-yellow-100'
    case LeadStage.NEGOTIATION:
      return 'text-orange-600 bg-orange-100'
    case LeadStage.CLOSED_WON:
      return 'text-green-600 bg-green-100'
    case LeadStage.CLOSED_LOST:
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getTaskStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return 'text-yellow-600 bg-yellow-100'
    case TaskStatus.IN_PROGRESS:
      return 'text-blue-600 bg-blue-100'
    case TaskStatus.COMPLETED:
      return 'text-green-600 bg-green-100'
    case TaskStatus.CANCELLED:
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getTaskPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case TaskPriority.LOW:
      return 'text-gray-600 bg-gray-100'
    case TaskPriority.MEDIUM:
      return 'text-yellow-600 bg-yellow-100'
    case TaskPriority.HIGH:
      return 'text-orange-600 bg-orange-100'
    case TaskPriority.URGENT:
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getInteractionTypeIcon = (type: InteractionType): string => {
  switch (type) {
    case InteractionType.CALL:
      return '📞'
    case InteractionType.EMAIL:
      return '📧'
    case InteractionType.MEETING:
      return '🤝'
    case InteractionType.NOTE:
      return '📝'
    case InteractionType.TEXT:
      return '💬'
    case InteractionType.VIDEO_CALL:
      return '📹'
    default:
      return '📋'
  }
}

export const getTaskTypeIcon = (type: TaskType): string => {
  switch (type) {
    case TaskType.CALL:
      return '📞'
    case TaskType.EMAIL:
      return '📧'
    case TaskType.MEETING:
      return '🤝'
    case TaskType.FOLLOW_UP:
      return '🔄'
    case TaskType.DEMO:
      return '🎯'
    case TaskType.PROPOSAL:
      return '📄'
    case TaskType.CONTRACT:
      return '📋'
    default:
      return '📋'
  }
}

// ============================================================================
// CALCULATION UTILITIES
// ============================================================================

export const calculateLeadValue = (leads: Lead[]): number => {
  return leads.reduce((total, lead) => {
    if (lead.stage !== LeadStage.CLOSED_LOST) {
      return total + (lead.value * (lead.probability / 100))
    }
    return total
  }, 0)
}

export const calculateConversionRate = (leads: Lead[]): number => {
  const totalLeads = leads.length
  const wonLeads = leads.filter(lead => lead.stage === LeadStage.CLOSED_WON).length
  
  if (totalLeads === 0) return 0
  return Math.round((wonLeads / totalLeads) * 100)
}

export const calculateAverageDealSize = (leads: Lead[]): number => {
  const wonLeads = leads.filter(lead => lead.stage === LeadStage.CLOSED_WON)
  
  if (wonLeads.length === 0) return 0
  
  const totalValue = wonLeads.reduce((sum, lead) => sum + lead.value, 0)
  return Math.round(totalValue / wonLeads.length)
}

export const calculateTaskCompletionRate = (tasks: Task[]): number => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED).length
  
  if (totalTasks === 0) return 0
  return Math.round((completedTasks / totalTasks) * 100)
}

export const calculateOverdueTasks = (tasks: Task[]): number => {
  const now = new Date()
  return tasks.filter(task => {
    return task.status !== TaskStatus.COMPLETED && 
           task.status !== TaskStatus.CANCELLED && 
           new Date(task.dueDate) < now
  }).length
}

// ============================================================================
// FILTERING UTILITIES
// ============================================================================

export const filterCustomersByStatus = (customers: Customer[], status: CustomerStatus[]): Customer[] => {
  if (status.length === 0) return customers
  return customers.filter(customer => status.includes(customer.status))
}

export const filterCustomersBySource = (customers: Customer[], sources: CustomerSource[]): Customer[] => {
  if (sources.length === 0) return customers
  return customers.filter(customer => sources.includes(customer.source))
}

export const filterLeadsByStage = (leads: Lead[], stages: LeadStage[]): Lead[] => {
  if (stages.length === 0) return leads
  return leads.filter(lead => stages.includes(lead.stage))
}

export const filterTasksByStatus = (tasks: Task[], statuses: TaskStatus[]): Task[] => {
  if (statuses.length === 0) return tasks
  return tasks.filter(task => statuses.includes(task.status))
}

export const filterTasksByPriority = (tasks: Task[], priorities: TaskPriority[]): Task[] => {
  if (priorities.length === 0) return tasks
  return tasks.filter(task => priorities.includes(task.priority))
}

export const filterByDateRange = <T extends { createdAt: Date }>(
  items: T[],
  startDate: Date,
  endDate: Date
): T[] => {
  return items.filter(item => {
    const itemDate = new Date(item.createdAt)
    return itemDate >= startDate && itemDate <= endDate
  })
}

export const searchItems = <T extends Record<string, any>>(
  items: T[],
  query: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!query.trim()) return items
  
  const searchTerm = query.toLowerCase()
  
  return items.filter(item => {
    return searchFields.some(field => {
      const value = item[field]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm)
      }
      if (typeof value === 'number') {
        return value.toString().includes(searchTerm)
      }
      return false
    })
  })
}

// ============================================================================
// SORTING UTILITIES
// ============================================================================

export const sortByDate = <T extends { createdAt: Date }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

export const sortByValue = (leads: Lead[], order: 'asc' | 'desc' = 'desc'): Lead[] => {
  return [...leads].sort((a, b) => {
    return order === 'asc' ? a.value - b.value : b.value - a.value
  })
}

export const sortByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder = {
    [TaskPriority.URGENT]: 4,
    [TaskPriority.HIGH]: 3,
    [TaskPriority.MEDIUM]: 2,
    [TaskPriority.LOW]: 1,
  }
  
  return [...tasks].sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

export const sortByDueDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime()
    const dateB = new Date(b.dueDate).getTime()
    return dateA - dateB
  })
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export const isValidZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode)
}

// ============================================================================
// DATA TRANSFORMATION UTILITIES
// ============================================================================

export const groupCustomersByStatus = (customers: Customer[]): Record<CustomerStatus, Customer[]> => {
  return customers.reduce((groups, customer) => {
    if (!groups[customer.status]) {
      groups[customer.status] = []
    }
    groups[customer.status].push(customer)
    return groups
  }, {} as Record<CustomerStatus, Customer[]>)
}

export const groupLeadsByStage = (leads: Lead[]): Record<LeadStage, Lead[]> => {
  return leads.reduce((groups, lead) => {
    if (!groups[lead.stage]) {
      groups[lead.stage] = []
    }
    groups[lead.stage].push(lead)
    return groups
  }, {} as Record<LeadStage, Lead[]>)
}

export const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
  return tasks.reduce((groups, task) => {
    if (!groups[task.status]) {
      groups[task.status] = []
    }
    groups[task.status].push(task)
    return groups
  }, {} as Record<TaskStatus, Task[]>)
}

export const getCustomerStats = (customers: Customer[]) => {
  const total = customers.length
  const active = customers.filter(c => c.status === CustomerStatus.ACTIVE).length
  const inactive = customers.filter(c => c.status === CustomerStatus.INACTIVE).length
  const prospects = customers.filter(c => c.status === CustomerStatus.PROSPECT).length
  
  return {
    total,
    active,
    inactive,
    prospects,
    activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
  }
}

export const getLeadStats = (leads: Lead[]) => {
  const total = leads.length
  const won = leads.filter(l => l.stage === LeadStage.CLOSED_WON).length
  const lost = leads.filter(l => l.stage === LeadStage.CLOSED_LOST).length
  const active = total - won - lost
  
  return {
    total,
    won,
    lost,
    active,
    winRate: total > 0 ? Math.round((won / total) * 100) : 0,
    totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
    averageValue: total > 0 ? Math.round(leads.reduce((sum, lead) => sum + lead.value, 0) / total) : 0,
  }
}

export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length
  const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED).length
  const pending = tasks.filter(t => t.status === TaskStatus.PENDING).length
  const inProgress = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length
  const overdue = calculateOverdueTasks(tasks)
  
  return {
    total,
    completed,
    pending,
    inProgress,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}
