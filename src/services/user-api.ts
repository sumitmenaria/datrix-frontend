export interface ProcessedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  organizationId: string;
  organizationName: string;
  status: string;
  enabled: boolean;
  emailVerified: boolean;
  createdDate: Date;
  lastModifiedDate: Date;
}

export interface CreateUserRequest {
  email: string;
  organizationId: string;
  organizationName: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  role: string;
  organizationId: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

const API_BASE = 'https://jt9bq5vlvf.execute-api.me-central-1.amazonaws.com/Prod';

export const userApiService = {
  async fetchUsers(organizationId: string): Promise<ProcessedUser[]> {
    const response = await fetch(`${API_BASE}/get-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'fetchUsers',
        organization_ID: organizationId,
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch users');
    
    const data = await response.json();
    return data.users.map((user: any) => this.processUser(user));
  },

  async createUser(request: CreateUserRequest): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/add-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'createUser',
        email: request.email,
        Organisation_ID: request.organizationId,
        Role: request.role,
        Organisation_Name: request.organizationName,
        FirstName: request.firstName,
        LastName: request.lastName,
      }),
    });

    if (!response.ok) throw new Error('Failed to create user');
    
    const data = await response.json();
    return { success: true, message: data.message };
  },

  async updateUser(email: string, request: UpdateUserRequest): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/update-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'updateData',
        email,
        attributes: [
          { Name: 'custom:FirstName', Value: request.firstName },
          { Name: 'custom:LastName', Value: request.lastName },
          { Name: 'custom:Role', Value: request.role },
          { Name: 'custom:organization_ID', Value: request.organizationId },
        ],
      }),
    });

    if (!response.ok) throw new Error('Failed to update user');
    
    const data = await response.json();
    return { success: true, message: data.message || 'User updated successfully' };
  },

  async deleteUser(email: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/delete-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'deleteUser',
        email,
      }),
    });

    if (!response.ok) throw new Error('Failed to delete user');
    
    const data = await response.json();
    return { success: true, message: data.message };
  },

  processUser(user: any): ProcessedUser {
    const attributes = user.Attributes || [];
    const getAttr = (name: string) => attributes.find((attr: any) => attr.Name === name)?.Value || '';

    return {
      id: user.Username,
      email: getAttr('email'),
      firstName: getAttr('custom:FirstName'),
      lastName: getAttr('custom:LastName'),
      fullName: `${getAttr('custom:FirstName')} ${getAttr('custom:LastName')}`.trim(),
      role: getAttr('custom:Role'),
      organizationId: getAttr('custom:organization_ID'),
      organizationName: getAttr('custom:Organization_Name'),
      status: user.UserStatus,
      enabled: user.Enabled,
      emailVerified: getAttr('email_verified') === 'true',
      createdDate: new Date(user.UserCreateDate),
      lastModifiedDate: new Date(user.UserLastModifiedDate),
    };
  },

  getStatusInfo(status: string) {
    const statusMap: Record<string, { label: string; color: string }> = {
      CONFIRMED: { label: 'Active', color: 'success' },
      FORCE_CHANGE_PASSWORD: { label: 'Pending', color: 'warning' },
      UNCONFIRMED: { label: 'Unconfirmed', color: 'secondary' },
      ARCHIVED: { label: 'Archived', color: 'destructive' },
    };
    return statusMap[status] || { label: status, color: 'secondary' };
  },

  getRoleColor(role: string) {
    const roleMap: Record<string, string> = {
      Admin: 'destructive',
      Manager: 'default',
      User: 'secondary',
    };
    return roleMap[role] || 'outline';
  },
};