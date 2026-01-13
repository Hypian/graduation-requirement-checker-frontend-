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
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { id: "req-1", title: "Final Thesis", description: "Submit your final thesis PDF" },
      { id: "req-2", title: "Clearance Form", description: "Library and Hostel clearance" },
      { id: "req-3", title: "Fee Receipt", description: "Proof of final tuition payment" },
    ];
    // return apiFetch<Requirement[]>("/admin/requirements");
  },

  async createRequirement(data: {
    title: string;
    description: string;
  }): Promise<Requirement> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: `req-${Date.now()}`,
      title: data.title,
      description: data.description,
    };
    /*
    return apiFetch<Requirement>("/admin/requirements", {
      method: "POST",
      body: JSON.stringify(data),
    });
    */
  },

  async getSubmissions(): Promise<AdminSubmission[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { documentId: "doc-1", studentName: "John Doe", requirementTitle: "Final Thesis", fileUrl: "#", status: "PENDING" },
      { documentId: "doc-2", studentName: "Jane Smith", requirementTitle: "Fee Receipt", fileUrl: "#", status: "APPROVED" },
    ];
    // return apiFetch<AdminSubmission[]>("/admin/submissions");
  },

  async reviewSubmission(
    documentId: string,
    data: AdminReviewRequest
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Simulate network delay
    /*
    await apiFetch<void>(`/admin/submissions/${documentId}/review`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    */
  },

  async finalizeStudent(
    studentId: string,
    data: AdminFinalizeRequest
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    /*
    await apiFetch<void>(`/admin/students/${studentId}/finalize`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    */
  },
};
