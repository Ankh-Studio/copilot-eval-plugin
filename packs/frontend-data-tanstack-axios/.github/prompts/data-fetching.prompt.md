# Data Fetching Hook Generator

Create React hooks for data fetching using TanStack Query and Axios with comprehensive error
handling, caching, and TypeScript support.

## Core Requirements

Generate hooks that include:

1. **TanStack Query** for caching and state management
2. **Axios** for HTTP requests with error handling
3. **TypeScript** for type safety
4. **Error handling** with user-friendly messages
5. **Loading states** for better UX
6. **Retry logic** for resilience

## Basic Query Hook

````typescript
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/users/${userId}`);
      return data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
```bash

## Basic Mutation Hook

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateUser {
  name: string;
  email: string;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUser) => {
      const { data } = await axiosInstance.post<User>('/users', userData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
## Error Handling

```typescript
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/users/${userId}`);
      return data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error.response?.status >= 400 && error.response?.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    onError: (error) => {
      console.error('Failed to fetch user:', error);
    },
  });
};
```bash

## Advanced Patterns

### Pagination

```typescript
export const usePaginatedUsers = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        items: User[];
        totalCount: number;
        page: number;
        pageSize: number;
      }>('/users', { params: { page, pageSize } });
      return data;
    },
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000,
  });
};
```bash

### Optimistic Updates

```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<User> & { id: string }) =>
      axiosInstance.patch<User>(`/users/${id}`, data),
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousData = queryClient.getQueryData<User[]>(['users']);

      queryClient.setQueryData<User[]>(['users'], (old) =>
        old?.map(user =>
          user.id === updatedData.id ? { ...user, ...updatedData } : user
        )
      );

      return { previousData };
    },
    onError: (err, updatedData, context) => {
      queryClient.setQueryData(['users'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```bash
    },
  });
};
```bash

## Error Handling Patterns

### Custom Error Handler

```typescript
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 400:
        return 'Invalid data provided. Please check your input and try again.';
      case 401:
        return 'Please log in to continue.';
      case 403:
        return 'You don\'t have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return message || 'An unexpected error occurred.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
};
```bash

### Error Boundary Hook

```typescript
export const useQueryWithError = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey,
    queryFn,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('404')) {
        return false; // Don't retry 404 errors
      }
      return failureCount < 3;
    },
    onError: (error) => {
      console.error('Query error:', error);
      // Could also show toast notification here
    },
    ...options,
  });
};
```bash

## Cache Management

### Query Key Factory

```typescript
// Centralized query key management
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (page: number) => [...queryKeys.posts.lists(), page] as const,
  },
};

// Usage
export const useUsers = (filters?: string) => {
  return useQuery({
    queryKey: filters ? queryKeys.users.list(filters) : queryKeys.users.lists(),
    queryFn: () => fetchUsers(filters),
  });
};
```bash

### Cache Invalidation Strategies

```typescript
export const useDataManagement = () => {
  const queryClient = useQueryClient();

  const invalidateRelatedQueries = (resourceType: string) => {
    // Invalidate all queries for this resource type
    queryClient.invalidateQueries({ queryKey: [resourceType] });

    // Also invalidate dependent queries
    if (resourceType === 'users') {
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Posts depend on users
    }
  };

  const prefetchData = (queryKey: string[], queryFn: () => Promise<any>) => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return { invalidateRelatedQueries, prefetchData };
};
```bash

## Real-time Updates

### WebSocket Integration

```typescript
export const useRealtimeData = <T>(
  initialQueryKey: string[],
  initialQueryFn: () => Promise<T>
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/realtime');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Update cache with real-time data
      queryClient.setQueryData(initialQueryKey, (old: T) => ({
        ...old,
        ...data,
      }));
    };

    return () => ws.close();
  }, [queryClient, initialQueryKey]);

  return useQuery({
    queryKey: initialQueryKey,
    queryFn: initialQueryFn,
    staleTime: 30 * 1000, // 30 seconds for real-time data
  });
};
```bash

## Performance Optimization

### Selective Data Fetching

```typescript
export const useUserPermissions = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId, 'permissions'],
    queryFn: () => fetchUserPermissions(userId),
    select: (permissions) => ({
      canEdit: permissions.includes('edit'),
      canDelete: permissions.includes('delete'),
      canView: permissions.includes('view'),
    }),
    staleTime: 10 * 60 * 1000, // 10 minutes for permissions
  });
};
```bash

### Background Refetching

```typescript
export const useActiveData = () => {
  return useQuery({
    queryKey: ['activeData'],
    queryFn: fetchActiveData,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    refetchIntervalInBackground: true, // Continue refetching when tab is in background
    staleTime: 15 * 1000, // Consider data stale after 15 seconds
  });
};
```bash

## Testing Patterns

### Mock Query Hook

```typescript
// For testing purposes
export const useMockData = <T>(data: T, isLoading = false, error?: Error) => {
  return useQuery({
    queryKey: ['mock'],
    queryFn: () => Promise.resolve(data),
    initialData: data,
    enabled: !isLoading && !error,
    retry: false,
  });
};
```bash

Generate data fetching hooks that are robust, type-safe, and provide excellent user experience with proper loading states, error handling, and performance optimization.
````
