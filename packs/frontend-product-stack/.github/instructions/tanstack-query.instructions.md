# TanStack Query (React Query) Patterns

Use TanStack Query for server state management with proper caching, synchronization, and error handling.

## Query Patterns

### Basic Query Hook

```typescript
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from './axios';

interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUser = async (userId: string): Promise<User> => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // Only run query if userId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

### Query with Dependencies

```typescript
export const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: ['user-posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId, // Dependent on userId
    select: (posts) => posts.filter(post => post.published), // Transform data
  });
};
```

### Pagination Query

```typescript
interface PostsResponse {
  posts: Post[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export const usePosts = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['posts', page, pageSize],
    queryFn: () => fetchPosts(page, pageSize),
    keepPreviousData: true, // Keep previous data while fetching new data
  });
};
```

## Mutation Patterns

### Basic Mutation

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreatePostData {
  title: string;
  content: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostData) => axiosInstance.post('/posts', data),
    onSuccess: () => {
      // Invalidate and refetch posts query
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
};
```

### Optimistic Updates

```typescript
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Post> & { id: string }) => 
      axiosInstance.patch(`/posts/${id}`, data),
    onMutate: async (updatedPost) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      
      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts']);
      
      // Optimistically update to the new value
      queryClient.setQueryData(['posts'], (old: Post[]) =>
        old?.map(post => 
          post.id === updatedPost.id ? { ...post, ...updatedPost } : post
        )
      );
      
      return { previousPosts };
    },
    onError: (err, updatedPost, context) => {
      // Rollback on error
      queryClient.setQueryData(['posts'], context?.previousPosts);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
```

## Query Configuration

### Global Query Client Setup

```typescript
// src/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### Error Handling

```typescript
export const useUserWithErrorHandling = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
    onError: (error) => {
      // Handle specific error cases
      if (error.response?.status === 404) {
        // User not found - handle appropriately
      }
    },
  });
};
```

## Query Keys Strategy

Use consistent query key patterns:

```typescript
// Good query key patterns
['user', userId] // Single resource
['users', { page, pageSize }] // List with filters
['posts', 'published'] // Filtered list
['user', userId, 'posts'] // Nested resource

// Bad query keys
['getUser'] // Too generic
['user-data'] // Not specific enough
```

## Data Transformation

Use the `select` option for data transformation:

```typescript
export const useUsersList = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    select: (users: User[]) => ({
      active: users.filter(user => user.isActive),
      inactive: users.filter(user => !user.isActive),
      total: users.length,
    }),
  });
};
```

## Infinite Queries

For infinite scroll or pagination:

```typescript
export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ['infinite-posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
```
