import { GENDER_LABELS, USER_ROLES } from '../constants';
import type { User } from '../types/User';

export const formatBirthDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export const formatGender = (gender: string): string => {
  return GENDER_LABELS[gender as keyof typeof GENDER_LABELS] || gender;
};

export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const isAdmin = (user: User): boolean => {
  return user.role === USER_ROLES.ADMIN;
};

export const formatUserRole = (role: string): string => {
  return role === USER_ROLES.ADMIN ? 'Administrador' : 'Usuario';
};

export const calculatePaginationInfo = (
  currentPage: number, 
  pageSize: number, 
  total: number
) => {
  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const startItem = total > 0 ? ((currentPage - 1) * pageSize) + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, total);

  return {
    totalPages,
    hasNextPage,
    hasPrevPage,
    startItem,
    endItem
  };
};

export const buildApiUrl = (baseUrl: string, endpoint: string, params?: Record<string, string | number>): string => {
  const url = new URL(endpoint, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value.toString());
      }
    });
  }
  
  return url.toString();
};

export const sanitizeSearchValue = (value: string): string => {
  return value.trim().replace(/\s+/g, ' ');
};

export const validatePageNumber = (page: number, totalPages: number): number => {
  return Math.max(1, Math.min(page, totalPages || 1));
};

export const validateLimit = (limit: number, maxLimit: number): number => {
  return Math.max(1, Math.min(limit, maxLimit));
};