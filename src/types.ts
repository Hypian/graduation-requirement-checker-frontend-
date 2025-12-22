// Types strictly matching backend API contract

export type UserRole = "STUDENT" | "ADMIN";

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
  user: User;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
}

export interface StudentDocumentUploadRequest {
  file: File;
  requirementId: string;
}

export type DocumentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface StudentDocumentResponse {
  id: string;
  status: DocumentStatus;
}

export interface StudentDocument {
  id: string;
  requirementTitle: string;
  status: DocumentStatus;
  reviewComment: string | null;
}

export interface GraduationStatus {
  eligible: boolean;
}

export interface AdminSubmission {
  documentId: string;
  studentName: string;
  requirementTitle: string;
  fileUrl: string;
  status: DocumentStatus;
}

export interface AdminReviewRequest {
  status: Exclude<DocumentStatus, "PENDING">;
  comment: string;
}

export interface AdminFinalizeRequest {
  graduationEligible: boolean;
}
