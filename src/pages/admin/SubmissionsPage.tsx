import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, RefreshCcw, FileText } from "lucide-react";

interface Submission {
  id: string;
  status: string;
  manuscriptTitle: string | null;
  abstract: string | null;
  keywords: string | null;
  createdAt: string;
  submittedAt: string | null;
  user: { firstName: string; lastName: string; email: string } | null;
  authors: { fullName: string; email: string; affiliation: string }[];
  files: { fileName: string; fileUrl: string; fileType: string }[];
}

export default function SubmissionDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const API_URL ="https://mds-journal-backend.vercel.app/api/v1/submission";

  // Fetch submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You must be logged in to view submissions.");
        return;
      }
      console.log("Token",token)
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      setSubmissions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      alert("Failed to fetch submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Delete submission
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubmissions();
    } catch (err) {
      console.error("Error deleting submission:", err);
      alert("Failed to delete submission.");
    }
  };

  // Filter submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const searchMatch =
        s.manuscriptTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.authors.some((a) =>
          a.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return searchMatch;
    });
  }, [submissions, searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

return (
  <div className="min-h-screen w-full py-10">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 max-w-8xl mx-auto">
      <h1 className="text-2xl font-semibold">📂 Submissions</h1>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={fetchSubmissions}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>

    {/* Submissions Table */}
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md max-w-8xl mx-auto">
      <Table className="min-w-full text-left">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-left">Title</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-left">Authors</TableHead>
            <TableHead className="text-left">Files</TableHead>
            <TableHead className="text-left">Keywords</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center">Submitted At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                Loading submissions...
              </TableCell>
            </TableRow>
          ) : currentSubmissions.length > 0 ? (
            currentSubmissions.map((s) => (
              <TableRow
                key={s.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium truncate max-w-xs">
                  {s.manuscriptTitle || "—"}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      s.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : s.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {s.status}
                  </span>
                </TableCell>
                <TableCell className="truncate max-w-xs">
                  {s.authors.map((a) => a.fullName).join(", ") || "—"}
                </TableCell>
                <TableCell className="flex flex-col gap-1">
                  {s.files.map((f) => (
                    <Button
                      key={f.fileName}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => window.open(f.fileUrl, "_blank")}
                    >
                      <FileText className="h-4 w-4" />
                      {f.fileName}
                    </Button>
                  ))}
                </TableCell>
                <TableCell className="truncate max-w-xs">{s.keywords || "—"}</TableCell>
                <TableCell className="text-center">
                  {new Date(s.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex items-center gap-1"
                    onClick={() => handleDelete(s.id)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                No submissions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    {/* Pagination */}
    {filteredSubmissions.length > itemsPerPage && (
      <div className="flex justify-center mt-4 gap-2 max-w-6xl mx-auto">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span className="px-4 py-1 text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    )}
  </div>
);

}
