import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CheckCircle, AlertTriangle, Clock, FileText, Plus, Filter } from "lucide-react";

const complianceFrameworks = [
  {
    id: '1',
    name: 'SOX (Sarbanes-Oxley)',
    description: 'Financial reporting and internal controls',
    score: 92,
    status: 'Compliant',
    lastAssessment: '2024-01-15',
    nextReview: '2024-07-15',
    controls: 45,
    gaps: 2
  },
  {
    id: '2',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    score: 88,
    status: 'Compliant',
    lastAssessment: '2024-01-10',
    nextReview: '2024-04-10',
    controls: 38,
    gaps: 3
  },
  {
    id: '3',
    name: 'ISO 27001',
    description: 'Information Security Management',
    score: 76,
    status: 'In Progress',
    lastAssessment: '2024-01-20',
    nextReview: '2024-06-20',
    controls: 114,
    gaps: 12
  },
  {
    id: '4',
    name: 'PCI DSS',
    description: 'Payment Card Industry Data Security',
    score: 94,
    status: 'Compliant',
    lastAssessment: '2024-01-05',
    nextReview: '2024-07-05',
    controls: 12,
    gaps: 1
  },
  {
    id: '5',
    name: 'HIPAA',
    description: 'Health Insurance Portability',
    score: 82,
    status: 'Compliant',
    lastAssessment: '2024-01-12',
    nextReview: '2024-05-12',
    controls: 24,
    gaps: 4
  }
];

const recentAssessments = [
  {
    framework: 'SOX',
    assessor: 'External Auditor',
    date: '2024-01-15',
    result: 'Pass',
    findings: 2
  },
  {
    framework: 'GDPR',
    assessor: 'Internal Team',
    date: '2024-01-10',
    result: 'Pass',
    findings: 3
  },
  {
    framework: 'ISO 27001',
    assessor: 'Third Party',
    date: '2024-01-20',
    result: 'Minor Issues',
    findings: 12
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Compliant':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Non-Compliant':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'Compliant':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'In Progress':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'Non-Compliant':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
}

export function Compliance() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Compliance Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage compliance across regulatory frameworks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Frameworks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-muted-foreground">Active frameworks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Compliant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4</div>
            <p className="text-muted-foreground">80% compliance rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-muted-foreground">ISO 27001</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">22</div>
            <p className="text-muted-foreground">Across all frameworks</p>
          </CardContent>
        </Card>
      </div>

      {/* Frameworks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Frameworks</CardTitle>
          <CardDescription>Overview of all regulatory frameworks and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Framework</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Controls</TableHead>
                <TableHead>Gaps</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceFrameworks.map((framework) => (
                <TableRow key={framework.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{framework.name}</div>
                      <div className="text-sm text-muted-foreground">{framework.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{framework.score}%</span>
                      </div>
                      <Progress value={framework.score} className="w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(framework.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(framework.status)}
                        {framework.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{framework.controls}</TableCell>
                  <TableCell>
                    <span className={framework.gaps > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                      {framework.gaps}
                    </span>
                  </TableCell>
                  <TableCell>{framework.nextReview}</TableCell>
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

      {/* Recent Assessments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
          <CardDescription>Latest compliance assessments and audits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Framework</TableHead>
                <TableHead>Assessor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAssessments.map((assessment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{assessment.framework}</TableCell>
                  <TableCell>{assessment.assessor}</TableCell>
                  <TableCell>{assessment.date}</TableCell>
                  <TableCell>
                    <Badge className={assessment.result === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {assessment.result}
                    </Badge>
                  </TableCell>
                  <TableCell>{assessment.findings}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Report
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