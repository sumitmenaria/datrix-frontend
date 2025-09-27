import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { FileText, Plus, Search, Filter, Edit, Eye, Download, Calendar, Bot, Loader2 } from "lucide-react";
import { policyApi, Policy, OrganizationUser } from '../services/policyApi';
import { API_CONFIG } from '../config/api';

function getStatusColor(status: string) {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'to_be_reviewed':
      return 'bg-yellow-100 text-yellow-800';
    case 'reviewed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'published': return 'Published';
    case 'draft': return 'Draft';
    case 'to_be_reviewed': return 'To be Reviewed';
    case 'reviewed': return 'Reviewed';
    default: return status;
  }
}

export function PolicyManagement() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [users, setUsers] = useState<OrganizationUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiForm, setAiForm] = useState({
    framework: 'PDPL' as 'PDPL' | 'NCA_ECC' | 'SAMA',
    policy_type: 'data_protection',
    owner_id: '',
    requirements: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [policiesData, usersData] = await Promise.all([
        policyApi.getPolicies(API_CONFIG.ORGANISATION_ID),
        policyApi.getOrganizationUsers(API_CONFIG.ORGANISATION_ID)
      ]);
      setPolicies(policiesData.policies);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    try {
      setIsGenerating(true);
      await policyApi.generatePolicy({
        ...aiForm,
        organization_id: API_CONFIG.ORGANISATION_ID
      });
      setShowAIDialog(false);
      setAiForm({ framework: 'PDPL', policy_type: 'data_protection', owner_id: '', requirements: '' });
      await loadData();
    } catch (error) {
      console.error('Failed to generate policy:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredPolicies = policies.filter(policy =>
    policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.framework_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    total: policies.length,
    published: policies.filter(p => p.status === 'published').length,
    to_be_reviewed: policies.filter(p => p.status === 'to_be_reviewed').length,
    draft: policies.filter(p => p.status === 'draft').length
  };

  const frameworkCounts = {
    PDPL: policies.filter(p => p.framework_type === 'PDPL').length,
    NCA_ECC: policies.filter(p => p.framework_type === 'NCA_ECC').length,
    SAMA: policies.filter(p => p.framework_type === 'SAMA').length
  };
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
          <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
            <DialogTrigger asChild>
              <Button>
                <Bot className="h-4 w-4 mr-2" />
                Generate AI Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate AI Policy</DialogTitle>
                <DialogDescription>
                  Use AI to generate a comprehensive policy document
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="framework">Framework</Label>
                  <Select value={aiForm.framework} onValueChange={(value: any) => setAiForm({...aiForm, framework: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDPL">PDPL</SelectItem>
                      <SelectItem value="NCA_ECC">NCA-ECC</SelectItem>
                      <SelectItem value="SAMA">SAMA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="policy_type">Policy Type</Label>
                  <Input
                    value={aiForm.policy_type}
                    onChange={(e) => setAiForm({...aiForm, policy_type: e.target.value})}
                    placeholder="e.g., data_protection, access_control"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Select value={aiForm.owner_id} onValueChange={(value) => setAiForm({...aiForm, owner_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.email}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    value={aiForm.requirements}
                    onChange={(e) => setAiForm({...aiForm, requirements: e.target.value})}
                    placeholder="Describe specific requirements for this policy..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateAI} disabled={isGenerating}>
                  {isGenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Generate Policy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.total}</div>
            <p className="text-muted-foreground">Across all frameworks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.published}</div>
            <p className="text-muted-foreground">Active policies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>To be Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.to_be_reviewed}</div>
            <p className="text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{statusCounts.draft}</div>
            <p className="text-muted-foreground">In development</p>
          </CardContent>
        </Card>
      </div>

      {/* Framework Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Frameworks</CardTitle>
          <CardDescription>Policies organized by compliance framework</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Badge className="bg-blue-100 text-blue-800 px-3 py-1 mb-2">
                PDPL
              </Badge>
              <div className="text-2xl font-bold">{frameworkCounts.PDPL}</div>
              <p className="text-sm text-muted-foreground">Personal Data Protection</p>
            </div>
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 px-3 py-1 mb-2">
                NCA-ECC
              </Badge>
              <div className="text-2xl font-bold">{frameworkCounts.NCA_ECC}</div>
              <p className="text-sm text-muted-foreground">Cybersecurity Controls</p>
            </div>
            <div className="text-center">
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1 mb-2">
                SAMA
              </Badge>
              <div className="text-2xl font-bold">{frameworkCounts.SAMA}</div>
              <p className="text-sm text-muted-foreground">Financial Authority</p>
            </div>
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
                <Input 
                  placeholder="Search policies..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map((policy) => (
                <TableRow key={policy.policy_id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{policy.title}</div>
                      <div className="text-sm text-muted-foreground">{policy.policy_type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{policy.framework_type}</Badge>
                  </TableCell>
                  <TableCell>{policy.version}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(policy.status)}>
                      {getStatusLabel(policy.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.owner_name || policy.owner_id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(policy.renewal_date).toLocaleDateString()}
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
    </div>
  );
}