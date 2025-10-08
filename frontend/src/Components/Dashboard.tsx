import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="flex items-center gap-4">
          <span className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-400">
            Starter Plan
          </span>
          <button className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">
            ✨ Upgrade
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-400">Total Videos</h2>
            <span className="text-xl">🎥</span>
          </div>
          <p className="text-2xl font-bold mt-2">0/2</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-400">Total Spaces</h2>
            <span className="text-xl">📂</span>
          </div>
          <p className="text-2xl font-bold mt-2">1</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-400">Current Plan</h2>
            <span className="text-xl">💼</span>
          </div>
          <p className="text-2xl font-bold mt-2">Starter</p>
        </div>
      </div>

      {/* Spaces Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Spaces</h2>
        <button className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">
          + Create a new space
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search testimonials by name, email, or keywords"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Spaces List */}<div>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
         <Link to="/proof">
          <h3 className="font-semibold text-lg" >bharat</h3>
          </Link>
          <p className="text-gray-400 mt-2">Videos: 0</p>
          <p className="text-gray-400">Text: 1</p>
          <div className="flex justify-end mt-4">
            <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition">
              ...
            </button>
          </div>
        </div>
        {/* Add more space cards here */}
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
