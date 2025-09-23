// src/hooks/useUsers.ts

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
    queryKey: ['users', page, limit, searchQuery], // Cache key
    queryFn: () => {
      if (searchQuery && searchQuery.trim()) {
        return UserService.searchUsers(searchQuery, limit, skip);
      }
      return UserService.getUsers(limit, skip);
    },
    staleTime: 5 * 60 * 1000, // 5 minutos - los datos se consideran frescos
    gcTime: 10 * 60 * 1000, // 10 minutos - tiempo en caché
    retry: 2, // Reintentar 2 veces si falla
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
  });
};

// Hook para obtener un usuario específico (para el modal)
export const useUser = (userId: number | null) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUserById(userId!),
    enabled: !!userId, // Solo ejecutar si tenemos userId
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: 1,
  });
};