'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, User, Target, CheckCircle } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'deal',
    message: 'New deal created: Enterprise Software License',
    time: '2 hours ago',
    icon: Target,
    color: 'text-blue-600',
  },
  {
    id: 2,
    type: 'customer',
    message: 'New customer added: Jane Smith',
    time: '4 hours ago',
    icon: User,
    color: 'text-green-600',
  },
  {
    id: 3,
    type: 'task',
    message: 'Task completed: Follow up with John Doe',
    time: '6 hours ago',
    icon: CheckCircle,
    color: 'text-purple-600',
  },
  {
    id: 4,
    type: 'deal',
    message: 'Deal updated: Proposal sent to Tech Corp',
    time: '1 day ago',
    icon: Target,
    color: 'text-blue-600',
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`mt-1 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
