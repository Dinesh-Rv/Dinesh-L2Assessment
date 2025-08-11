import { http, HttpResponse } from 'msw'
import {
  Customer,
  Contact,
  Lead,
  Task,
  User,
  DashboardStats,
  CustomerStatus,
  CustomerSource,
  InteractionType,
  LeadStage,
  TaskType,
  TaskStatus,
  TaskPriority,
  UserRole,
  CustomerFilters,
  LeadFilters,
  TaskFilters,
  SearchParams,
} from '@/lib/types'
import {
  mockUsers,
  mockCustomers,
  mockContacts,
  mockLeads,
  mockTasks,
  mockData,
} from '@/lib/mock-data'
import {
  storage,
  filterCustomers,
  filterLeads,
  filterTasks,
  paginateData,
  sortData,
  simulateError,
  simulateDelay,
} from '@/lib/msw-storage'

// Initialize storage with mock data
storage.initializeWithMockData(mockData)

// ============================================================================
// DASHBOARD STATS
// ============================================================================

const generateDashboardStats = (): DashboardStats => {
  const customers = storage.getCustomers()
  const leads = storage.getLeads()
  const tasks = storage.getTasks()

  const totalCustomers = customers.length
  const totalLeads = leads.length
  const totalDeals = leads.filter(l => l.stage === LeadStage.CLOSED_WON).length
  const totalRevenue = leads
    .filter(l => l.stage === LeadStage.CLOSED_WON)
    .reduce((sum, lead) => sum + lead.value, 0)
  const activeDeals = leads.filter(l => 
    l.stage !== LeadStage.CLOSED_WON && l.stage !== LeadStage.CLOSED_LOST
  ).length
  const conversionRate = totalLeads > 0 ? Math.round((totalDeals / totalLeads) * 100) : 0
  const averageDealSize = totalDeals > 0 ? Math.round(totalRevenue / totalDeals) : 0
  const monthlyGrowth = Math.round(Math.random() * 20) + 5 // 5-25% growth

  const topPerformingUsers = mockUsers.slice(0, 3).map(user => ({
    userId: user.id,
    userName: user.name,
    dealsClosed: Math.floor(Math.random() * 10) + 1,
    revenueGenerated: Math.floor(Math.random() * 500000) + 100000,
    conversionRate: Math.floor(Math.random() * 30) + 50,
  }))

  const recentActivities = [
    {
      id: 'activity-1',
      type: 'deal_closed' as const,
      description: 'Enterprise Software License closed for $150,000',
      userId: mockUsers[0].id,
      userName: mockUsers[0].name,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 'activity-2',
      type: 'lead_updated' as const,
      description: 'Cloud Migration Project moved to Negotiation stage',
      userId: mockUsers[1].id,
      userName: mockUsers[1].name,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
    {
      id: 'activity-3',
      type: 'customer_created' as const,
      description: 'New customer TechCorp Solutions added',
      userId: mockUsers[2].id,
      userName: mockUsers[2].name,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    },
  ]

  return {
    totalCustomers,
    totalLeads,
    totalDeals,
    totalRevenue,
    activeDeals,
    conversionRate,
    averageDealSize,
    monthlyGrowth,
    topPerformingUsers,
    recentActivities,
  }
}

// ============================================================================
// AUTHENTICATION HANDLERS
// ============================================================================

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    await simulateDelay(500, 1500)
    
    if (simulateError(0.02)) {
      return HttpResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }

    const body = await request.json() as { email: string; password: string }
    const { email, password } = body
    
    if (email === 'admin@crm.com' && password === 'password') {
      return HttpResponse.json({
        success: true,
        data: {
          user: mockUsers[0],
          token: 'mock-jwt-token-' + Date.now(),
        },
        message: 'Login successful',
      })
    }
    
    return HttpResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  // Dashboard endpoints
  http.get('/api/dashboard/stats', async () => {
    await simulateDelay(300, 800)
    
    if (simulateError(0.01)) {
      return HttpResponse.json(
        { success: false, message: 'Failed to load dashboard stats' },
        { status: 500 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: generateDashboardStats(),
      message: 'Dashboard stats retrieved successfully',
    })
  }),

  // ============================================================================
  // CUSTOMER HANDLERS
  // ============================================================================

  // GET /api/customers - List customers with filtering, pagination, search
  http.get('/api/customers', async ({ request }) => {
    await simulateDelay(200, 600)
    
    if (simulateError(0.02)) {
      return HttpResponse.json(
        { success: false, message: 'Failed to load customers' },
        { status: 500 }
      )
    }

    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search') || undefined
    const sortBy = url.searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'
    
    // Parse filters from URL
    const filters: CustomerFilters = {}
    const status = url.searchParams.get('status')
    if (status) filters.status = status.split(',') as CustomerStatus[]
    
    const source = url.searchParams.get('source')
    if (source) filters.source = source.split(',') as CustomerSource[]
    
    const assignedTo = url.searchParams.get('assignedTo')
    if (assignedTo) filters.assignedTo = assignedTo.split(',')
    
    const tags = url.searchParams.get('tags')
    if (tags) filters.tags = tags.split(',')

    const customers = storage.getCustomers()
    let filtered = filterCustomers(customers, filters, search)
    filtered = sortData(filtered, sortBy, sortOrder)
    const paginated = paginateData(filtered, page, limit)

    return HttpResponse.json({
      success: true,
      data: paginated.data,
      pagination: paginated.pagination,
      message: 'Customers retrieved successfully',
    })
  }),

  // GET /api/customers/:id - Get single customer
  http.get('/api/customers/:id', async ({ params }) => {
    await simulateDelay(100, 300)
    
    if (simulateError(0.01)) {
      return HttpResponse.json(
        { success: false, message: 'Failed to load customer' },
        { status: 500 }
      )
    }

    const customers = storage.getCustomers()
    const customer = customers.find(c => c.id === params.id)
    
    if (!customer) {
      return HttpResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: customer,
      message: 'Customer retrieved successfully',
    })
  }),

  // POST /api/customers - Create customer
  http.post('/api/customers', async ({ request }) => {
    await simulateDelay(400, 1000)
    
    if (simulateError(0.03)) {
      return HttpResponse.json(
        { success: false, message: 'Failed to create customer' },
        { status: 500 }
      )
    }

    const customerData = await request.json()
    const newCustomer: Customer = {
      ...customerData,
      id: `customer-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    storage.addCustomer(newCustomer)

    return HttpResponse.json({
      success: true,
      data: newCustomer,
      message: 'Customer created successfully',
    }, { status: 201 })
  }),

  // PUT /api/customers/:id - Update customer
  http.put('/api/customers/:id', async ({ params, request }) => {
    await simulateDelay(300, 800)
    
    if (simulateError(0.02)) {
      return HttpResponse.json(
        { success: false, message: 'Failed to update customer' },
        { status: 500 }
      )
    }

    const updates = await request.json()
    const updatedCustomer = storage.updateCustomer(params.id as string, updates)
    
    if (!updatedCustomer) {
      return HttpResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: updatedCustomer,
      message: 'Customer updated successfully',
    })
  }),

  // DELETE /api/customers/:id - Delete customer
  http.delete('/api/customers/:id', async ({ params }) => {
    await simulateDelay(200, 500)
    
    if (simulateError(0.02)) {
      return HttpResponse.json(
        { success: false, message: 'Failed to delete customer' },
        { status: 500 }
      )
    }

    const deleted = storage.deleteCustomer(params.id as string)
    
    if (!deleted) {
      return HttpResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      message: 'Customer deleted successfully',
    })
  }),

  // ============================================================================
  // CONTACT HANDLERS
  // ============================================================================

  // GET /api/contacts - List contacts with filtering
  http.get('/api/contacts', async ({ request }) => {
    await simulateDelay(200, 600)
    
    const url = new URL(request.url)
    const customerId = url.searchParams.get('customerId')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')

    let contacts = storage.getContacts()
    
    if (customerId) {
      contacts = contacts.filter(c => c.customerId === customerId)
    }

    const paginated = paginateData(contacts, page, limit)

    return HttpResponse.json({
      success: true,
      data: paginated.data,
      pagination: paginated.pagination,
      message: 'Contacts retrieved successfully',
    })
  }),

  // GET /api/customers/:customerId/contacts - Get customer contacts
  http.get('/api/customers/:customerId/contacts', async ({ params }) => {
    await simulateDelay(150, 400)
    
    const contacts = storage.getContacts()
    const customerContacts = contacts.filter(c => c.customerId === params.customerId)

    return HttpResponse.json({
      success: true,
      data: customerContacts,
      message: 'Customer contacts retrieved successfully',
    })
  }),

  // POST /api/contacts - Create contact
  http.post('/api/contacts', async ({ request }) => {
    await simulateDelay(300, 700)
    
    const contactData = await request.json()
    const newContact: Contact = {
      ...contactData,
      id: `contact-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    storage.addContact(newContact)

    return HttpResponse.json({
      success: true,
      data: newContact,
      message: 'Contact created successfully',
    }, { status: 201 })
  }),

  // PUT /api/contacts/:id - Update contact
  http.put('/api/contacts/:id', async ({ params, request }) => {
    await simulateDelay(250, 600)
    
    const updates = await request.json()
    const updatedContact = storage.updateContact(params.id as string, updates)
    
    if (!updatedContact) {
      return HttpResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: updatedContact,
      message: 'Contact updated successfully',
    })
  }),

  // DELETE /api/contacts/:id - Delete contact
  http.delete('/api/contacts/:id', async ({ params }) => {
    await simulateDelay(150, 400)
    
    const deleted = storage.deleteContact(params.id as string)
    
    if (!deleted) {
      return HttpResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      message: 'Contact deleted successfully',
    })
  }),

  // ============================================================================
  // LEAD/PIPELINE HANDLERS
  // ============================================================================

  // GET /api/leads - List leads with filtering
  http.get('/api/leads', async ({ request }) => {
    await simulateDelay(200, 600)
    
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search') || undefined
    const sortBy = url.searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'
    
    // Parse filters
    const filters: LeadFilters = {}
    const stage = url.searchParams.get('stage')
    if (stage) filters.stage = stage.split(',') as LeadStage[]
    
    const assignedTo = url.searchParams.get('assignedTo')
    if (assignedTo) filters.assignedTo = assignedTo.split(',')

    const leads = storage.getLeads()
    let filtered = filterLeads(leads, filters, search)
    filtered = sortData(filtered, sortBy, sortOrder)
    const paginated = paginateData(filtered, page, limit)

    return HttpResponse.json({
      success: true,
      data: paginated.data,
      pagination: paginated.pagination,
      message: 'Leads retrieved successfully',
    })
  }),

  // GET /api/customers/:customerId/leads - Get customer leads
  http.get('/api/customers/:customerId/leads', async ({ params }) => {
    await simulateDelay(150, 400)
    
    const leads = storage.getLeads()
    const customerLeads = leads.filter(l => l.customerId === params.customerId)

    return HttpResponse.json({
      success: true,
      data: customerLeads,
      message: 'Customer leads retrieved successfully',
    })
  }),

  // POST /api/leads - Create lead
  http.post('/api/leads', async ({ request }) => {
    await simulateDelay(400, 1000)
    
    const leadData = await request.json()
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    storage.addLead(newLead)

    return HttpResponse.json({
      success: true,
      data: newLead,
      message: 'Lead created successfully',
    }, { status: 201 })
  }),

  // PUT /api/leads/:id - Update lead (for stage updates)
  http.put('/api/leads/:id', async ({ params, request }) => {
    await simulateDelay(300, 800)
    
    const updates = await request.json()
    const updatedLead = storage.updateLead(params.id as string, updates)
    
    if (!updatedLead) {
      return HttpResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: updatedLead,
      message: 'Lead updated successfully',
    })
  }),

  // DELETE /api/leads/:id - Delete lead
  http.delete('/api/leads/:id', async ({ params }) => {
    await simulateDelay(200, 500)
    
    const deleted = storage.deleteLead(params.id as string)
    
    if (!deleted) {
      return HttpResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    })
  }),

  // ============================================================================
  // TASK HANDLERS
  // ============================================================================

  // GET /api/tasks - List tasks with filtering
  http.get('/api/tasks', async ({ request }) => {
    await simulateDelay(200, 600)
    
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search') || undefined
    const sortBy = url.searchParams.get('sortBy') || 'dueDate'
    const sortOrder = (url.searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc'
    
    // Parse filters
    const filters: TaskFilters = {}
    const status = url.searchParams.get('status')
    if (status) filters.status = status.split(',') as TaskStatus[]
    
    const priority = url.searchParams.get('priority')
    if (priority) filters.priority = priority.split(',') as TaskPriority[]
    
    const type = url.searchParams.get('type')
    if (type) filters.type = type.split(',') as TaskType[]
    
    const assignedTo = url.searchParams.get('assignedTo')
    if (assignedTo) filters.assignedTo = assignedTo.split(',')

    const tasks = storage.getTasks()
    let filtered = filterTasks(tasks, filters, search)
    filtered = sortData(filtered, sortBy, sortOrder)
    const paginated = paginateData(filtered, page, limit)

    return HttpResponse.json({
      success: true,
      data: paginated.data,
      pagination: paginated.pagination,
      message: 'Tasks retrieved successfully',
    })
  }),

  // GET /api/customers/:customerId/tasks - Get customer tasks
  http.get('/api/customers/:customerId/tasks', async ({ params }) => {
    await simulateDelay(150, 400)
    
    const tasks = storage.getTasks()
    const customerTasks = tasks.filter(t => t.customerId === params.customerId)

    return HttpResponse.json({
      success: true,
      data: customerTasks,
      message: 'Customer tasks retrieved successfully',
    })
  }),

  // POST /api/tasks - Create task
  http.post('/api/tasks', async ({ request }) => {
    await simulateDelay(300, 700)
    
    const taskData = await request.json()
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    storage.addTask(newTask)

    return HttpResponse.json({
      success: true,
      data: newTask,
      message: 'Task created successfully',
    }, { status: 201 })
  }),

  // PUT /api/tasks/:id - Update task
  http.put('/api/tasks/:id', async ({ params, request }) => {
    await simulateDelay(250, 600)
    
    const updates = await request.json()
    const updatedTask = storage.updateTask(params.id as string, updates)
    
    if (!updatedTask) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully',
    })
  }),

  // DELETE /api/tasks/:id - Delete task
  http.delete('/api/tasks/:id', async ({ params }) => {
    await simulateDelay(150, 400)
    
    const deleted = storage.deleteTask(params.id as string)
    
    if (!deleted) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      message: 'Task deleted successfully',
    })
  }),

  // ============================================================================
  // USER HANDLERS
  // ============================================================================

  // GET /api/users - List users
  http.get('/api/users', async () => {
    await simulateDelay(100, 300)
    
    const users = storage.getUsers()

    return HttpResponse.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully',
    })
  }),

  // GET /api/users/:id - Get single user
  http.get('/api/users/:id', async ({ params }) => {
    await simulateDelay(100, 300)
    
    const users = storage.getUsers()
    const user = users.find(u => u.id === params.id)
    
    if (!user) {
      return HttpResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      success: true,
      data: user,
      message: 'User retrieved successfully',
    })
  }),

  // ============================================================================
  // UTILITY HANDLERS
  // ============================================================================

  // GET /api/stats - Get various statistics
  http.get('/api/stats', async () => {
    await simulateDelay(200, 500)
    
    const customers = storage.getCustomers()
    const leads = storage.getLeads()
    const tasks = storage.getTasks()

    const stats = {
      customers: {
        total: customers.length,
        active: customers.filter(c => c.status === CustomerStatus.ACTIVE).length,
        prospects: customers.filter(c => c.status === CustomerStatus.PROSPECT).length,
        inactive: customers.filter(c => c.status === CustomerStatus.INACTIVE).length,
      },
      leads: {
        total: leads.length,
        won: leads.filter(l => l.stage === LeadStage.CLOSED_WON).length,
        lost: leads.filter(l => l.stage === LeadStage.CLOSED_LOST).length,
        active: leads.filter(l => 
          l.stage !== LeadStage.CLOSED_WON && l.stage !== LeadStage.CLOSED_LOST
        ).length,
        totalValue: leads.reduce((sum, l) => sum + l.value, 0),
      },
      tasks: {
        total: tasks.length,
        completed: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
        pending: tasks.filter(t => t.status === TaskStatus.PENDING).length,
        inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
        overdue: tasks.filter(t => 
          t.status !== TaskStatus.COMPLETED && 
          t.status !== TaskStatus.CANCELLED && 
          new Date(t.dueDate) < new Date()
        ).length,
      },
    }

    return HttpResponse.json({
      success: true,
      data: stats,
      message: 'Statistics retrieved successfully',
    })
  }),

  // POST /api/reset - Reset data to initial state
  http.post('/api/reset', async () => {
    await simulateDelay(500, 1000)
    
    storage.clearAll()
    storage.initializeWithMockData(mockData)

    return HttpResponse.json({
      success: true,
      message: 'Data reset successfully',
    })
  }),

  // GET /api/export - Export all data
  http.get('/api/export', async () => {
    await simulateDelay(300, 800)
    
    const data = storage.exportData()

    return HttpResponse.json({
      success: true,
      data,
      message: 'Data exported successfully',
    })
  }),

  // POST /api/import - Import data
  http.post('/api/import', async ({ request }) => {
    await simulateDelay(500, 1200)
    
    const data = await request.json()
    storage.importData(data)

    return HttpResponse.json({
      success: true,
      message: 'Data imported successfully',
    })
  }),
]
