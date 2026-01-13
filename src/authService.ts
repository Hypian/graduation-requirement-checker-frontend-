// Auth service matching backend contract
import { apiFetch, setAuthToken } from "./apiClient";
import { AuthLoginRequest, AuthLoginResponse, User } from "./types";

export const authService = {
  async login(data: AuthLoginRequest): Promise<AuthLoginResponse> {
    // MOCK LOGIN
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    
    // Determine role based on email for testing purposes
    const isAdmin = data.email.includes("admin");
    const mockUser: User = {
      id: isAdmin ? "admin-123" : "student-123",
      email: data.email,
      fullName: isAdmin ? "Admin User" : "Student User",
      role: isAdmin ? "ADMIN" : "STUDENT",
    };

    const mockResponse: AuthLoginResponse = {
      token: "mock-jwt-token-123456",
      user: mockUser,
    };

    this.setToken(mockResponse.token);
    return mockResponse;
  },

  async getMe(): Promise<User> {
    // MOCK GET ME
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Default to student if no way to tell, but usually strictly called after login
    // For refresh pattern, we'll return a static user
    return {
      id: "student-123", // Default to student for refresh in this simple mock
      email: "mock@example.com",
      fullName: "Mock User", 
      role: "STUDENT",
    }; 
  },

  setToken(token: string | null) {
    setAuthToken(token);
  },
};
