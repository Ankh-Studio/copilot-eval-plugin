# API Hook Generator

Create React hooks for API data management using TanStack Query and Axios with proper error handling and TypeScript typing.

## Hook Requirements

When generating API hooks, include:

1. **TanStack Query integration** with proper query keys
2. **TypeScript interfaces** for request/response data
3. **Error handling** with user-friendly messages
4. **Loading states** and optimistic updates
5. **Cache management** and invalidation strategies
6. **Retry logic** for failed requests

## Basic Query Hook Template

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios';

interface EntityType {
  id: string;
  // Add other properties
}

interface GetEntitiesParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

interface CreateEntityData {
  // Add creation properties
}

// Query hook
export const useEntities = (params: GetEntitiesParams = {}) => {
  return useQuery({
    queryKey: ['entities', params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<EntityType[]>('/entities', { params });
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Mutation hook
export const useCreateEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEntityData) => 
      axiosInstance.post<EntityType>('/entities', data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
    },
    onError: (error) => {
      console.error('Failed to create entity:', error);
    },
  });
};
```bash

## Advanced Patterns

### Pagination Hook

```typescript
export const usePaginatedEntities = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['entities', page, pageSize],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        items: EntityType[];
        totalCount: number;
        page: number;
        pageSize: number;
      }>('/entities', { params: { page, pageSize } });
      return data;
    },
    keepPreviousData: true, // Keep previous data while fetching
  });
};
```bash

### Optimistic Update Hook

```typescript
export const useUpdateEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<EntityType> & { id: string }) => 
      axiosInstance.patch<EntityType>(`/entities/${id}`, data),
    onMutate: async (updatedEntity) => {
      await queryClient.cancelQueries({ queryKey: ['entities'] });
      
      const previousEntities = queryClient.getQueryData<EntityType[]>(['entities']);
      
      queryClient.setQueryData<EntityType[]>(['entities'], (old) =>
        old?.map(entity => 
          entity.id === updatedEntity.id ? { ...entity, ...updatedEntity } : entity
        )
      );
      
      return { previousEntities };
    },
    onError: (err, updatedEntity, context) => {
      queryClient.setQueryData(['entities'], context?.previousEntities);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
    },
  });
};
```bash

## Error Handling Template

```typescript
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 400: return 'Invalid data provided';
      case 401: return 'Please log in to continue';
      case 403: return 'Insufficient permissions';
      case 404: return 'Resource not found';
      case 500: return 'Server error. Please try again';
      default: return error.message || 'An error occurred';
    }
  }
  return 'An unexpected error occurred';
};

// Use in hooks
export const useEntity = (id: string) => {
  return useQuery({
    queryKey: ['entity', id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<EntityType>(`/entities/${id}`);
        return data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    retry: (failureCount, error: any) => {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        return false; // Don't retry client errors
      }
      return failureCount < 3;
    },
  });
};
```bash

## Best Practices

1. **Consistent query keys** - Use descriptive, hierarchical keys
2. **Proper TypeScript typing** - Define interfaces for all data
3. **Error boundaries** - Handle errors gracefully
4. **Loading states** - Provide loading feedback to users
5. **Cache strategies** - Set appropriate staleTime and cacheTime
6. **Optimistic updates** - Improve perceived performance
7. **Retry logic** - Handle temporary failures

Generate hooks that are reusable, type-safe, and follow these patterns for consistent API data management.
