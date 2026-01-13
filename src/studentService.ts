// Student service matching backend contract
import { apiFetch } from "./apiClient";
import {
  Requirement,
  StudentDocumentUploadRequest,
  StudentDocumentResponse,
  StudentDocument,
  GraduationStatus,
} from "./types";

export const studentService = {
  async getRequirements(): Promise<Requirement[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { id: "req-1", title: "Final Thesis", description: "Submit your final thesis PDF" },
      { id: "req-2", title: "Clearance Form", description: "Library and Hostel clearance" },
      { id: "req-3", title: "Fee Receipt", description: "Proof of final tuition payment" },
    ];
    // return apiFetch<Requirement[]>("/student/requirements");
  },

  async uploadDocument(
    data: StudentDocumentUploadRequest
  ): Promise<StudentDocumentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      id: `doc-${Date.now()}`,
      status: "PENDING",
    };
    /*
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("requirementId", data.requirementId);
    return apiFetch<StudentDocumentResponse>(
      "/student/documents",
      {
        method: "POST",
        body: formData,
        // Content-Type will be set automatically by browser
      },
      false
    );
    */
  },

  async getDocuments(): Promise<StudentDocument[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { id: "doc-1", requirementTitle: "Final Thesis", status: "APPROVED", reviewComment: "Great work" },
      { id: "doc-2", requirementTitle: "Clearance Form", status: "PENDING", reviewComment: null },
    ];
    // return apiFetch<StudentDocument[]>("/student/documents");
  },

  async getGraduationStatus(): Promise<GraduationStatus> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { eligible: false };
    // return apiFetch<GraduationStatus>("/student/graduation-status");
  },
};
