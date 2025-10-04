import React, { useEffect, useState } from 'react';
import { Menu, LogOut, FileText, Users, Home, Settings, BookOpen, Award, X } from 'lucide-react';

interface Submission {
  id: number;
  manuscriptTitle: string;
  category: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  date: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-start w-full">
    <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
    <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
  </div>
);

const Sidebar: React.FC<{ active: string; onSelect: (menu: string) => void; isOpen: boolean; toggle: () => void }> = ({ active, onSelect, isOpen, toggle }) => {
  const menus = [
    { name: 'Dashboard', icon: <Home size={18} /> },
    { name: 'Submissions', icon: <FileText size={18} /> },
    { name: 'Users', icon: <Users size={18} /> },
    { name: 'Editorial Board', icon: <Award size={18} /> },
    { name: 'Archive', icon: <BookOpen size={18} /> },
  
  ];

  return (
    <aside className={`bg-blue-900 text-white w-64 h-screen flex flex-col justify-between fixed top-0 p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}> 
      <div>
        <div className="flex justify-between items-center mb-12">
          <span className="text-3xl font-bold tracking-tight">MDS </span>
          <button className="md:hidden" onClick={toggle}><X size={24} /></button>
        </div>
        <nav className="flex flex-col gap-3">
          {menus.map((m) => (
            <button
              key={m.name}
              onClick={() => onSelect(m.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-blue-800 ${active === m.name ? 'bg-blue-700' : ''}`}
            >
              {m.icon}
              <span className="font-medium">{m.name}</span>
            </button>
          ))}
        </nav>
      </div>
      <button className="flex items-center justify-center gap-2 mt-10 p-3 text-sm bg-red-600 rounded-xl hover:bg-red-700 transition-all">
        <LogOut size={16} /> Logout
      </button>
    </aside>
  );
};

const Dashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/submission/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((res) => res.json())
      .then((data) => setSubmissions(data || []))
      .catch(() => setSubmissions([]));
  }, []);

  const total = submissions.length;
  const accepted = submissions.filter((s) => s.status === 'Accepted').length;
  const pending = submissions.filter((s) => s.status === 'Pending').length;
  const rejected = submissions.filter((s) => s.status === 'Rejected').length;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar active={activeMenu} onSelect={setActiveMenu} isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />

      <main className="flex-1 ml-0 md:ml-64 p-6">
        <div className="md:hidden mb-4">
          <button onClick={() => setSidebarOpen(true)} className="bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Menu size={20} /> Menu
          </button>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl sm:text-2xl font-bold text-gray-800 mb-2">{activeMenu}</h1>
          <p className="text-gray-500 text-md">Welcome back to your MDS African Journal of Applied Economics and Development Dashboard</p>
        </header>

        {activeMenu === 'Dashboard' && (
          <div className="grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6 mb-8">
            <StatCard title="Total Submissions" value={total} />
            <StatCard title="Accepted" value={accepted} />
            <StatCard title="Pending" value={pending} />
            <StatCard title="Rejected" value={rejected} />
          </div>
        )}

        {activeMenu === 'Submissions' && (
          <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">All Submissions</h3>
            <table className="min-w-full border-collapse text-sm">
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
                    <td className="p-3 font-medium text-gray-800">{s.manuscriptTitle}</td>
                    <td className="p-3">{s.category}</td>
                    <td className={`p-3 font-medium ${s.status === 'Accepted' ? 'text-green-600' : s.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{s.status}</td>
                    <td className="p-3 text-gray-500">{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMenu === 'Users' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">User Management</h3>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        )}

        {activeMenu === 'Editorial Board' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Editorial Board Members</h3>
            <p className="text-gray-500">List of editorial members and roles will be shown here.</p>
          </div>
        )}

        {activeMenu === 'Archive' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Archive</h3>
            <p className="text-gray-500">Access all past submissions and journals here.</p>
          </div>
        )}

        {activeMenu === 'Settings' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <p className="text-gray-500">Manage dashboard preferences and account settings.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;