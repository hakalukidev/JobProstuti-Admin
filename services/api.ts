const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
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
    
    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Avoid JSON.parse crashes when server returns HTML/text/empty
    const contentType = response.headers.get('content-type') || '';
    const raw = await response.text();

    let data: any = null;
    const looksLikeJson = contentType.includes('application/json') || raw.trim().startsWith('{') || raw.trim().startsWith('[');
    if (raw && looksLikeJson) {
      try {
        data = JSON.parse(raw);
      } catch {
        // keep data as null; we'll throw a helpful error below
      }
    }

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      const message = data?.message || (raw ? raw.slice(0, 200) : null) || 'Something went wrong';
      throw new Error(message);
    }

    // For successful responses, still handle unexpected non-JSON
    if (data === null) {
      throw new Error(raw ? raw.slice(0, 200) : 'Empty response');
    }

    return data;
  }

  // ============== HTTP Methods ==============
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

  async patch(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  // ============== Auth endpoints ==============
  async login(email: string, password: string) {
    const data = await this.post('/auth/login', { email, password });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async getProfile() {
    return this.get('/auth/me');
  }

  // ============== Admin endpoints ==============
  async getUsers(page: number = 1, limit: number = 10, search?: string) {
    let url = `/admin/users?page=${page}&limit=${limit}`;
    if (search) url += `&search=${search}`;
    return this.get(url);
  }

  async getUserStats() {
    return this.get('/admin/stats');
  }

  async getDashboardOverview() {
    return this.get('/admin/dashboard');
  }

  async updateUser(userId: string, data: any) {
    return this.put(`/admin/users/${userId}`, data);
  }

  async deleteUser(userId: string) {
    return this.delete(`/admin/users/${userId}`);
  }

  async createUser(userData: any) {
    return this.post('/admin/users', userData);
  }

  // ============== Course endpoints ==============
  async getCourses() {
    return this.get('/courses');
  }

  async createCourse(courseData: any) {
    return this.post('/courses', courseData);
  }

  async updateCourse(courseId: string, courseData: any) {
    return this.put(`/courses/${courseId}`, courseData);
  }

  async deleteCourse(courseId: string) {
    return this.delete(`/courses/${courseId}`);
  }

  // ============== Category endpoints ==============
  async getCategories() {
    return this.get('/categories');
  }

  async createCategory(categoryData: any) {
    return this.post('/categories', categoryData);
  }

  // ============== File upload ==============
  async uploadFile(file: File, type: string = 'image') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.post('/upload', formData);
  }
}

export const apiService = new ApiService();