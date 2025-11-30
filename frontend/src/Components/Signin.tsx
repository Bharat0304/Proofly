import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// Backend API base URL – should point to Express server `/api`
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://proofly-backend.onrender.com/api";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log('Signin attempt with username:', username);

    try {
      console.log('Sending signin request to:', `${BACKEND_URL}/auth/signin`);
      const res = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      let data;
      try {
        data = await res.json();
        console.log('Signin response status:', res.status, 'Data:', data);
      } catch (e) {
        console.error('Failed to parse signin response:', e);
        setError("Invalid response from server");
        return;
      }
      
      if (!res.ok) {
        const errorMsg = data.msg || "Failed to sign in. Please check your credentials.";
        console.error('Signin failed:', errorMsg);
        setError(errorMsg);
        return;
      }

      // Store the token in localStorage
      if (data.token) {
        console.log('Received token, storing in localStorage');
        localStorage.setItem("token", data.token);
        console.log('Token stored, navigating to /dashboard');
      } else {
        console.warn('No token received in signin response');
      }
      
      // Redirect to dashboard on successful signin
      alert("Signin successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signin error", err);
      alert("Error during signin. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
        )}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
