import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Shield, AlertTriangle, CheckCircle, Eye, Settings, Plus, Filter, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const securityMetrics = [
  { name: 'Identity & Access', implemented: 45, total: 50, percentage: 90 },
  { name: 'Data Protection', implemented: 38, total: 42, percentage: 90 },
  { name: 'Network Security', implemented: 28, total: 35, percentage: 80 },
  { name: 'Endpoint Security', implemented: 32, total: 38, percentage: 84 },
  { name: 'Incident Response', implemented: 15, total: 18, percentage: 83 }
];

const vulnerabilities = [
  { severity: 'Critical', count: 3, color: '#dc2626' },
  { severity: 'High', count: 12, color: '#f97316' },
  { severity: 'Medium', count: 28, color: '#f59e0b' },
  { severity: 'Low', count: 45, color: '#22c55e' }
];

const securityTrends = [
  { month: 'Jan', incidents: 12, resolved: 11 },
  { month: 'Feb', incidents: 8, resolved: 9 },
  { month: 'Mar', incidents: 15, resolved: 13 },
  { month: 'Apr', incidents: 6, resolved: 8 },
  { month: 'May', incidents: 9, resolved: 10 },
  { month: 'Jun', incidents: 4, resolved: 6 }
];

const securityControls = [
  {
    id: '1',
    control: 'Multi-Factor Authentication',
    category: 'Identity & Access',
    status: 'Implemented',
    effectiveness: 95,
    lastTested: '2024-01-15',
    owner: 'IT Security',
    description: 'MFA required for all privileged accounts'
  },
  {
    id: '2',
    control: 'Data Encryption at Rest',
    category: 'Data Protection',
    status: 'Implemented',
    effectiveness: 98,
    lastTested: '2024-01-10',
    owner: 'Data Team',
    description: 'AES-256 encryption for all sensitive data'
  },
  {
    id: '3',
    control: 'Network Segmentation',
    category: 'Network Security',
    status: 'Partial',
    effectiveness: 75,
    lastTested: '2024-01-20',
    owner: 'Network Team',
    description: 'VLAN segmentation for critical systems'
  },
  {
    id: '4',
    control: 'Endpoint Detection & Response',
    category: 'Endpoint Security',
    status: 'Implemented',
    effectiveness: 88,
    lastTested: '2024-01-05',
    owner: 'Security Operations',
    description: 'EDR deployed across all endpoints'
  },
  {
    id: '5',
    control: 'Security Awareness Training',
    category: 'Human Factors',
    status: 'In Progress',
    effectiveness: 70,
    lastTested: '2024-01-12',
    owner: 'HR & Security',
    description: 'Quarterly security training program'
  }
];

const recentIncidents = [
  {
    id: '1',
    title: 'Phishing Attack Detected',
    severity: 'Medium',
    status: 'Resolved',
    detected: '2024-01-18',
    resolved: '2024-01-18',
    impact: 'Low'
  },
  {
    id: '2',
    title: 'Malware on Endpoint',
    severity: 'High',
    status: 'Investigating',
    detected: '2024-01-17',
    resolved: null,
    impact: 'Medium'
  },
  {
    id: '3',
    title: 'Unauthorized Access Attempt',
    severity: 'Critical',
    status: 'Resolved',
    detected: '2024-01-16',
    resolved: '2024-01-16',
    impact: 'High'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Implemented':
      return 'bg-green-100 text-green-800';
    case 'Partial':
      return 'bg-yellow-100 text-yellow-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Not Implemented':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'Critical':
      return 'bg-red-100 text-red-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function Security() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Security Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage organizational security posture
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Control
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Security Score</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">86%</span>
                <Badge variant="secondary" className="text-green-600">+3%</Badge>
              </div>
              <Progress value={86} className="w-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">88</div>
            <p className="text-muted-foreground">3 critical, 12 high</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Security Controls</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">158/183</div>
            <p className="text-muted-foreground">86% implemented</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Incidents (30d)</CardTitle>
            <Activity className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-muted-foreground">All resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Controls Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Security Controls Implementation</CardTitle>
          <CardDescription>Implementation status by security domain</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={securityMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="implemented" fill="#22c55e" name="Implemented" />
              <Bar dataKey="total" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Distribution</CardTitle>
            <CardDescription>Current vulnerabilities by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={vulnerabilities}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ severity, count }) => `${severity}: ${count}`}
                >
                  {vulnerabilities.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Incidents Trend</CardTitle>
            <CardDescription>Monthly incidents vs resolution rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={securityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} name="Incidents" />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Security Controls Table */}
      <Card>
        <CardHeader>
          <CardTitle>Security Controls</CardTitle>
          <CardDescription>Overview of implemented security controls</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Control</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Effectiveness</TableHead>
                <TableHead>Last Tested</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityControls.map((control) => (
                <TableRow key={control.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{control.control}</div>
                      <div className="text-sm text-muted-foreground">{control.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{control.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(control.status)}>
                      {control.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{control.effectiveness}%</span>
                      <Progress value={control.effectiveness} className="w-16" />
                    </div>
                  </TableCell>
                  <TableCell>{control.lastTested}</TableCell>
                  <TableCell>{control.owner}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Incidents</CardTitle>
          <CardDescription>Latest security incidents and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Detected</TableHead>
                <TableHead>Resolved</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.title}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.detected}</TableCell>
                  <TableCell>{incident.resolved || 'In Progress'}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(incident.impact)}>
                      {incident.impact}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}