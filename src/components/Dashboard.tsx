import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AlertTriangle, CheckCircle, Clock, Shield, Users, FileText, TrendingUp, Zap } from "lucide-react";
import { ModernPieChart, ModernDonutChart, ModernBarChart, ModernLineChart, AnimatedCounter } from "./ModernCharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { complianceApi } from "../services/complianceApi";
import { policyApi } from "../services/policyApi";
import { API_CONFIG } from "../config/api";

// Default data for loading states
const defaultComplianceData = [
  { name: 'SOX', score: 92, status: 'Compliant' },
  { name: 'GDPR', score: 88, status: 'Compliant' },
  { name: 'ISO 27001', score: 76, status: 'In Progress' },
  { name: 'PCI DSS', score: 94, status: 'Compliant' },
  { name: 'HIPAA', score: 82, status: 'Compliant' },
];

const defaultRiskDistribution = [
  { name: 'Low', value: 45, color: '#22c55e' },
  { name: 'Medium', value: 32, color: '#f59e0b' },
  { name: 'High', value: 18, color: '#ef4444' },
  { name: 'Critical', value: 5, color: '#dc2626' },
];

const defaultTrainingProgress = [
  { month: 'Jan', completion: 78 },
  { month: 'Feb', completion: 82 },
  { month: 'Mar', completion: 85 },
  { month: 'Apr', completion: 88 },
  { month: 'May', completion: 91 },
  { month: 'Jun', completion: 94 },
];

