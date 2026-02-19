import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock axios config to avoid real HTTP
vi.mock('../axios.config', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

import authService from '../auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('isAuthenticated', () => {
    it('should return false when no token exists', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should return true when accessToken exists', () => {
      localStorageMock.setItem('accessToken', 'test-token');
      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('getAccessToken', () => {
    it('should return null when no token is stored', () => {
      expect(authService.getAccessToken()).toBeNull();
    });

    it('should return the stored access token', () => {
      localStorageMock.setItem('accessToken', 'my-access-token');
      expect(authService.getAccessToken()).toBe('my-access-token');
    });
  });

  describe('getRefreshToken', () => {
    it('should return null when no refresh token is stored', () => {
      expect(authService.getRefreshToken()).toBeNull();
    });

    it('should return the stored refresh token', () => {
      localStorageMock.setItem('refreshToken', 'my-refresh-token');
      expect(authService.getRefreshToken()).toBe('my-refresh-token');
    });
  });
});
