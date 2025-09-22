
const FRAMEWORK_API_URL = 'https://j01pxwtr4c.execute-api.me-central-1.amazonaws.com/prod/framework';
const AUDIT_API_URL = 'https://b71fh4z288.execute-api.me-central-1.amazonaws.com/prod/audit';

export interface Framework {
  id: string;
  name: string;
  progress?: number;
  status?: 'met' | 'in-progress' | 'at-risk';
  controls?: {
    total: number;
    met: number;
    inProgress: number;
    atRisk: number;
  };
}

export interface AuditData {
  Organisation_id: string;
  // Add other audit properties as they become available from the API response
  [key: string]: any;
}

export const fetchFrameworks = async (): Promise<Framework[]> => {
  const response = await fetch(FRAMEWORK_API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch frameworks: ${response.statusText}`);
  }
  const data = await response.json();
  
  // Handle different possible response structures
  if (Array.isArray(data)) {
    return data;
  }
  if (data.frameworks && Array.isArray(data.frameworks)) {
    return data.frameworks;
  }
  if (data.data && Array.isArray(data.data)) {
    return data.data;
  }
  
  console.warn('Unexpected API response structure:', data);
  return [];
};

export const fetchAuditData = async (organisationId: string = 'a7626014-c092-47b2-84a7-b8c8c3059526'): Promise<AuditData[]> => {
  const response = await fetch(`${AUDIT_API_URL}?Organisation_id=${organisationId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch audit data: ${response.statusText}`);
  }
  return response.json();
};
