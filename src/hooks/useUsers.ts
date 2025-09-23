import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import type { ApiResponse } from '../types/User';

interface UseUsersProps {
  page?: number;
  limit?: number;
  searchQuery?: string;
}

export const useUsers = ({ page = 1, limit = 10, searchQuery }: UseUsersProps) => {
  const skip = (page - 1) * limit;

  return useQuery<ApiResponse, Error>({
    queryKey: ['users', page, limit, searchQuery],
    queryFn: () => {
      if (searchQuery && searchQuery.trim()) {
        return UserService.searchUsers(searchQuery, limit, skip);
      }
      return UserService.getUsers(limit, skip);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useUser = (userId: number | null) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUserById(userId!),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};