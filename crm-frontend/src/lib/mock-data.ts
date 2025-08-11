import {
  Customer,
  Contact,
  Lead,
  Task,
  User,
  CustomerStatus,
  CustomerSource,
  InteractionType,
  LeadStage,
  TaskType,
  TaskStatus,
  TaskPriority,
  UserRole,
  Address,
} from './types'

// ============================================================================
// MOCK USERS
// ============================================================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@crm.com',
    role: UserRole.MANAGER,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    lastLoginAt: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    name: 'Michael Chen',
    email: 'michael.chen@crm.com',
    role: UserRole.SALES_REP,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    lastLoginAt: new Date('2024-01-15T09:15:00Z'),
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'user-3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@crm.com',
    role: UserRole.SALES_REP,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    lastLoginAt: new Date('2024-01-14T16:45:00Z'),
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: 'user-4',
    name: 'David Thompson',
    email: 'david.thompson@crm.com',
    role: UserRole.SUPPORT,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    lastLoginAt: new Date('2024-01-14T14:20:00Z'),
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: 'user-5',
    name: 'Lisa Wang',
    email: 'lisa.wang@crm.com',
    role: UserRole.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    lastLoginAt: new Date('2024-01-15T11:00:00Z'),
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2024-01-15'),
  },
]

// ============================================================================
// MOCK CUSTOMERS
// ============================================================================

const companyNames = [
  'TechCorp Solutions', 'Global Industries', 'Innovation Labs', 'Digital Dynamics',
  'Future Systems', 'Smart Solutions', 'Enterprise Corp', 'NextGen Technologies',
  'Cloud Computing Inc', 'Data Analytics Pro', 'AI Innovations', 'Cyber Security Plus',
  'Mobile Solutions', 'Web Development Co', 'Software Solutions', 'IT Consulting Group',
  'Digital Marketing Pro', 'E-commerce Solutions', 'FinTech Innovations', 'HealthTech Systems',
  'EdTech Platforms', 'Green Energy Corp', 'Manufacturing Plus', 'Retail Solutions',
  'Hospitality Tech', 'Real Estate Pro', 'Legal Tech Solutions', 'Media Productions',
  'Gaming Studios', 'Fitness Tech', 'Food Delivery Pro', 'Travel Solutions',
  'Insurance Tech', 'Banking Solutions', 'Telecom Innovations', 'Automotive Tech',
  'Aerospace Systems', 'Defense Technologies', 'Pharmaceutical Corp', 'Biotech Solutions',
  'Chemical Industries', 'Mining Technologies', 'Oil & Gas Solutions', 'Renewable Energy',
  'Construction Tech', 'Architecture Pro', 'Design Studios', 'Creative Agencies',
  'Consulting Firms', 'Research Labs'
]

const customerNames = [
  'Alice Johnson', 'Bob Wilson', 'Carol Brown', 'David Miller', 'Eva Garcia',
  'Frank Davis', 'Grace Lee', 'Henry Taylor', 'Ivy Chen', 'Jack Anderson',
  'Kate Martinez', 'Liam O\'Connor', 'Maya Patel', 'Noah Thompson', 'Olivia White',
  'Paul Rodriguez', 'Quinn Johnson', 'Rachel Smith', 'Sam Wilson', 'Tina Davis',
  'Uma Patel', 'Victor Chen', 'Wendy Brown', 'Xavier Garcia', 'Yuki Tanaka',
  'Zoe Anderson', 'Adam Lee', 'Beth Taylor', 'Carl Martinez', 'Diana White',
  'Eric Johnson', 'Fiona Smith', 'George Wilson', 'Helen Davis', 'Ian Brown',
  'Julia Garcia', 'Kevin Lee', 'Laura Taylor', 'Mark Chen', 'Nina Patel',
  'Oscar White', 'Penny Johnson', 'Quentin Smith', 'Rita Wilson', 'Steve Davis',
  'Tracy Brown', 'Ulysses Garcia', 'Vera Lee', 'Walter Taylor', 'Xena Martinez',
  'Yves White', 'Zara Johnson'
]

