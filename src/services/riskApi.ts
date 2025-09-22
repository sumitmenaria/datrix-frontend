import { API_CONFIG } from '@/config/api';

// Risk Management API URL
const RISK_API_URL = 'https://ad32ip8gjh.execute-api.us-west-2.amazonaws.com/Prod';

export interface Risk {
  risk_id: string;
  organization_id: string;
  title: string;
  description: string;
  category: string;
  risk_source?: 'internal' | 'vendor' | 'regulatory' | 'external';
  vendor_id?: string;
  vendor_name?: string;
  assessment_id?: string;
  inherent_likelihood: number;
  inherent_impact: number;
  residual_likelihood: number;
  residual_impact: number;
  owner: string;
  status: string;
  controls: string[];
  created_at: string;
  updated_at: string;
  last_reviewed?: string;
  next_review?: string;
  auto_created?: boolean;
  assessment_score?: number;
}

export interface KRI {
  kri_id: string;
  organization_id: string;
  risk_id: string;
  name: string;
  description: string;
  current_value: number;
  threshold: number;
  critical: number;
  status: string;
  trend: string;
  frequency: string;
  owner: string;
  unit: string;
  vendor_id?: string;
  created_at: string;
  updated_at: string;
  last_updated: string;
}

export interface TreatmentPlan {
  treatment_id: string;
  organization_id: string;
  risk_id: string;
  risk_title: string;
  treatment_type: string;
  status: string;
  priority: string;
  owner: string;
  description?: string;
  due_date?: string;
  progress: number;
  budget: number;
  spent: number;
  actions: any[];
  created_at: string;
  updated_at: string;
}

export interface Alert {
  alert_id: string;
  organization_id: string;
  kri_id: string;
  kri_name: string;
  message: string;
  severity: string;
  status: string;
  acknowledged: boolean;
  created_at: string;
  acknowledged_at?: string;
}

