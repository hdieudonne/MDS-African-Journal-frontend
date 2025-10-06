// src/pages/dashboard/SubmissionsPage.tsx
import React, { useEffect, useState } from 'react';

interface Submission {
  id: number;
  manuscriptTitle: string;
  category: string;
  status: string;
  date: string;
}

const SubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/submission/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const json = await res.json();
      setSubmissions(json.data || []);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Submissions</h1>
      <table className="min-w-full border-collapse bg-white rounded-lg shadow-md text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.manuscriptTitle}</td>
              <td className="p-3">{s.category}</td>
              <td className="p-3">{s.status}</td>
              <td className="p-3">{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsPage;
