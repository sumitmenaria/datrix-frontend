import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { FileText, Plus, Search, Filter, Edit, Eye, Download, Calendar } from "lucide-react";

const policyCategories = [
  { name: 'Security', count: 24, color: 'bg-blue-100 text-blue-800' },
  { name: 'HR', count: 18, color: 'bg-green-100 text-green-800' },
  { name: 'Finance', count: 15, color: 'bg-purple-100 text-purple-800' },
  { name: 'Operations', count: 12, color: 'bg-orange-100 text-orange-800' },
  { name: 'Legal', count: 8, color: 'bg-red-100 text-red-800' },
];

const policies = [
  {
    id: '1',
    title: 'Information Security Policy',
    category: 'Security',
    version: '2.1',
    status: 'Active',
    owner: 'John Smith',
    lastReview: '2024-01-15',
    nextReview: '2024-07-15',
    approver: 'CISO',
    description: 'Comprehensive information security guidelines and procedures'
  },
  {
    id: '2',
    title: 'Remote Work Policy',
    category: 'HR',
    version: '1.3',
    status: 'Active',
    owner: 'Sarah Johnson',
    lastReview: '2024-01-10',
    nextReview: '2024-04-10',
    approver: 'HR Director',
    description: 'Guidelines for remote work arrangements and security requirements'
  },
  {
    id: '3',
    title: 'Data Retention Policy',
    category: 'Legal',
    version: '1.0',
    status: 'Draft',
    owner: 'Mike Davis',
    lastReview: '2024-01-20',
    nextReview: '2024-03-20',
    approver: 'Legal Counsel',
    description: 'Data retention schedules and disposal procedures'
  },
  {
    id: '4',
    title: 'Expense Reimbursement Policy',
    category: 'Finance',
    version: '3.2',
    status: 'Active',
    owner: 'Lisa Chen',
    lastReview: '2024-01-05',
    nextReview: '2024-06-05',
    approver: 'CFO',
    description: 'Employee expense reporting and reimbursement procedures'
  },
  {
    id: '5',
    title: 'Incident Response Policy',
    category: 'Security',
    version: '2.0',
    status: 'Under Review',
    owner: 'Alex Rodriguez',
    lastReview: '2024-01-12',
    nextReview: '2024-05-12',
    approver: 'CISO',
    description: 'Security incident response procedures and escalation matrix'
  }
];

const recentActivities = [
  {
    action: 'Policy Updated',
    policy: 'Information Security Policy',
    user: 'John Smith',
    timestamp: '2 hours ago'
  },
  {
    action: 'Review Completed',
    policy: 'Remote Work Policy',
    user: 'Sarah Johnson',
    timestamp: '1 day ago'
  },
  {
    action: 'Policy Created',
    policy: 'Data Retention Policy',
    user: 'Mike Davis',
    timestamp: '3 days ago'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Draft':
      return 'bg-gray-100 text-gray-800';
    case 'Under Review':
      return 'bg-yellow-100 text-yellow-800';
    case 'Expired':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function PolicyManagement() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Policy Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and track organizational policies
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Policy
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">142</div>
            <p className="text-muted-foreground">91% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <p className="text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Due for Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Categories</CardTitle>
          <CardDescription>Policies organized by functional area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {policyCategories.map((category) => (
              <div key={category.name} className="text-center">
                <Badge className={`${category.color} px-3 py-1 mb-2`}>
                  {category.name}
                </Badge>
                <div className="text-2xl font-bold">{category.count}</div>
                <p className="text-sm text-muted-foreground">policies</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Library</CardTitle>
          <CardDescription>Search and manage all organizational policies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search policies..." className="pl-10" />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{policy.title}</div>
                      <div className="text-sm text-muted-foreground">{policy.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{policy.category}</Badge>
                  </TableCell>
                  <TableCell>{policy.version}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(policy.status)}>
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.owner}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {policy.nextReview}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest policy management activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}: {activity.policy}</p>
                  <p className="text-sm text-muted-foreground">
                    by {activity.user} • {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}