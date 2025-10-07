// src/pages/dashboard/ArticlesPage.tsx
import React from 'react';

const ArticlesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Article Management</h1>
      <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all mb-4">
        Add New Article
      </button>
      <p className="text-gray-500">View and manage all published or draft articles.</p>
    </div>
  );
};

export default ArticlesPage;
