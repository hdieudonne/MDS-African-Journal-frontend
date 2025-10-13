import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

const NewsletterDashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const token = localStorage.getItem("access_token");
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch subscribers
  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${API_URL}/newsletter/subscribers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscribers(res.data.data.subscribers || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers.");
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // 📬 Send Newsletter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/newsletter/send`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Newsletter sent successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error sending newsletter:", error);
      toast.error("Failed to send newsletter.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Mail className="text-blue-600" /> Newsletter Management
      </h1>

      {/* ✨ Newsletter Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 mb-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring"
            placeholder="Weekly News..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-2 h-32 focus:outline-none focus:ring"
            placeholder="Write your newsletter content..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Newsletter
        </button>
      </form>

      {/* 📨 Subscribers Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b bg-gray-50">
          Subscribers ({subscribers.length})
        </h2>
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No subscribers found
                </td>
              </tr>
            ) : (
              subscribers.map((sub, index) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{sub.email}</td>
                  <td className="p-3 border-b">
                    {new Date(sub.subscribedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterDashboard;
