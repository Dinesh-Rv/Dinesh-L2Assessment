import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardPage from '@/app/(dashboard)/dashboard/page'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('Dashboard Page', () => {
  it('renders dashboard title', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument()
  })
})
