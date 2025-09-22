import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Users, BookOpen, Award, Plus, Filter, Eye, Play, CheckCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const trainingMetrics = [
  { department: 'IT', completed: 42, total: 45, percentage: 93 },
  { department: 'Finance', completed: 28, total: 32, percentage: 88 },
  { department: 'HR', completed: 18, total: 20, percentage: 90 },
  { department: 'Sales', completed: 35, total: 40, percentage: 88 },
  { department: 'Operations', completed: 25, total: 30, percentage: 83 }
];

const trainingProgress = [
  { month: 'Jan', completion: 78, target: 85 },
  { month: 'Feb', completion: 82, target: 85 },
  { month: 'Mar', completion: 85, target: 85 },
  { month: 'Apr', completion: 88, target: 85 },
  { month: 'May', completion: 91, target: 85 },
  { month: 'Jun', completion: 94, target: 85 }
];

const trainingCategories = [
  { name: 'Security Awareness', count: 45, color: '#3b82f6' },
  { name: 'Compliance', count: 32, color: '#10b981' },
  { name: 'Privacy', count: 28, color: '#f59e0b' },
  { name: 'Risk Management', count: 18, color: '#ef4444' },
  { name: 'Ethics', count: 12, color: '#8b5cf6' }
];

const trainingPrograms = [
  {
    id: '1',
    title: 'Cybersecurity Fundamentals',
    category: 'Security Awareness',
    duration: '45 min',
    status: 'Active',
    enrolled: 156,
    completed: 142,
    completionRate: 91,
    dueDate: '2024-03-15',
    description: 'Essential cybersecurity awareness for all employees'
  },
  {
    id: '2',
    title: 'GDPR Compliance Training',
    category: 'Compliance',
    duration: '30 min',
    status: 'Active',
    enrolled: 89,
    completed: 78,
    completionRate: 88,
    dueDate: '2024-02-28',
    description: 'Data protection and privacy requirements under GDPR'
  },
  {
    id: '3',
    title: 'Phishing Awareness',
    category: 'Security Awareness',
    duration: '20 min',
    status: 'Active',
    enrolled: 203,
    completed: 189,
    completionRate: 93,
    dueDate: '2024-04-01',
    description: 'Identifying and responding to phishing attacks'
  },
  {
    id: '4',
    title: 'Code of Ethics',
    category: 'Ethics',
    duration: '25 min',
    status: 'Draft',
    enrolled: 0,
    completed: 0,
    completionRate: 0,
    dueDate: '2024-05-01',
    description: 'Company values and ethical business practices'
  },
  {
    id: '5',
    title: 'Risk Assessment Basics',
    category: 'Risk Management',
    duration: '35 min',
    status: 'Active',
    enrolled: 67,
    completed: 55,
    completionRate: 82,
    dueDate: '2024-03-30',
    description: 'Introduction to organizational risk assessment'
  }
];

const recentActivities = [
  {
    user: 'Sarah Johnson',
    action: 'Completed',
    training: 'Cybersecurity Fundamentals',
    score: 95,
    timestamp: '2 hours ago'
  },
  {
    user: 'Mike Davis',
    action: 'Started',
    training: 'GDPR Compliance Training',
    score: null,
    timestamp: '4 hours ago'
  },
  {
    user: 'Lisa Chen',
    action: 'Completed',
    training: 'Phishing Awareness',
    score: 88,
    timestamp: '1 day ago'
  },
  {
    user: 'Alex Rodriguez',
    action: 'Completed',
    training: 'Risk Assessment Basics',
    score: 92,
    timestamp: '2 days ago'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Draft':
      return 'bg-gray-100 text-gray-800';
    case 'Archived':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function Training() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Training Management</h1>
          <p className="text-muted-foreground">
            Manage and track security and compliance training programs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Program
          </Button>
        </div>
      </div>

      {/* Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Overall Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">94%</span>
                <Badge variant="secondary" className="text-green-600">+2%</Badge>
              </div>
              <Progress value={94} className="w-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Programs</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Participants</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">287</div>
            <p className="text-muted-foreground">Across all programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Certificates Issued</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Training Progress by Department */}
      <Card>
        <CardHeader>
          <CardTitle>Training Progress by Department</CardTitle>
          <CardDescription>Completion rates across organizational departments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trainingMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#22c55e" name="Completed" />
              <Bar dataKey="total" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress Trend</CardTitle>
            <CardDescription>Training completion vs target over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trainingProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completion" stroke="#3b82f6" strokeWidth={2} name="Completion %" />
                <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training by Category</CardTitle>
            <CardDescription>Distribution of training programs by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trainingCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ name, count }) => `${name}: ${count}`}
                >
                  {trainingCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Training Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>Overview of all training programs and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{program.title}</div>
                      <div className="text-sm text-muted-foreground">{program.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.category}</Badge>
                  </TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(program.status)}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{program.completionRate}%</span>
                        <span className="text-sm text-muted-foreground">
                          ({program.completed}/{program.enrolled})
                        </span>
                      </div>
                      <Progress value={program.completionRate} className="w-20" />
                    </div>
                  </TableCell>
                  <TableCell>{program.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Training Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest training completions and enrollments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                {activity.action === 'Completed' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Clock className="h-4 w-4 text-blue-600" />
                )}
                <div className="flex-1">
                  <p className="font-medium">
                    {activity.user} {activity.action.toLowerCase()} {activity.training}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.score && `Score: ${activity.score}% • `}{activity.timestamp}
                  </p>
                </div>
                {activity.score && (
                  <Badge variant="secondary" className="text-green-600">
                    {activity.score}%
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}