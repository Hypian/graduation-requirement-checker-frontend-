import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";
import { ErrorBoundary } from "./ErrorBoundary";
// Page imports (to be created)
// Placeholder imports for pages
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const StudentDashboard = React.lazy(() => import("./pages/student/Dashboard"));
const StudentUploadDocuments = React.lazy(
  () => import("./pages/student/UploadDocuments")
);
const StudentStatus = React.lazy(() => import("./pages/student/Status"));
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AdminRequirements = React.lazy(
  () => import("./pages/admin/Requirements")
);
const AdminReviewSubmissions = React.lazy(
  () => import("./pages/admin/ReviewSubmissions")
);

const ReviewSubmissions: React.FC = () => {
  return <div>Review Submissions Page</div>;
};

function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: string;
}) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </React.Suspense>
        }
      />
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="STUDENT">
            <React.Suspense fallback={<div>Loading...</div>}>
              <StudentDashboard />
            </React.Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/upload-documents"
        element={
          <ProtectedRoute role="STUDENT">
            <React.Suspense fallback={<div>Loading...</div>}>
              <StudentUploadDocuments />
            </React.Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/status"
        element={
          <ProtectedRoute role="STUDENT">
            <React.Suspense fallback={<div>Loading...</div>}>
              <StudentStatus />
            </React.Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <React.Suspense fallback={<div>Loading...</div>}>
              <AdminDashboard />
            </React.Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/requirements"
        element={
          <ProtectedRoute role="ADMIN">
            <React.Suspense fallback={<div>Loading...</div>}>
              <AdminRequirements />
            </React.Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/review-submissions"
        element={
          <ProtectedRoute role="ADMIN">
            <React.Suspense fallback={<div>Loading...</div>}>
              <AdminReviewSubmissions />
            </React.Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Navigate
            to={
              user
                ? user.role === "ADMIN"
                  ? "/admin/dashboard"
                  : "/student/dashboard"
                : "/login"
            }
            replace
          />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
