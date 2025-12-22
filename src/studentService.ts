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
    return apiFetch<Requirement[]>("/student/requirements");
  },

  async uploadDocument(
    data: StudentDocumentUploadRequest
  ): Promise<StudentDocumentResponse> {
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
  },

  async getDocuments(): Promise<StudentDocument[]> {
    return apiFetch<StudentDocument[]>("/student/documents");
  },

  async getGraduationStatus(): Promise<GraduationStatus> {
    return apiFetch<GraduationStatus>("/student/graduation-status");
  },
};