const defaultSecurityMetrics = [
  { name: 'Identity & Access', score: 90, color: '#667eea' },
  { name: 'Data Protection', score: 95, color: '#f093fb' },
  { name: 'Network Security', score: 85, color: '#4facfe' },
  { name: 'Endpoint Security', score: 88, color: '#43e97b' },
];

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    compliance: { total: 0, completed: 0, score: 87, loading: true },
    policies: { total: 156, pending: 12, upToDate: 98, loading: true },
    risks: { total: 23, critical: 5, medium: 18, loading: true },
    training: { completion: 94, enrolled: 287, loading: true },
    complianceData: defaultComplianceData,
    riskDistribution: defaultRiskDistribution,
    trainingProgress: defaultTrainingProgress,
    securityMetrics: defaultSecurityMetrics
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch compliance data
      const auditResponse = await fetch(
        `https://b71fh4z288.execute-api.me-central-1.amazonaws.com/prod/audit?Organisation_id=${API_CONFIG.ORG_ID}`
      );
      const auditData = await auditResponse.json();
      const assessments = auditData.records || [];
      
      // Fetch policies data
      const policiesResponse = await policyApi.getPolicies(API_CONFIG.ORG_ID);
      const policies = policiesResponse.policies || [];
      
      // Fetch vulnerability data for risks
      const vulnResponse = await fetch(
        "https://28xfdt1d0b.execute-api.me-central-1.amazonaws.com/prod/Vulner-data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ organization_id: API_CONFIG.ORG_ID })
        }
      );
      const vulnData = await vulnResponse.json();
      
      // Calculate metrics from real data
      const completedAssessments = assessments.filter(a => a.Status === 'Completed').length;
      const complianceScore = assessments.length > 0 ? Math.round((completedAssessments / assessments.length) * 100) : 87;
      
      let totalVulns = { critical: 0, high: 0, medium: 0, low: 0 };
      if (vulnData.scan_statuses) {
        vulnData.scan_statuses.forEach(scan => {
          if (scan.summary) {
            totalVulns.critical += scan.summary.Critical || 0;
            totalVulns.high += scan.summary.High || 0;
            totalVulns.medium += scan.summary.Medium || 0;
            totalVulns.low += scan.summary.Low || 0;
          }
        });
      }
      
      const totalRisks = totalVulns.critical + totalVulns.high + totalVulns.medium + totalVulns.low;
      
      setDashboardData(prev => ({
        ...prev,
        compliance: {
          total: assessments.length,
          completed: completedAssessments,
          score: complianceScore,
          loading: false
        },
        policies: {
          total: policies.length,
          pending: policies.filter(p => p.status === 'draft' || p.status === 'to_be_reviewed').length,
          upToDate: policies.length > 0 ? Math.round((policies.filter(p => p.status === 'published').length / policies.length) * 100) : 98,
          loading: false
        },
        risks: {
          total: totalRisks,
          critical: totalVulns.critical,
          medium: totalVulns.high + totalVulns.medium,
          loading: false
        },
        training: { ...prev.training, loading: false },
        riskDistribution: [
          { name: 'Low', value: totalVulns.low, color: '#22c55e' },
          { name: 'Medium', value: totalVulns.medium, color: '#f59e0b' },
          { name: 'High', value: totalVulns.high, color: '#ef4444' },
          { name: 'Critical', value: totalVulns.critical, color: '#dc2626' },
        ]
      }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardData(prev => ({
        ...prev,
        compliance: { ...prev.compliance, loading: false },
        policies: { ...prev.policies, loading: false },
        risks: { ...prev.risks, loading: false },
        training: { ...prev.training, loading: false }
      }));
    }
  };

  const complianceOverall = [
    { name: 'Compliant', value: dashboardData.compliance.score, color: '#22c55e' },
    { name: 'Gap', value: 100 - dashboardData.compliance.score, color: '#e5e7eb' },
  ];

  return (
    <div className="p-8 space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights into your compliance and security posture
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {dashboardData.compliance.loading ? '...' : `${dashboardData.compliance.score}%`}
                  </span>
                  <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2%
                  </Badge>
                </div>
                <Progress value={dashboardData.compliance.score} className="w-full h-2" />
                <p className="text-xs text-muted-foreground">Target: 90% by Q2</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">
                    {dashboardData.risks.loading ? '...' : dashboardData.risks.total}
                  </span>
                  <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">High Priority</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">{dashboardData.risks.critical} critical</span>
                  <span className="text-orange-600">{dashboardData.risks.medium} medium</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Policies</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">
                    {dashboardData.policies.loading ? '...' : dashboardData.policies.total}
                  </span>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {dashboardData.policies.pending} pending
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">{dashboardData.policies.upToDate}% up to date</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Training Progress</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {dashboardData.training.loading ? '...' : `${dashboardData.training.completion}%`}
                  </span>
                  <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200">On Track</Badge>
                </div>
                <Progress value={dashboardData.training.completion} className="w-full h-2" />
                <p className="text-xs text-muted-foreground">{dashboardData.training.enrolled} employees enrolled</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modern Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                Compliance Score
              </CardTitle>
              <CardDescription>Overall compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <ModernDonutChart
                data={complianceOverall}
                height={250}
                centerContent={
                  <AnimatedCounter
                    value={dashboardData.compliance.score}
                    suffix="%"
                    label="Compliant"
                    size="large"
                  />
                }
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                Risk Distribution
              </CardTitle>
              <CardDescription>Current risk levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ModernPieChart
                data={dashboardData.riskDistribution}
                height={280}
                showLegend={false}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                Security Metrics
              </CardTitle>
              <CardDescription>Security domain scores</CardDescription>
            </CardHeader>
            <CardContent>
              <ModernPieChart
                data={dashboardData.securityMetrics.map(item => ({ name: item.name, value: item.score, color: item.color }))}
                height={280}
                showLegend={false}
                innerRadius={40}
                outerRadius={90}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="glass border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                Compliance Framework Scores
              </CardTitle>
              <CardDescription>Performance across regulatory frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <ModernBarChart
                data={dashboardData.complianceData}
                dataKey="score"
                xAxisKey="name"
                height={320}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="glass border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                Training Progress Trend
              </CardTitle>
              <CardDescription>Monthly completion rates with trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ModernLineChart
                data={dashboardData.trainingProgress}
                dataKey="completion"
                height={320}
                color="#8b5cf6"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="glass border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates across all modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                  <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">SOX compliance review completed</p>
                    <p className="text-sm text-muted-foreground">2 hours ago • Score: 92%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800">
                  <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New high-risk item identified</p>
                    <p className="text-sm text-muted-foreground">4 hours ago • Supply chain vulnerability</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                  <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Data Privacy Policy updated</p>
                    <p className="text-sm text-muted-foreground">1 day ago • Version 2.1 published</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800">
                  <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Security training module completed</p>
                    <p className="text-sm text-muted-foreground">2 days ago • 45 employees certified</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}