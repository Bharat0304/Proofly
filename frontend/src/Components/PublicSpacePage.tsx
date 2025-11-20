import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoRecord from "./VideoRecorder";
import { TestimonialInfo } from "./testimonialinfo";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface SpaceResponse {
  space: {
    name: string;
    companyName: string;
    description: string;
  };
}

export function PublicSpacePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [space, setSpace] = useState<SpaceResponse["space"] | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSpace = async () => {
      if (!shareId) {
        setError("Missing space id");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/space/${shareId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data?.msg || "Failed to load space");
          setLoading(false);
          return;
        }

        setSpace(data.space);
      } catch (e) {
        console.error("Error loading space", e);
        setError("Error loading space");
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p>Loading space...</p>
      </div>
    );
  }

  if (error || !space) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p>{error || "Space not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">{space.companyName}</h1>
          <h2 className="text-xl text-gray-300 mb-2">{space.name}</h2>
          <p className="text-gray-400 whitespace-pre-wrap">{space.description}</p>
        </header>

        <section className="bg-gray-800 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Your Details</h3>
          <TestimonialInfo
            name={name}
            role={role}
            company={company}
            photoUrl={photoUrl}
            text={text}
            onNameChange={setName}
            onRoleChange={setRole}
            onCompanyChange={setCompany}
            onPhotoUrlChange={setPhotoUrl}
            onTextChange={setText}
          />
        </section>

        <section>
          <VideoRecord
            shareId={shareId || ""}
            onUploadComplete={async () => {
              if (!shareId) return;

              try {
                const res = await fetch(`${BACKEND_URL}/space/${shareId}/testimonials`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name, role, company, photoUrl, text }),
                });

                if (!res.ok) {
                  console.error("Failed to save testimonial meta");
                } else {
                  setSaved(true);
                }
              } catch (e) {
                console.error("Error saving testimonial meta", e);
              }
            }}
          />
          {saved && (
            <p className="text-sm text-green-400 mt-2">
              Thank you! Your testimonial details have been saved.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default PublicSpacePage;
