import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Backend API base URL – should point to Express server `/api`
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://proofly-backend.onrender.com/api";

interface SpaceItem {
  id: string;
  name: string;
  shareUrl: string;
  shareId: string;
  testimonialsCount: number;
}

export function Dashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [spaces, setSpaces] = useState<SpaceItem[]>([]);
  const [embedForId, setEmbedForId] = useState<string | null>(null);
  const [variantBySpace, setVariantBySpace] = useState<
    Record<string, "minimal" | "bold" | "glass" | "modern" | "grid">
  >({});
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('Dashboard mounted. Token from localStorage:', token ? 'Token exists' : 'No token found');
    
    if (!token) {
      console.log('No token found, redirecting to signin');
      navigate('/signin');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const loadSpaces = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        console.log('Fetching spaces from:', `${BACKEND_URL}/workspaces`);
        console.log('Using token:', token);
        
        const res = await fetch(`${BACKEND_URL}/workspaces`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include' // Important for cookies if using httpOnly
        });
        
        console.log('Spaces API response status:', res.status);

        if (res.status === 401) {
          const errorText = await res.text();
          console.error('401 Unauthorized. Response:', errorText);
          localStorage.removeItem('token');
          navigate('/signin');
          return;
        }

        if (!res.ok) {
          console.error('Failed to fetch spaces:', await res.text());
          return;
        }

        const data = await res.json();

        const mapped: SpaceItem[] = (data.spaces || []).map((s: any) => ({
          id: s._id,
          name: s.name,
          shareUrl: `${window.location.origin}/space/${s.shareId}`,
          shareId: s.shareId,
          testimonialsCount: (s.testimonials || []).length,
        }));

        setSpaces(mapped);
      } catch (e) {
        console.error("Error loading spaces", e);
      }
    };

    loadSpaces();
  }, []);

  const handleCreateSpace = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be signed in to create a space.");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch(`${BACKEND_URL}/workspaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: spaceName,
          companyName,
          description,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        alert((data as any)?.msg || "Failed to create space");
        return;
      }

      const newSpace: SpaceItem = {
        id: data.space._id,
        name: data.space.name,
        shareUrl: data.shareUrl,
        shareId: data.space.shareId,
        testimonialsCount: 0,
      };

      setSpaces((prev) => [newSpace, ...prev]);
      setSpaceName("");
      setCompanyName("");
      setDescription("");
      setShowCreateForm(false);
    } catch (e) {
      console.error("Create space error", e);
      alert("Error creating space. Check console.");
    } finally {
      setCreating(false);
    }
  };

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
        <button
          className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
          onClick={() => setShowCreateForm(true)}
        >
          + Create a new space
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 bg-gray-800 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">New Space</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Space name</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="e.g. Customer Testimonials"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Company name</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Description / Instructions</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell people what kind of testimonial you want."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                type="button"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600"
                type="button"
                disabled={creating}
                onClick={handleCreateSpace}
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search testimonials by name, email, or keywords"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Spaces List */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spaces.map((space) => {
            const variant = variantBySpace[space.id] ?? "grid";
            const embedUrl = `${window.location.origin}/embed/${space.shareId}?variant=${variant}`;
            const iframeSnippet = `<iframe\n  src="${embedUrl}"\n  width="640"\n  height="360"\n  frameborder="0"\n  style="border:0; width:100%; max-width:640px; border-radius:16px; overflow:hidden;"\n  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n  allowfullscreen\n></iframe>`;
            const reactSnippet = `import { ProoflyEmbed } from "./ProoflyEmbed";

export function TestimonialSection() {
  return (
    <ProoflyEmbed
      shareId="${space.shareId}"
      backendUrl="${BACKEND_URL}"
      variant="${variant}"
    />
  );
}`;
            return (
              <div key={space.id} className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition space-y-2">
                <h3 className="font-semibold text-lg">{space.name}</h3>
                <p className="text-gray-400 text-sm">
                  Testimonials: {space.testimonialsCount}
                </p>
                <p className="text-gray-400 mt-1 break-all text-sm">Share link:</p>
                <a
                  href={space.shareUrl}
                  className="text-indigo-400 break-all text-sm hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {space.shareUrl}
                </a>
                {space.testimonialsCount > 0 && (
                  <div className="mt-2">
                    <button
                      className="px-3 py-1 text-xs bg-gray-700 rounded-lg hover:bg-gray-600"
                      type="button"
                      onClick={() => setEmbedForId(embedForId === space.id ? null : space.id)}
                    >
                      {embedForId === space.id ? "Hide embed code" : "Show embed code"}
                    </button>
                    {embedForId === space.id && (
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-2 items-center text-xs text-gray-300">
                          <span>Design:</span>
                          <button
                            type="button"
                            className={`px-2 py-1 rounded border ${
                              variant === "minimal" ? "border-indigo-400 bg-indigo-500/20" : "border-gray-600"
                            }`}
                            onClick={() =>
                              setVariantBySpace((prev) => ({ ...prev, [space.id]: "minimal" }))
                            }
                          >
                            Minimal
                          </button>
                          <button
                            type="button"
                            className={`px-2 py-1 rounded border ${
                              variant === "bold" ? "border-indigo-400 bg-indigo-500/20" : "border-gray-600"
                            }`}
                            onClick={() =>
                              setVariantBySpace((prev) => ({ ...prev, [space.id]: "bold" }))
                            }
                          >
                            Bold
                          </button>
                          <button
                            type="button"
                            className={`px-2 py-1 rounded border ${
                              variant === "glass" ? "border-indigo-400 bg-indigo-500/20" : "border-gray-600"
                            }`}
                            onClick={() =>
                              setVariantBySpace((prev) => ({ ...prev, [space.id]: "glass" }))
                            }
                          >
                            Glass (video)
                          </button>
                          <button
                            type="button"
                            className={`px-2 py-1 rounded border ${
                              variant === "modern" ? "border-indigo-400 bg-indigo-500/20" : "border-gray-600"
                            }`}
                            onClick={() =>
                              setVariantBySpace((prev) => ({ ...prev, [space.id]: "modern" }))
                            }
                          >
                            Modern (video)
                          </button>
                          <button
                            type="button"
                            className={`px-2 py-1 rounded border ${
                              variant === "grid" ? "border-indigo-400 bg-indigo-500/20" : "border-gray-600"
                            }`}
                            onClick={() =>
                              setVariantBySpace((prev) => ({ ...prev, [space.id]: "grid" }))
                            }
                          >
                            Grid (4 cards)
                          </button>
                        </div>
                        <p className="text-gray-400 text-xs">Iframe snippet:</p>
                        <pre className="text-xs bg-black/40 p-2 rounded border border-gray-700 overflow-x-auto">
{iframeSnippet}
                        </pre>
                        <p className="text-gray-400 text-xs mt-2">React (TypeScript) snippet:</p>
                        <pre className="text-xs bg-black/40 p-2 rounded border border-gray-700 overflow-x-auto">
{reactSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
