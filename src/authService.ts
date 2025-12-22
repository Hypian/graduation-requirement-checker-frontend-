// Auth service matching backend contract
import { apiFetch, setAuthToken } from "./apiClient";
import { AuthLoginRequest, AuthLoginResponse, User } from "./types";

export const authService = {
  async login(data: AuthLoginRequest): Promise<AuthLoginResponse> {
    const res = await apiFetch<AuthLoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setAuthToken(res.token);
    return res;
  },

  async getMe(): Promise<User> {
    return apiFetch<User>("/auth/me");
  },

  setToken(token: string | null) {
    setAuthToken(token);
  },
};
