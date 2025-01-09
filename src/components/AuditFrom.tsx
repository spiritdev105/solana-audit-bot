// components/AuditForm.tsx
import { useState } from "react";

const AuditForm = () => {
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReport([]);

    try {
      const response = await fetch(`/api/audit/${address}`);
      if (!response.ok) {
        throw new Error("Failed to fetch audit report");
      }
      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Smart Contract Audit</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Smart Contract Address"
          className="border p-2 mb-4 text-black"
          color="black"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {loading ? "Loading..." : "Get Audit Report"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {report.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Audit Report</h2>
          <ul className="list-disc pl-5">
            {report.map((vulnerability, index) => (
              <li key={index} className="mb-2">
                <strong>Issue:</strong> {vulnerability.issue} <br />
                <strong>Severity:</strong> {vulnerability.severity} <br />
                <strong>Recommendation:</strong> {vulnerability.recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuditForm;
