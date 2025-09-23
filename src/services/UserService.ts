import { API_CONFIG } from '../constants';
import { buildApiUrl } from '../utils';
import type { ApiResponse } from '../types/User';

export class UserService {
  
  static async getUsers(limit = 10, skip = 0) {
    try {
      const url = buildApiUrl(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.USERS, {
        limit,
        skip
      });
      
      const response = await fetch(url);
      
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

  static async searchUsers(query: string, limit = 10, skip = 0) {
    try {
      if (!query.trim()) {
        return this.getUsers(limit, skip);
      }

      const url = buildApiUrl(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.USERS_SEARCH, {
        q: encodeURIComponent(query),
        limit,
        skip
      });
      
      const response = await fetch(url);
      
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

  static async getUserById(id: number) {
    try {
      const url = buildApiUrl(API_CONFIG.BASE_URL, `${API_CONFIG.ENDPOINTS.USER_BY_ID}/${id}`);
      
      const response = await fetch(url);
      
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