import React, { useEffect, useState } from "react";
import { studentService } from "../../studentService";
import { GraduationStatus } from "../../types";
import "./Status.css";

const StudentStatus: React.FC = () => {
  const [status, setStatus] = useState<GraduationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    studentService
      .getGraduationStatus()
      .then(setStatus)
      .catch(() => setError("Failed to load status"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="status-loading">Loading...</div>;
  if (error) return <div className="status-error">{error}</div>;
  return (
    <div className="status-container">
      <h2>Graduation Eligibility Status</h2>
      <div
        className={status?.eligible ? "status-eligible" : "status-not-eligible"}
      >
        {status?.eligible
          ? "You are eligible to graduate!"
          : "You are NOT eligible to graduate yet."}
      </div>
    </div>
  );
};

export default StudentStatus;
