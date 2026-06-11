import axios from 'axios';

// Base URL for API calls. Vite can inject VITE_API_URL at build time; fallback to relative '/api' for both dev (vercel dev) and production.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ContactInput {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export const sendContact = async (data: ContactInput) => {
  const response = await api.post<{ message: string; contactId: string }>('/contact', data);
  return response.data;
};

export const getContacts = async () => {
  const response = await api.get<ContactResponse[]>('/contact');
  return response.data;
};

export const getContact = async (id: string) => {
  const response = await api.get<ContactResponse>(`/contact/${id}`);
  return response.data;
};

export const updateContactStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
  const response = await api.put<ContactResponse>(`/contact/${id}`, { status });
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await api.delete<{ message: string }>(`/contact/${id}`);
  return response.data;
};

export default {
  sendContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
};
