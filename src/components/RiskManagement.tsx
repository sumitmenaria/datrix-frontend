import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AlertTriangle, TrendingUp, Shield, Plus, Filter, Eye, Edit } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";

const riskMetrics = [
  { category: 'Operational', low: 12, medium: 8, high: 4, critical: 1 },
  { category: 'Financial', low: 15, medium: 6, high: 3, critical: 2 },
  { category: 'Strategic', low: 8, medium: 5, high: 2, critical: 1 },
  { category: 'Compliance', low: 18, medium: 4, high: 2, critical: 0 },
  { category: 'Technology', low: 10, medium: 7, high: 5, critical: 2 },
];

const riskMatrix = [
  { probability: 1, impact: 1, count: 5, label: 'Low' },
  { probability: 2, impact: 1, count: 8, label: 'Low' },
  { probability: 3, impact: 1, count: 12, label: 'Medium' },
  { probability: 4, impact: 1, count: 6, label: 'Medium' },
  { probability: 5, impact: 1, count: 3, label: 'High' },
  { probability: 1, impact: 2, count: 4, label: 'Low' },
  { probability: 2, impact: 2, count: 7, label: 'Medium' },
  { probability: 3, impact: 2, count: 10, label: 'Medium' },
  { probability: 4, impact: 2, count: 8, label: 'High' },
  { probability: 5, impact: 2, count: 5, label: 'High' },
  { probability: 1, impact: 3, count: 2, label: 'Medium' },
  { probability: 2, impact: 3, count: 5, label: 'Medium' },
  { probability: 3, impact: 3, count: 7, label: 'High' },
  { probability: 4, impact: 3, count: 4, label: 'High' },
  { probability: 5, impact: 3, count: 3, label: 'Critical' },
  { probability: 1, impact: 4, count: 1, label: 'Medium' },
  { probability: 2, impact: 4, count: 3, label: 'High' },
  { probability: 3, impact: 4, count: 2, label: 'High' },
  { probability: 4, impact: 4, count: 2, label: 'Critical' },
  { probability: 5, impact: 4, count: 1, label: 'Critical' },
  { probability: 1, impact: 5, count: 0, label: 'High' },
  { probability: 2, impact: 5, count: 1, label: 'High' },
  { probability: 3, impact: 5, count: 1, label: 'Critical' },
  { probability: 4, impact: 5, count: 1, label: 'Critical' },
  { probability: 5, impact: 5, count: 1, label: 'Critical' },
];

const topRisks = [
  {
    id: '1',
    title: 'Data Breach',
    category: 'Technology',
    probability: 'Medium',
    impact: 'High',
    riskLevel: 'High',
    owner: 'CISO',
    status: 'Open',
    lastReview: '2024-01-15',
    mitigation: 'Enhanced security controls, regular penetration testing'
  },
  {
    id: '2',
    title: 'Supply Chain Disruption',
    category: 'Operational',
    probability: 'High',
    impact: 'High',
    riskLevel: 'Critical',
    owner: 'COO',
    status: 'In Progress',
    lastReview: '2024-01-10',
    mitigation: 'Diversify suppliers, implement backup logistics'
  },
  {
    id: '3',
    title: 'Regulatory Non-Compliance',
    category: 'Compliance',
    probability: 'Low',
    impact: 'High',
    riskLevel: 'Medium',
    owner: 'Chief Compliance Officer',
    status: 'Monitored',
    lastReview: '2024-01-20',
    mitigation: 'Regular compliance audits, staff training'
  },
  {
    id: '4',
    title: 'Key Personnel Loss',
    category: 'Strategic',
    probability: 'Medium',
    impact: 'Medium',
    riskLevel: 'Medium',
    owner: 'CHRO',
    status: 'Open',
    lastReview: '2024-01-05',
    mitigation: 'Succession planning, retention programs'
  },
  {
    id: '5',
    title: 'Market Volatility',
    category: 'Financial',
    probability: 'High',
    impact: 'Medium',
    riskLevel: 'High',
    owner: 'CFO',
    status: 'Open',
    lastReview: '2024-01-12',
    mitigation: 'Diversified portfolio, hedging strategies'
  }
];

function getRiskLevelColor(level: string) {
  switch (level) {
    case 'Low':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Critical':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Open':
      return 'bg-red-100 text-red-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Monitored':
      return 'bg-blue-100 text-blue-800';
    case 'Closed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function RiskManagement() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Risk Management</h1>
          <p className="text-muted-foreground">
            Identify, assess, and mitigate organizational risks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Risk
          </Button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Critical Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">6</div>
            <p className="text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>High Risks</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">16</div>
            <p className="text-muted-foreground">Active monitoring required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Mitigated</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">43</div>
            <p className="text-muted-foreground">34% of total risks</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution by Category</CardTitle>
          <CardDescription>Risk levels across different business areas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="low" stackId="a" fill="#22c55e" name="Low" />
              <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium" />
              <Bar dataKey="high" stackId="a" fill="#f97316" name="High" />
              <Bar dataKey="critical" stackId="a" fill="#dc2626" name="Critical" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Register */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
          <CardDescription>Top risks requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topRisks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{risk.title}</div>
                      <div className="text-sm text-muted-foreground">{risk.mitigation}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{risk.category}</Badge>
                  </TableCell>
                  <TableCell>{risk.probability}</TableCell>
                  <TableCell>{risk.impact}</TableCell>
                  <TableCell>
                    <Badge className={getRiskLevelColor(risk.riskLevel)}>
                      {risk.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{risk.owner}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(risk.status)}>
                      {risk.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Heat Map */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Heat Map</CardTitle>
          <CardDescription>Visual representation of risk probability vs impact</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="probability" 
                domain={[1, 5]}
                tickCount={5}
                label={{ value: 'Probability', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="impact" 
                domain={[1, 5]}
                tickCount={5}
                label={{ value: 'Impact', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p>{`Risk Level: ${data.label}`}</p>
                        <p>{`Count: ${data.count}`}</p>
                        <p>{`Probability: ${data.probability}`}</p>
                        <p>{`Impact: ${data.impact}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                data={riskMatrix} 
                fill={(entry) => {
                  switch (entry.label) {
                    case 'Low': return '#22c55e';
                    case 'Medium': return '#f59e0b';
                    case 'High': return '#f97316';
                    case 'Critical': return '#dc2626';
                    default: return '#6b7280';
                  }
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}