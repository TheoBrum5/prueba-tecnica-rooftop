// src/services/UserService.ts

import type { ApiResponse } from '../types/User';

const BASE_URL = 'https://dummyjson.com';

export class UserService {
  
  // Obtener todos los usuarios con paginación
  static async getUsers(limit = 10, skip = 0) {
    try {
      const response = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Buscar usuarios por nombre
  static async searchUsers(query: string, limit = 10, skip = 0) {
    try {
      if (!query.trim()) {
        // Si no hay query, devolver usuarios normales
        return this.getUsers(limit, skip);
      }

      const response = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Obtener usuario por ID (para el modal)
  static async getUserById(id: number) {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }
}