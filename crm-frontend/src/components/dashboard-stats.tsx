'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats as DashboardStatsType } from '@/lib/types'
import { Users, Target, DollarSign, TrendingUp } from 'lucide-react'

interface DashboardStatsProps {
  stats?: DashboardStatsType
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  // Default values if stats is undefined
  const defaultStats = {
    totalCustomers: 0,
    totalLeads: 0,
    totalDeals: 0,
    totalRevenue: 0,
    activeDeals: 0,
    conversionRate: 0,
    averageDealSize: 0,
    monthlyGrowth: 0,
    topPerformingUsers: [],
    recentActivities: [],
  }

  const safeStats = stats || defaultStats

  const statCards = [
    {
      title: 'Total Customers',
      value: safeStats.totalCustomers.toLocaleString(),
      icon: Users,
      description: 'Active customers in the system',
      color: 'text-blue-600',
    },
    {
      title: 'Total Leads',
      value: safeStats.totalLeads.toLocaleString(),
      icon: Target,
      description: 'Leads in the pipeline',
      color: 'text-green-600',
    },
    {
      title: 'Active Deals',
      value: safeStats.activeDeals.toLocaleString(),
      icon: TrendingUp,
      description: 'Deals in progress',
      color: 'text-emerald-600',
    },
    {
      title: 'Total Revenue',
      value: `$${safeStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Revenue generated this year',
      color: 'text-purple-600',
    },
    {
      title: 'Conversion Rate',
      value: `${safeStats.conversionRate}%`,
      icon: TrendingUp,
      description: 'Lead to customer conversion',
      color: 'text-orange-600',
    },
    {
      title: 'Monthly Growth',
      value: `${safeStats.monthlyGrowth}%`,
      icon: TrendingUp,
      description: 'Revenue growth this month',
      color: 'text-indigo-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