// Risk CRUD operations
export const fetchRisks = async (filters?: {
  category?: string;
  status?: string;
  risk_source?: string;
  vendor_id?: string;
}): Promise<Risk[]> => {
  const params = new URLSearchParams({
    organization_id: API_CONFIG.ORGANISATION_ID,
    ...(filters?.category && { category: filters.category }),
    ...(filters?.status && { status: filters.status }),
    ...(filters?.risk_source && { risk_source: filters.risk_source }),
    ...(filters?.vendor_id && { vendor_id: filters.vendor_id })
  });

  const response = await fetch(`${RISK_API_URL}/risks?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch risks: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.risks || [];
};

export const createRisk = async (risk: Omit<Risk, 'risk_id' | 'created_at' | 'updated_at'>): Promise<Risk> => {
  const response = await fetch(`${RISK_API_URL}/risks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...risk,
      organization_id: API_CONFIG.ORGANISATION_ID
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create risk: ${response.statusText}`);
  }

  const data = await response.json();
  return data.risk;
};

export const updateRisk = async (riskId: string, updates: Partial<Risk>): Promise<void> => {
  const response = await fetch(`${RISK_API_URL}/risks/${riskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update risk: ${response.statusText}`);
  }
};

export const deleteRisk = async (riskId: string): Promise<void> => {
  const response = await fetch(`${RISK_API_URL}/risks/${riskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete risk: ${response.statusText}`);
  }
};

// KRI operations
export const fetchKRIs = async (riskId?: string): Promise<KRI[]> => {
  const params = new URLSearchParams({
    organization_id: API_CONFIG.ORGANISATION_ID,
    ...(riskId && { risk_id: riskId })
  });

  const response = await fetch(`${RISK_API_URL}/kris?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch KRIs: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.kris || [];
};

export const createKRI = async (kri: Omit<KRI, 'kri_id' | 'created_at' | 'updated_at' | 'last_updated'>): Promise<KRI> => {
  const response = await fetch(`${RISK_API_URL}/kris`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...kri,
      organization_id: API_CONFIG.ORGANISATION_ID
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create KRI: ${response.statusText}`);
  }

  const data = await response.json();
  return data.kri;
};

export const updateKRI = async (kriId: string, updates: Partial<KRI>): Promise<void> => {
  const response = await fetch(`${RISK_API_URL}/kris/${kriId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update KRI: ${response.statusText}`);
  }
};

// Treatment Plan operations
export const fetchTreatmentPlans = async (filters?: {
  risk_id?: string;
  status?: string;
  treatment_type?: string;
}): Promise<TreatmentPlan[]> => {
  const params = new URLSearchParams({
    organization_id: API_CONFIG.ORGANISATION_ID,
    ...(filters?.risk_id && { risk_id: filters.risk_id }),
    ...(filters?.status && { status: filters.status }),
    ...(filters?.treatment_type && { treatment_type: filters.treatment_type })
  });

  const response = await fetch(`${RISK_API_URL}/treatments?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch treatment plans: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.treatments || [];
};

export const createTreatmentPlan = async (treatment: Omit<TreatmentPlan, 'treatment_id' | 'created_at' | 'updated_at'>): Promise<TreatmentPlan> => {
  const response = await fetch(`${RISK_API_URL}/treatments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...treatment,
      organization_id: API_CONFIG.ORGANISATION_ID
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create treatment plan: ${response.statusText}`);
  }

  const data = await response.json();
  return data.treatment;
};

export const updateTreatmentPlan = async (treatmentId: string, updates: Partial<TreatmentPlan>): Promise<void> => {
  const response = await fetch(`${RISK_API_URL}/treatments/${treatmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update treatment plan: ${response.statusText}`);
  }
};

// Alert operations
export const fetchAlerts = async (filters?: {
  status?: string;
  severity?: string;
  acknowledged?: boolean;
}): Promise<Alert[]> => {
  const params = new URLSearchParams({
    organization_id: API_CONFIG.ORGANISATION_ID,
    ...(filters?.status && { status: filters.status }),
    ...(filters?.severity && { severity: filters.severity }),
    ...(filters?.acknowledged !== undefined && { acknowledged: filters.acknowledged.toString() })
  });

  const response = await fetch(`${RISK_API_URL}/alerts?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch alerts: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.alerts || [];
};

export const acknowledgeAlert = async (alertId: string): Promise<void> => {
  const response = await fetch(`${RISK_API_URL}/alerts/${alertId}/acknowledge`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to acknowledge alert: ${response.statusText}`);
  }
};

// Vendor Risk Integration APIs
export interface VendorRiskSummary {
  vendor_id: string;
  vendor_name: string;
  total_risks: number;
  critical_risks: number;
  high_risks: number;
  medium_risks: number;
  low_risks: number;
}

export interface RisksBySource {
  vendor: Risk[];
  internal: Risk[];
  regulatory: Risk[];
  external: Risk[];
}

export const fetchVendorRiskSummary = async (): Promise<{
  vendor_summary: VendorRiskSummary[];
  total_vendor_risks: number;
  total_internal_risks: number;
  total_risks: number;
}> => {
  const params = new URLSearchParams({
    organization_id: API_CONFIG.ORGANISATION_ID
  });

  const response = await fetch(`${RISK_API_URL}/risks/vendor-summary?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch vendor risk summary: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchRisksBySource = async (): Promise<{
  risks_by_source: RisksBySource;
  summary: {
    vendor_count: number;
    internal_count: number;
    regulatory_count: number;
    external_count: number;
  };
}> => {
  const params = new URLSearchParams({
    organization_id: API_CONFIG.ORGANISATION_ID
  });

  const response = await fetch(`${RISK_API_URL}/risks/by-source?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch risks by source: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchVendorRisks = async (vendorId: string): Promise<{
  vendor_id: string;
  risks: Risk[];
  kris: KRI[];
  risk_count: number;
  kri_count: number;
}> => {
  const params = new URLSearchParams({
    organization_id: API_CONFIG.ORGANISATION_ID
  });

  const response = await fetch(`${RISK_API_URL}/vendors/${vendorId}/risks?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch vendor risks: ${response.statusText}`);
  }
  
  return response.json();
};

export const autoCreateVendorRisk = async (vendorId: string, assessmentData: {
  assessment_score: number;
  vendor_name: string;
  risk_category?: string;
  assessment_id?: string;
  owner?: string;
  controls?: string[];
}): Promise<{
  risk_id: string;
  kri_id: string;
  risk: Risk;
  kri: KRI;
}> => {
  const response = await fetch(`${RISK_API_URL}/vendors/${vendorId}/auto-risk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...assessmentData,
      organization_id: API_CONFIG.ORGANISATION_ID
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to auto-create vendor risk: ${response.statusText}`);
  }

  return response.json();
};