// src/types/User.ts

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  gender: 'male' | 'female';
  role: 'admin' | 'user';
  image: string;
}

// AGREGAR ESTO SI NO LO TIENES:
export interface ApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}