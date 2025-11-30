import React, { useEffect, useState } from "react";
import {
  MinimalElegantCard,
  BoldGradientCard,
  GlassMorphismVideoCard,
  ModernDarkVideoCard,
} from "./TestimonialCard";
import type { TextTestimonial, VideoTestimonial } from "./TestimonialCard";

// Shape returned by your backend at GET /space/:shareId
type SpaceTestimonial = {
  name: string;
  role: string;
  company?: string;
  photoUrl?: string;
  text?: string;
  muxPlaybackId?: string;
  created: string;
};

interface SpaceResponse {
  space: {
    name: string;
    companyName: string;
    description: string;
    testimonials?: SpaceTestimonial[];
  };
}

type ProoflyVariant = "minimal" | "bold" | "glass" | "modern" | "grid";

// Backend API base URL – should include `/api`
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://proofly-backend.onrender.com/api";

interface ProoflyEmbedProps {
  shareId: string;
  backendUrl?: string; // e.g. "http://localhost:3000" or your deployed API
  variant?: ProoflyVariant;
}

export const ProoflyEmbed: React.FC<ProoflyEmbedProps> = ({
  shareId,
  backendUrl = BACKEND_URL,
  variant = "grid",
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [space, setSpace] = useState<SpaceResponse["space"] | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backendUrl}/space/${shareId}`);
        const json: SpaceResponse = await res.json();

        if (!res.ok || !json.space) {
          setError(json?.space ? "Failed to load space" : "Space not found");
          setLoading(false);
          return;
        }

        setSpace(json.space);
      } catch (e) {
        console.error("Error loading testimonial", e);
        setError("Error loading testimonial");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [shareId, backendUrl]);

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-500 bg-gray-50 rounded-lg">
        Loading testimonial
      </div>
    );
  }

  if (error || !space) {
    return (
      <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
        {error || "Testimonial not available"}
      </div>
    );
  }

  const testimonials: SpaceTestimonial[] = space.testimonials || [];

  if (testimonials.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500 bg-gray-50 rounded-lg">
        No testimonials yet for this space.
      </div>
    );
  }
  const latest = testimonials[testimonials.length - 1];

  const makeBase = (t: SpaceTestimonial, index: number) => ({
    id: index,
    name: t.name,
    role: t.role,
    company: t.company || space.companyName,
    avatar:
      t.photoUrl ||
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: t.text || space.description || "Great experience with this product!",
  });

  // Single-variant modes use only the latest testimonial
  if (variant === "minimal") {
    const testimonial: TextTestimonial = { ...makeBase(latest, 0), type: "text" };
    return <MinimalElegantCard testimonial={testimonial} />;
  }

  if (variant === "bold") {
    const testimonial: TextTestimonial = { ...makeBase(latest, 0), type: "text" };
    return <BoldGradientCard testimonial={testimonial} />;
  }

  if (variant === "glass") {
    const playbackId = latest.muxPlaybackId;
    const testimonial: VideoTestimonial = {
      ...makeBase(latest, 0),
      type: "video",
      videoUrl: playbackId
        ? `https://stream.mux.com/${playbackId}.m3u8`
        : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      videoThumbnail:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=face",
    };
    return <GlassMorphismVideoCard testimonial={testimonial} />;
  }

  if (variant === "modern") {
    const playbackId = latest.muxPlaybackId;
    const testimonial: VideoTestimonial = {
      ...makeBase(latest, 0),
      type: "video",
      videoUrl: playbackId
        ? `https://stream.mux.com/${playbackId}.m3u8`
        : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      videoThumbnail:
        "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=600&h=400&fit=crop&crop=face",
    };
    return <ModernDarkVideoCard testimonial={testimonial} />;
  }

  // grid variant: show up to four latest testimonials with all four designs
  const latestFour = testimonials.slice(-4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {latestFour.map((t, index) => {
        const base = {
          ...makeBase(t, index),
          avatar:
            t.photoUrl ||
            (index === 0
              ? "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
              : index === 1
              ? "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              : index === 2
              ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"),
        };

        if (index === 0) {
          const testimonial: TextTestimonial = { ...base, type: "text" };
          return (
            <MinimalElegantCard
              key={t.created + "minimal"}
              testimonial={testimonial}
            />
          );
        }

        if (index === 1) {
          const testimonial: TextTestimonial = { ...base, type: "text" };
          return (
            <BoldGradientCard
              key={t.created + "bold"}
              testimonial={testimonial}
            />
          );
        }

        if (index === 2) {
          const playbackId = t.muxPlaybackId;
          const testimonial: VideoTestimonial = {
            ...base,
            type: "video",
            videoUrl: playbackId
              ? `https://stream.mux.com/${playbackId}.m3u8`
              : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            videoThumbnail:
              "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=face",
          };
          return (
            <GlassMorphismVideoCard
              key={t.created + "glass"}
              testimonial={testimonial}
            />
          );
        }

        const playbackId = t.muxPlaybackId;
        const testimonial: VideoTestimonial = {
          ...base,
          type: "video",
          videoUrl: playbackId
            ? `https://stream.mux.com/${playbackId}.m3u8`
            : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoThumbnail:
            "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=600&h=400&fit=crop&crop=face",
        };
        return (
          <ModernDarkVideoCard
            key={t.created + "modern"}
            testimonial={testimonial}
          />
        );
      })}
    </div>
  );
};

export default ProoflyEmbed;
