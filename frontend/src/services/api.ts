const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://proofly-backend.onrender.com/api";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Important for cookies if using httpOnly
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Clear auth data and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }
      
      return {
        success: false,
        error: data.message || 'Something went wrong',
        ...data,
      };
    }

    return { success: true, data, ...data };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
};
