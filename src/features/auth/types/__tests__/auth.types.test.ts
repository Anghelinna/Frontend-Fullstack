import { describe, it, expect } from 'vitest';
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  AuthState,
} from '../auth.types';

describe('Auth Types', () => {
  describe('User type', () => {
    it('should accept a valid user object', () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        completeName: 'Test User',
      };
      expect(user.id).toBe('1');
      expect(user.email).toBe('test@example.com');
      expect(user.completeName).toBe('Test User');
      expect(user.phone).toBeUndefined();
    });

    it('should accept user with optional phone', () => {
      const user: User = {
        id: '2',
        email: 'test2@example.com',
        completeName: 'Test User 2',
        phone: '+51999888777',
      };
      expect(user.phone).toBe('+51999888777');
    });

    it('should accept user with null phone', () => {
      const user: User = {
        id: '3',
        email: 'test3@example.com',
        completeName: 'Test User 3',
        phone: null,
      };
      expect(user.phone).toBeNull();
    });
  });

  describe('LoginCredentials type', () => {
    it('should accept valid login credentials', () => {
      const creds: LoginCredentials = {
        email: 'user@example.com',
        password: 'SecurePass1',
      };
      expect(creds.email).toBe('user@example.com');
      expect(creds.password).toBe('SecurePass1');
    });
  });

  describe('RegisterCredentials type', () => {
    it('should accept valid register credentials', () => {
      const creds: RegisterCredentials = {
        email: 'newuser@example.com',
        password: 'NewPass123',
        completeName: 'New User',
      };
      expect(creds.completeName).toBe('New User');
    });

    it('should accept register credentials with optional phone', () => {
      const creds: RegisterCredentials = {
        email: 'newuser@example.com',
        password: 'NewPass123',
        completeName: 'New User',
        phone: '+51123456789',
      };
      expect(creds.phone).toBe('+51123456789');
    });
  });

  describe('AuthResponse type', () => {
    it('should accept a valid auth response', () => {
      const response: AuthResponse = {
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
        user: {
          id: '1',
          email: 'test@example.com',
          completeName: 'Test User',
        },
      };
      expect(response.accessToken).toBeTruthy();
      expect(response.refreshToken).toBeTruthy();
      expect(response.user.id).toBe('1');
    });
  });

  describe('AuthState type', () => {
    it('should represent unauthenticated state', () => {
      const state: AuthState = {
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      };
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it('should represent authenticated state', () => {
      const state: AuthState = {
        user: {
          id: '1',
          email: 'test@example.com',
          completeName: 'Test User',
        },
        accessToken: 'token-value',
        isAuthenticated: true,
        isLoading: false,
      };
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.email).toBe('test@example.com');
    });

    it('should represent loading state', () => {
      const state: AuthState = {
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: true,
      };
      expect(state.isLoading).toBe(true);
    });
  });
});
