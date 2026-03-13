# Data Fetching Hook Generator

Create React hooks for data fetching using TanStack Query and Axios with comprehensive error
handling, caching, and TypeScript support.

## Data Fetching Requirements

When generating data fetching hooks, include:

1. **TanStack Query integration** with proper query keys and caching
2. **Axios HTTP client** with interceptors and error handling
3. **TypeScript interfaces** for request/response data
4. **Error boundaries** and user-friendly error messages
5. **Loading states** and optimistic updates
6. **Retry logic** and failure handling
7. **Cache invalidation** and data synchronization
8. **Background refetching** and stale-while-revalidate

## Hook Template Structure

````typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios';

interface DataType {
  id: string;
  // Add other properties
}

interface GetParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

interface CreateData {
  // Add creation properties
}

// Query hook
export const useDataList = (params: GetParams = {}) => {
  return useQuery({
    queryKey: ['dataList', params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<DataType[]>('/data', { params });
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        return false; // Don't retry client errors
      }
      return failureCount < 3;
    },
  });
};

// Mutation hook
export const useCreateData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateData) =>
      axiosInstance.post<DataType>('/data', data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataList'] });
    },
    onError: (error) => {
      console.error('Failed to create data:', error);
    },
  });
};
```bash

## Advanced Data Fetching Patterns

### Paginated Query

```typescript
export const usePaginatedData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['dataList', page, pageSize],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        items: DataType[];
        totalCount: number;
        page: number;
        pageSize: number;
        hasNext: boolean;
      }>('/data', { params: { page, pageSize } });
      return data;
    },
    keepPreviousData: true, // Keep previous data while fetching
    staleTime: 2 * 60 * 1000, // 2 minutes for paginated data
  });
};
```bash

### Infinite Scroll Query

```typescript
export const useInfiniteData = () => {
  return useInfiniteQuery({
    queryKey: ['infiniteData'],
    queryFn: ({ pageParam = 1 }) =>
      fetchItems(pageParam, 20),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 1 * 60 * 1000, // 1 minute for infinite data
  });
};
```bash

### Optimistic Updates

```typescript
export const useUpdateData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<DataType> & { id: string }) =>
      axiosInstance.patch<DataType>(`/data/${id}`, data),
    onMutate: async (updatedData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['dataList'] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<DataType[]>(['dataList']);

      // Optimistically update to the new value
      queryClient.setQueryData<DataType[]>(['dataList'], (old) =>
        old?.map(item =>
          item.id === updatedData.id ? { ...item, ...updatedData } : item
        )
      );

      return { previousData };
    },
    onError: (err, updatedData, context) => {
      // Rollback on error
      queryClient.setQueryData(['dataList'], context?.previousData);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['dataList'] });
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
