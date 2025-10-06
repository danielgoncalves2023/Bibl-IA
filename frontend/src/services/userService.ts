import createApiClient from './api';
import type { User, UserCreatePayload } from '../types';

export class UserService {
  private getApiClient(token?: string) {
    return createApiClient(token);
  }

  async persistUser(token: string): Promise<User> {
    const api = this.getApiClient(token);
    const response = await api.post<{ message: string; user: User }>('/users/persist');
    return response.data.user;
  }

  async getCurrentUser(token: string): Promise<User> {
    const api = this.getApiClient(token);
    const response = await api.get<User>('/users/me');
    return response.data;
  }

  async getAllUsers(token: string): Promise<User[]> {
    const api = this.getApiClient(token);
    const response = await api.get<User[]>('/users');
    return response.data;
  }

  async getUserById(id: string, token: string): Promise<User> {
    const api = this.getApiClient(token);
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  }

  async getUserByAuth0Id(auth0Id: string, token: string): Promise<User> {
    const api = this.getApiClient(token);
    const response = await api.get<User>(`/users/auth0/${auth0Id}`);
    return response.data;
  }

  async getUserByEmail(email: string, token: string): Promise<User> {
    const api = this.getApiClient(token);
    const response = await api.get<User>(`/users/email/${email}`);
    return response.data;
  }

  async updateUser(id: string, userData: Partial<UserCreatePayload>, token: string): Promise<User> {
    const api = this.getApiClient(token);
    const response = await api.patch<User>(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string, token: string): Promise<void> {
    const api = this.getApiClient(token);
    await api.delete(`/users/${id}`);
  }
}

export const userService = new UserService();