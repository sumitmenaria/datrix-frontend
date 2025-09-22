import { API_CONFIG } from '@/config/api';

// Types
export interface Policy {
  policy_id: string;
  organization_id: string;
  title: string;
  content: string;
  framework_type: 'PDPL' | 'NCA_ECC' | 'SAMA';
  policy_type: string;
  status: 'draft' | 'to_be_reviewed' | 'reviewed' | 'published';
  version: string;
  owner_id?: string;
  owner_name?: string;
  created_at: string;
  updated_at: string;
  renewal_date: string;
  controls: string[];
}

export interface PolicyTemplate {
  id: string;
  name: string;
  framework: string;
  content: string;
}

export interface GeneratePolicyResponse {
  policy_id: string;
  content: string;
}

export interface UpdatePolicyStatusResponse {
  message: string;
  policy_id: string;
}

export interface GetPoliciesResponse {
  policies: Policy[];
  count: number;
}

export interface GetTemplatesResponse {
  templates: Record<string, PolicyTemplate[]>;
  frameworks: string[];
}

export interface GeneratePolicyRequest {
  framework: 'PDPL' | 'NCA_ECC' | 'SAMA';
  policy_type: string;
  owner_id: string;
  requirements: string;
  organization_id: string;
}

export interface CreatePolicyRequest {
  title: string;
  content: string;
  framework_type: string;
  policy_type: string;
  owner_id: string;
  organization_id: string;
}

export interface UpdatePolicyStatusRequest {
  policy_id: string;
  status: 'draft' | 'to_be_reviewed' | 'reviewed' | 'published';
  owner_id: string;
}

export interface OrganizationUser {
  id: string;
  name: string;
  email: string;
}

// API Functions
export const policyApi = {
  // Get all policies for organization
  async getPolicies(organizationId: string): Promise<GetPoliciesResponse> {
    const response = await fetch(
      `${API_CONFIG.POLICY_API_BASE}/policies?organization_id=${organizationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch policies');
    }

    return response.json();
  },

  // Generate AI policy
  async generatePolicy(request: GeneratePolicyRequest): Promise<GeneratePolicyResponse> {
    const response = await fetch(`${API_CONFIG.POLICY_API_BASE}/generate-policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate policy');
    }

    return response.json();
  },

  // Create new policy
  async createPolicy(request: CreatePolicyRequest): Promise<Policy> {
    const response = await fetch(`${API_CONFIG.POLICY_API_BASE}/policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create policy');
    }

    return response.json();
  },

  // Update policy status
  async updatePolicyStatus(request: UpdatePolicyStatusRequest): Promise<UpdatePolicyStatusResponse> {
    const response = await fetch(`${API_CONFIG.POLICY_API_BASE}/policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update policy status');
    }

    return response.json();
  },

  // Get policy templates
  async getPolicyTemplates(): Promise<GetTemplatesResponse> {
    const response = await fetch(`${API_CONFIG.POLICY_API_BASE}/policy-templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch policy templates');
    }

    return response.json();
  },

  // Get organization users (from People API)
  async getOrganizationUsers(organizationId: string): Promise<OrganizationUser[]> {
    const response = await fetch(API_CONFIG.PEOPLE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'fetchUsers',
        organization_ID: organizationId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch organization users');
    }

    const data = await response.json();
    // Process data.users[].Attributes[] format as per API specs
    if (data.users && Array.isArray(data.users)) {
      return data.users.map((user: any) => {
        const attributes = user.Attributes || [];
        const emailAttr = attributes.find((attr: any) => attr.Name === 'email');
        const nameAttr = attributes.find((attr: any) => attr.Name === 'name');
        
        return {
          id: user.Username || user.id,
          email: emailAttr?.Value || user.email || '',
          name: nameAttr?.Value || user.name || user.Username || ''
        };
      });
    }
    return [];
  },
};