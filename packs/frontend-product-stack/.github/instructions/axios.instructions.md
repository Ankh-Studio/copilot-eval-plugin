# Axios HTTP Client Patterns

Use Axios for HTTP requests with proper configuration, error handling, and TypeScript integration.

## Axios Instance Configuration

### Base Instance Setup

```typescript
// src/api/axios.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: number;
}

export class ApiError extends Error {
  constructor(
    public response: AxiosResponse,
    message?: string
  ) {
    super(message || `API Error: ${response.status}`);
    this.name = 'ApiError';
  }
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log request duration
    const endTime = new Date();
    const duration = endTime.getTime() - response.config.metadata?.startTime?.getTime();
    console.log(`Request to ${response.config.url} took ${duration}ms`);
    
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      // Forbidden - show permission error
      throw new ApiError(error.response, 'Insufficient permissions');
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new ApiError({ status: 408 } as AxiosResponse, 'Request timeout');
    }
    
    return Promise.reject(error);
  }
);
```bash

## Typed API Functions

### GET Requests

```typescript
// src/api/users.ts
import { axiosInstance, ApiResponse } from './axios';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: string;
}

export const getUsers = async (params: GetUsersParams = {}): Promise<ApiResponse<User[]>> => {
  const response = await axiosInstance.get<ApiResponse<User[]>>('/users', { params });
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<User>(`/users/${id}`);
  return response.data;
};
```bash

### POST/PATCH Requests

```typescript
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
}

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const response = await axiosInstance.post<User>('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: UpdateUserRequest): Promise<User> => {
  const response = await axiosInstance.patch<User>(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
```bash

## Error Handling Patterns

### Custom Error Handler

```typescript
// src/api/errorHandler.ts
import { ApiError } from './axios';

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.response.status) {
      case 400:
        return 'Invalid request data';
      case 401:
        return 'Please log in to continue';
      case 403:
        return 'You don\'t have permission to do this';
      case 404:
        return 'The requested resource was not found';
      case 429:
        return 'Too many requests. Please try again later';
      case 500:
        return 'Server error. Please try again later';
      default:
        return `Error: ${error.message}`;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};
```bash

### React Hook with Error Handling

```typescript
// src/hooks/useApi.ts
import { useState, useEffect } from 'react';
import { handleApiError } from '../api/errorHandler';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> & { refetch: () => void } => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { ...state, refetch: fetchData };
};
```bash

## Request Cancellation

### Cancelable Requests

```typescript
import { CancelTokenSource } from 'axios';

export const useCancelableRequest = <T>(
  apiCall: (cancelToken: CancelTokenSource) => Promise<T>
) => {
  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

  const executeRequest = async () => {
    // Cancel previous request if exists
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled due to new request');
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    try {
      const result = await apiCall(source);
      setCancelTokenSource(null);
      return result;
    } catch (error) {
      setCancelTokenSource(null);
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        return null;
      }
      throw error;
    }
  };

  const cancelRequest = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled by user');
    }
  };

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, []);

  return { executeRequest, cancelRequest };
};
```bash

## File Upload

### Upload with Progress

```typescript
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export const uploadFile = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<{ url: string }>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress: UploadProgress = {
          loaded: progressEvent.loaded,
          total: progressEvent.total,
          percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
        };
        onProgress(progress);
      }
    },
  });

  return response.data;
};
```bash

## Request Retry Logic

### Retry Configuration

```typescript
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (axios.isAxiosError(error) && error.response?.status && error.response.status < 500) {
        throw error;
      }
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }
  
  throw lastError;
};
```bash
