// services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

class ApiService {
  private token: string | null = null;
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '');
    console.log('📡 API Base URL:', this.baseURL);
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
    console.log('✅ Token set in apiService');
  }

  getToken(): string | null {
    if (this.token) {
      return this.token;
    }
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        this.token = token;
        return token;
      }
    }
    return null;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    const headers = new Headers(options.headers || {});
    
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // ✅ URL তৈরি করুন
    const cleanBase = this.baseURL.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    const url = `${cleanBase}/${cleanEndpoint}`;
    
    console.log('📡 API Request:', url);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    const raw = await response.text();
    let data: any = null;
    const looksLikeJson = contentType.includes('application/json') || raw.trim().startsWith('{') || raw.trim().startsWith('[');
    if (raw && looksLikeJson) {
      try {
        data = JSON.parse(raw);
      } catch {
        // keep data as null
      }
    }

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      const message = data?.message || data?.error || (raw ? raw.slice(0, 200) : null) || 'Something went wrong';
      throw new Error(message);
    }

    if (data === null) {
      throw new Error(raw ? raw.slice(0, 200) : 'Empty response');
    }

    return data;
  }

  async get(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  async put(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  async delete(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  // ✅ Auth - endpoint গুলোতে /api যোগ করুন
  async login(email: string, password: string) {
    console.log('🔐 Login called');
    const response = await this.post('/api/admin/demo-login', { email, password });
    console.log('📥 Login response:', response);
    if (response.token) {
      this.setToken(response.token);
      console.log('✅ Token saved from login');
    }
    return response;
  }

  async getProfile() {
    return this.get('/api/auth/profile');
  }

  // Dashboard
  async getDashboardOverview() {
    console.log('📊 getDashboardOverview called');
    return this.get('/api/admin/dashboard');
  }

  async getUsers(page: number = 1, limit: number = 10) {
    return this.get(`/api/admin/users?page=${page}&limit=${limit}`);
  }

  async getUserStats() {
    return this.get('/api/admin/stats');
  }

  async updateUser(userId: string, data: any) {
    return this.put(`/api/admin/users/${userId}`, data);
  }

  async deleteUser(userId: string) {
    return this.delete(`/api/admin/users/${userId}`);
  }
}

export const apiService = new ApiService();

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).apiService = apiService;
}
