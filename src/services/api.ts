// API Service for GRC Platform - Microservices Architecture
// This handles all backend API interactions with multiple service endpoints

import { AppConfig } from '../config/app-config';

interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class ApiService {
  private authToken: string | null = null;

  // Set authentication token
  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  // Generic API request method
  private async request<T>(
    baseURL: string,
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError({
          message: data.message || 'API request failed',
          status: response.status,
          code: data.code,
        });
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError({
        message: 'Network error or server unavailable',
        status: 0,
      });
    }
  }

  // Helper methods for each service
  private policyRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.policy, endpoint, options);
  }

  private userRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.users, endpoint, options);
  }

  private auditRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.audit, endpoint, options);
  }

  private assessmentRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.assessment, endpoint, options);
  }

  private vulnerabilityRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.vulnerability, endpoint, options);
  }

  private scanningRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.scanning, endpoint, options);
  }

  private trainingRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.training, endpoint, options);
  }

  private enrollmentRequest<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(AppConfig.api.enrollment, endpoint, options);
  }

  // ===================
  // POLICY MANAGEMENT APIs
  // ===================
  async getPolicies() {
    return this.policyRequest('/policies');
  }

  async generatePolicy(data: any) {
    return this.policyRequest('/generate-policy', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createPolicy(data: any) {
    return this.policyRequest('/policy', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePolicy(data: any) {
    return this.policyRequest('/policy', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPolicyTemplates() {
    return this.policyRequest('/policy-templates');
  }

  // ===================
  // USER MANAGEMENT APIs
  // ===================
  async getUser(data: any) {
    return this.userRequest('/get-user', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addUser(data: any) {
    return this.userRequest('/add-user', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ===================
  // AUDIT MANAGEMENT APIs
  // ===================
  async getAuditData() {
    return this.auditRequest('/audit');
  }

  async createAuditEntry(data: any) {
    return this.auditRequest('/audit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createAssessment(data: any) {
    return this.assessmentRequest('/assessment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ===================
  // VULNERABILITY MANAGEMENT APIs
  // ===================
  async getVulnerabilityData(data: any) {
    return this.vulnerabilityRequest('/Vulner-data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addTarget(data: any) {
    return this.scanningRequest('/add-target', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addScan(data: any) {
    return this.scanningRequest('/add_scan', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async initiateScan(data: any) {
    return this.scanningRequest('/initiateScan', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ===================
  // TRAINING MANAGEMENT APIs
  // ===================
  async getTrainingData() {
    return this.trainingRequest('/pdpl-training');
  }

  async enrollUser(data: any) {
    return this.enrollmentRequest('/enroll', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async fetchAudit(data: any) {
    return this.enrollmentRequest('/fetch-audit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ===================
  // DASHBOARD APIs (Combined from various sources)
  // ===================
  async getDashboardMetrics() {
    // Combine data from multiple sources for dashboard
    try {
      const [auditData, vulnerabilityData, trainingData] = await Promise.allSettled([
        this.getAuditData(),
        this.getVulnerabilityData({ organization_id: 'default' }), // You may need to pass actual org_id
        this.getTrainingData(),
      ]);

      return {
        success: true,
        data: {
          audit: auditData.status === 'fulfilled' ? auditData.value : null,
          vulnerabilities: vulnerabilityData.status === 'fulfilled' ? vulnerabilityData.value : null,
          training: trainingData.status === 'fulfilled' ? trainingData.value : null,
        },
      };
    } catch (error) {
      throw new ApiError({
        message: 'Failed to fetch dashboard metrics',
        status: 500,
      });
    }
  }

  // ===================
  // COMPLIANCE APIs (Using Audit data)
  // ===================
  async getComplianceFrameworks() {
    return this.getAuditData();
  }

  async getComplianceAssessments() {
    return this.getAuditData();
  }

  // ===================
  // RISK MANAGEMENT APIs (Using Assessment data)
  // ===================
  async getRisks() {
    return this.getAuditData();
  }

  async createRiskAssessment(data: any) {
    return this.createAssessment(data);
  }

  // ===================
  // SECURITY APIs (Using Vulnerability data)
  // ===================
  async getSecurityControls() {
    return this.getVulnerabilityData({ organization_id: 'default' });
  }

  async getSecurityIncidents() {
    return this.getVulnerabilityData({ organization_id: 'default' });
  }

  async getSecurityMetrics() {
    return this.getVulnerabilityData({ organization_id: 'default' });
  }

  // ===================
  // TRAINING APIs
  // ===================
  async getTrainingPrograms() {
    return this.getTrainingData();
  }

  async getTrainingProgress(userId?: string) {
    return this.getTrainingData();
  }

  async updateTrainingProgress(programId: string, userId: string, data: any) {
    return this.enrollUser({ ...data, programId, userId });
  }

  async getTrainingMetrics() {
    return this.getTrainingData();
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export { ApiService, type ApiResponse, type ApiError };