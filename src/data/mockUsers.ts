// src/data/mockUsers.ts

import type { User, ApiResponse } from '../types/User';

export const mockUsers: User[] = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    age: 28,
    email: "emily.johnson@company.com",
    phone: "+81 965-431-3024",
    username: "emilys",
    birthDate: "1996-5-30",
    gender: "female",
    role: "admin",
    image: "https://dummyjson.com/icon/emilys/128"
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Williams",
    age: 35,
    email: "michael.williams@company.com",
    phone: "+49 258-627-6644",
    username: "michaelw",
    birthDate: "1989-8-10",
    gender: "male",
    role: "admin",
    image: "https://dummyjson.com/icon/michaelw/128"
  },
  {
    id: 3,
    firstName: "Sophia",
    lastName: "Brown",
    age: 42,
    email: "sophia.brown@company.com",
    phone: "+81 210-652-2785",
    username: "sophiab",
    birthDate: "1982-11-6",
    gender: "female",
    role: "user",
    image: "https://dummyjson.com/icon/sophiab/128"
  },
  {
    id: 4,
    firstName: "James",
    lastName: "Davis",
    age: 45,
    email: "james.davis@company.com",
    phone: "+49 614-958-9364",
    username: "jamesd",
    birthDate: "1979-5-4",
    gender: "male",
    role: "user",
    image: "https://dummyjson.com/icon/jamesd/128"
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Miller",
    age: 30,
    email: "emma.miller@company.com",
    phone: "+91 759-776-1614",
    username: "emmaj",
    birthDate: "1994-6-13",
    gender: "female",
    role: "admin",
    image: "https://dummyjson.com/icon/emmaj/128"
  },
  {
    id: 6,
    firstName: "Alexander",
    lastName: "Jones",
    age: 33,
    email: "alexander.jones@company.com",
    phone: "+1 234-567-8901",
    username: "alexj",
    birthDate: "1991-3-15",
    gender: "male",
    role: "user",
    image: "https://dummyjson.com/icon/alexj/128"
  },
  {
    id: 7,
    firstName: "Isabella",
    lastName: "Garcia",
    age: 27,
    email: "isabella.garcia@company.com",
    phone: "+34 612-345-678",
    username: "isabellag",
    birthDate: "1997-7-22",
    gender: "female",
    role: "user",
    image: "https://dummyjson.com/icon/isabellag/128"
  },
  {
    id: 8,
    firstName: "William",
    lastName: "Martinez",
    age: 39,
    email: "william.martinez@company.com",
    phone: "+52 555-123-4567",
    username: "williamm",
    birthDate: "1985-12-8",
    gender: "male",
    role: "admin",
    image: "https://dummyjson.com/icon/williamm/128"
  }
];

export const mockApiResponse: ApiResponse = {
  users: mockUsers,
  total: 208,
  skip: 0,
  limit: 10
};