const cities = [
  { city: 'New York', state: 'NY', zipCode: '10001' },
  { city: 'San Francisco', state: 'CA', zipCode: '94105' },
  { city: 'Chicago', state: 'IL', zipCode: '60601' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90001' },
  { city: 'Boston', state: 'MA', zipCode: '02101' },
  { city: 'Seattle', state: 'WA', zipCode: '98101' },
  { city: 'Austin', state: 'TX', zipCode: '73301' },
  { city: 'Denver', state: 'CO', zipCode: '80201' },
  { city: 'Atlanta', state: 'GA', zipCode: '30301' },
  { city: 'Miami', state: 'FL', zipCode: '33101' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85001' },
  { city: 'Philadelphia', state: 'PA', zipCode: '19101' },
  { city: 'Houston', state: 'TX', zipCode: '77001' },
  { city: 'Portland', state: 'OR', zipCode: '97201' },
  { city: 'Nashville', state: 'TN', zipCode: '37201' },
  { city: 'Las Vegas', state: 'NV', zipCode: '89101' },
  { city: 'Minneapolis', state: 'MN', zipCode: '55401' },
  { city: 'Detroit', state: 'MI', zipCode: '48201' },
  { city: 'Cleveland', state: 'OH', zipCode: '44101' }
]

const streets = [
  '123 Innovation Drive', '456 Business Boulevard', '789 Technology Way',
  '321 Corporate Center', '654 Enterprise Avenue', '987 Digital Street',
  '147 Smart Plaza', '258 Future Lane', '369 Progress Road', '741 Success Street',
  '852 Growth Avenue', '963 Development Drive', '159 Innovation Way',
  '357 Technology Boulevard', '486 Business Center', '792 Corporate Lane',
  '135 Enterprise Drive', '468 Digital Avenue', '791 Smart Street', '246 Future Road'
]

export const mockCustomers: Customer[] = Array.from({ length: 50 }, (_, index) => {
  const cityData = cities[index % cities.length]
  const street = streets[index % streets.length]
  const companyName = companyNames[index % companyNames.length]
  const customerName = customerNames[index % customerNames.length]
  const assignedUser = mockUsers[index % mockUsers.length].id
  
  // Create varied status distribution
  const statusOptions = [CustomerStatus.ACTIVE, CustomerStatus.PROSPECT, CustomerStatus.INACTIVE]
  const status = statusOptions[index % 3]
  
  // Create varied source distribution
  const sourceOptions = [
    CustomerSource.WEBSITE, CustomerSource.REFERRAL, CustomerSource.COLD_CALL,
    CustomerSource.SOCIAL_MEDIA, CustomerSource.TRADE_SHOW, CustomerSource.ADVERTISING
  ]
  const source = sourceOptions[index % sourceOptions.length]
  
  // Create varied tags
  const tagOptions = [
    ['enterprise', 'tech'], ['startup', 'saas'], ['manufacturing', 'enterprise'],
    ['healthcare', 'enterprise'], ['finance', 'enterprise'], ['retail', 'mid-market'],
    ['education', 'startup'], ['government', 'enterprise'], ['non-profit', 'small'],
    ['consulting', 'mid-market'], ['real-estate', 'small'], ['hospitality', 'mid-market'],
    ['automotive', 'enterprise'], ['aerospace', 'enterprise'], ['energy', 'enterprise']
  ]
  const tags = tagOptions[index % tagOptions.length]
  
  const address: Address = {
    street: `${street} ${Math.floor(Math.random() * 9999) + 1}`,
    city: cityData.city,
    state: cityData.state,
    zipCode: cityData.zipCode,
    country: 'USA',
  }
  
  return {
    id: `customer-${index + 1}`,
    name: customerName,
    email: `${customerName.toLowerCase().replace(' ', '.')}@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    company: companyName,
    address,
    status,
    source,
    assignedTo: assignedUser,
    tags,
    notes: index % 5 === 0 ? `Special notes for ${customerName}: Interested in enterprise solutions. Budget available for Q2.` : undefined,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last month
  }
})

// ============================================================================
// MOCK CONTACTS/INTERACTIONS
// ============================================================================

const interactionSubjects = [
  'Initial Discovery Call', 'Product Demo', 'Follow-up Meeting', 'Proposal Discussion',
  'Contract Negotiation', 'Implementation Planning', 'Training Session', 'Support Call',
  'Feature Request Discussion', 'Account Review', 'Renewal Discussion', 'Upsell Opportunity',
  'Technical Consultation', 'Pricing Discussion', 'Timeline Planning', 'Requirements Gathering',
  'Solution Design', 'Integration Planning', 'Go-live Preparation', 'Post-implementation Review'
]

const interactionOutcomes = [
  'Scheduled follow-up demo', 'Proposal sent', 'Contract signed', 'Implementation started',
  'Training completed', 'Issue resolved', 'Feature request logged', 'Account renewed',
  'Upsell opportunity identified', 'Technical solution provided', 'Pricing agreed', 'Timeline confirmed',
  'Requirements documented', 'Solution designed', 'Integration planned', 'Go-live scheduled',
  'Review completed', 'Next steps defined', 'Decision pending', 'No further action needed'
]

export const mockContacts: Contact[] = Array.from({ length: 200 }, (_, index) => {
  const customerId = `customer-${Math.floor(Math.random() * 50) + 1}`
  const createdBy = mockUsers[Math.floor(Math.random() * mockUsers.length)].id
  
  const typeOptions = [
    InteractionType.CALL, InteractionType.EMAIL, InteractionType.MEETING,
    InteractionType.NOTE, InteractionType.TEXT, InteractionType.VIDEO_CALL
  ]
  const type = typeOptions[index % typeOptions.length]
  
  const subject = interactionSubjects[index % interactionSubjects.length]
  const outcome = interactionOutcomes[index % interactionOutcomes.length]
  
  // Create varied duration for calls and meetings
  const duration = type === InteractionType.CALL || type === InteractionType.MEETING || type === InteractionType.VIDEO_CALL
    ? Math.floor(Math.random() * 120) + 15 // 15-135 minutes
    : undefined
  
  return {
    id: `contact-${index + 1}`,
    customerId,
    type,
    subject,
    description: `${type} with customer regarding ${subject.toLowerCase()}. ${outcome}.`,
    outcome,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
    duration,
    createdBy,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  }
})

// ============================================================================
// MOCK LEADS/PIPELINE
// ============================================================================

const leadTitles = [
  'Enterprise Software License', 'Cloud Migration Project', 'Digital Transformation',
  'CRM Implementation', 'Data Analytics Platform', 'AI/ML Solution', 'Cybersecurity Package',
  'Mobile App Development', 'E-commerce Platform', 'API Integration', 'DevOps Automation',
  'Business Intelligence', 'Customer Experience Platform', 'Supply Chain Management',
  'Human Resources System', 'Financial Management', 'Marketing Automation', 'Sales Enablement',
  'Customer Support System', 'Project Management', 'Inventory Management', 'Quality Assurance',
  'Compliance Management', 'Risk Management', 'Performance Monitoring', 'Backup & Recovery',
  'Network Infrastructure', 'Database Migration', 'Legacy System Modernization', 'Multi-cloud Strategy'
]

const leadDescriptions = [
  'Comprehensive enterprise solution for large organizations',
  'Cloud migration and optimization services',
  'End-to-end digital transformation initiative',
  'Customer relationship management implementation',
  'Advanced data analytics and reporting platform',
  'Artificial intelligence and machine learning solutions',
  'Comprehensive cybersecurity and compliance package',
  'Custom mobile application development',
  'E-commerce platform with advanced features',
  'API integration and development services',
  'DevOps automation and CI/CD pipeline',
  'Business intelligence and reporting solution',
  'Customer experience and engagement platform',
  'Supply chain and logistics management system',
  'Human resources and talent management platform',
  'Financial management and accounting system',
  'Marketing automation and campaign management',
  'Sales enablement and performance tracking',
  'Customer support and service management',
  'Project management and collaboration platform'
]

export const mockLeads: Lead[] = Array.from({ length: 30 }, (_, index) => {
  const customerId = `customer-${Math.floor(Math.random() * 50) + 1}`
  const assignedTo = mockUsers[Math.floor(Math.random() * mockUsers.length)].id
  
  const stageOptions = [
    LeadStage.LEAD, LeadStage.QUALIFIED, LeadStage.PROPOSAL,
    LeadStage.NEGOTIATION, LeadStage.CLOSED_WON, LeadStage.CLOSED_LOST
  ]
  const stage = stageOptions[index % stageOptions.length]
  
  const title = leadTitles[index % leadTitles.length]
  const description = leadDescriptions[index % leadDescriptions.length]
  
  // Create realistic values based on stage
  const baseValue = Math.floor(Math.random() * 500000) + 50000 // $50k - $550k
  const value = stage === LeadStage.CLOSED_WON ? baseValue : baseValue * (0.7 + Math.random() * 0.3)
  
  // Create realistic probabilities based on stage
  const probabilityMap = {
    [LeadStage.LEAD]: 10,
    [LeadStage.QUALIFIED]: 25,
    [LeadStage.PROPOSAL]: 50,
    [LeadStage.NEGOTIATION]: 75,
    [LeadStage.CLOSED_WON]: 100,
    [LeadStage.CLOSED_LOST]: 0,
  }
  const probability = probabilityMap[stage]
  
  const expectedCloseDate = stage === LeadStage.CLOSED_WON || stage === LeadStage.CLOSED_LOST
    ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Past date for closed deals
    : new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000) // Future date for open deals
  
  const actualCloseDate = stage === LeadStage.CLOSED_WON || stage === LeadStage.CLOSED_LOST
    ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    : undefined
  
  return {
    id: `lead-${index + 1}`,
    customerId,
    title,
    description,
    stage,
    value: Math.round(value),
    probability,
    expectedCloseDate,
    actualCloseDate,
    assignedTo,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  }
})

// ============================================================================
// MOCK TASKS
// ============================================================================

const taskTitles = [
  'Follow up on proposal', 'Schedule demo session', 'Prepare contract documents',
  'Conduct discovery call', 'Send pricing information', 'Arrange technical review',
  'Complete implementation plan', 'Coordinate training session', 'Review requirements',
  'Update project timeline', 'Conduct user training', 'Monitor implementation',
  'Gather feedback', 'Address technical issues', 'Prepare presentation',
  'Coordinate with stakeholders', 'Review deliverables', 'Conduct testing',
  'Update documentation', 'Plan next phase', 'Conduct performance review',
  'Address security concerns', 'Optimize solution', 'Integrate with existing systems',
  'Conduct data migration', 'Set up monitoring', 'Configure integrations',
  'Train support team', 'Conduct go-live preparation', 'Post-implementation review'
]

const taskDescriptions = [
  'Follow up with customer regarding the proposal sent last week',
  'Schedule and prepare for product demonstration session',
  'Prepare and review contract documents for customer approval',
  'Conduct initial discovery call to understand customer needs',
  'Send detailed pricing information and options',
  'Arrange technical review with customer IT team',
  'Complete implementation plan and timeline',
  'Coordinate and conduct user training sessions',
  'Review and finalize project requirements',
  'Update project timeline based on latest developments',
  'Conduct comprehensive user training program',
  'Monitor implementation progress and address issues',
  'Gather feedback from users and stakeholders',
  'Address and resolve technical issues',
  'Prepare presentation for executive review',
  'Coordinate with all project stakeholders',
  'Review project deliverables and quality',
  'Conduct thorough testing of the solution',
  'Update project documentation and procedures',
  'Plan and prepare for next project phase',
  'Conduct performance review and optimization',
  'Address security concerns and compliance requirements',
  'Optimize solution for better performance',
  'Integrate solution with existing customer systems',
  'Conduct data migration and validation',
  'Set up monitoring and alerting systems',
  'Configure integrations with third-party systems',
  'Train customer support team on new system',
  'Conduct go-live preparation and testing',
  'Conduct post-implementation review and lessons learned'
]

export const mockTasks: Task[] = Array.from({ length: 100 }, (_, index) => {
  const customerId = `customer-${Math.floor(Math.random() * 50) + 1}`
  const leadId = Math.random() > 0.3 ? `lead-${Math.floor(Math.random() * 30) + 1}` : undefined
  const assignedTo = mockUsers[Math.floor(Math.random() * mockUsers.length)].id
  const createdBy = mockUsers[Math.floor(Math.random() * mockUsers.length)].id
  
  const typeOptions = [
    TaskType.CALL, TaskType.EMAIL, TaskType.MEETING, TaskType.FOLLOW_UP,
    TaskType.DEMO, TaskType.PROPOSAL, TaskType.CONTRACT
  ]
  const type = typeOptions[index % typeOptions.length]
  
  const statusOptions = [
    TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED, TaskStatus.CANCELLED
  ]
  const status = statusOptions[index % statusOptions.length]
  
  const priorityOptions = [
    TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH, TaskPriority.URGENT
  ]
  const priority = priorityOptions[index % priorityOptions.length]
  
  const title = taskTitles[index % taskTitles.length]
  const description = taskDescriptions[index % taskDescriptions.length]
  
  const dueDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) // Within next 30 days
  
  const completedAt = status === TaskStatus.COMPLETED
    ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Completed within last week
    : undefined
  
  return {
    id: `task-${index + 1}`,
    customerId,
    leadId,
    title,
    description,
    type,
    status,
    priority,
    dueDate,
    completedAt,
    assignedTo,
    createdBy,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  }
})

// ============================================================================
// EXPORT ALL MOCK DATA
// ============================================================================

export const mockData = {
  users: mockUsers,
  customers: mockCustomers,
  contacts: mockContacts,
  leads: mockLeads,
  tasks: mockTasks,
}

// ============================================================================
// UTILITY FUNCTIONS FOR MOCK DATA
// ============================================================================

export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.id === id)
}

export const getContactsByCustomerId = (customerId: string): Contact[] => {
  return mockContacts.filter(contact => contact.customerId === customerId)
}

export const getLeadsByCustomerId = (customerId: string): Lead[] => {
  return mockLeads.filter(lead => lead.customerId === customerId)
}

export const getTasksByCustomerId = (customerId: string): Task[] => {
  return mockTasks.filter(task => task.customerId === customerId)
}

export const getTasksByLeadId = (leadId: string): Task[] => {
  return mockTasks.filter(task => task.leadId === leadId)
}

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id)
}

export const getCustomersByAssignee = (userId: string): Customer[] => {
  return mockCustomers.filter(customer => customer.assignedTo === userId)
}

export const getLeadsByAssignee = (userId: string): Lead[] => {
  return mockLeads.filter(lead => lead.assignedTo === userId)
}

export const getTasksByAssignee = (userId: string): Task[] => {
  return mockTasks.filter(task => task.assignedTo === userId)
}
