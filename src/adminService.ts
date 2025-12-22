// Admin service matching backend contract
import { apiFetch } from "./apiClient";
import {
  Requirement,
  AdminSubmission,
  AdminReviewRequest,
  AdminFinalizeRequest,
} from "./types";

export const adminService = {
  async getRequirements(): Promise<Requirement[]> {
    return apiFetch<Requirement[]>("/admin/requirements");
  },

  async createRequirement(data: {
    title: string;
    description: string;
  }): Promise<Requirement> {
    return apiFetch<Requirement>("/admin/requirements", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getSubmissions(): Promise<AdminSubmission[]> {
    return apiFetch<AdminSubmission[]>("/admin/submissions");
  },

  async reviewSubmission(
    documentId: string,
    data: AdminReviewRequest
  ): Promise<void> {
    await apiFetch<void>(`/admin/submissions/${documentId}/review`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async finalizeStudent(
    studentId: string,
    data: AdminFinalizeRequest
  ): Promise<void> {
    await apiFetch<void>(`/admin/students/${studentId}/finalize`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
