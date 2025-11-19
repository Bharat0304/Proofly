import React, { useEffect, useState } from "react";
import { Star, Quote, MessageSquare } from "lucide-react";

// Shape returned by your backend at GET /space/:shareId
interface SpaceResponse {
  space: {
    name: string;
    companyName: string;
    description: string;
    testimonials?: {
      name: string;
      role: string;
      created: string;
    }[];
  };
}

type ProoflyVariant = "minimal" | "bold";

interface ProoflyEmbedProps {
  shareId: string;
  backendUrl?: string; // e.g. "http://localhost:3000" or your deployed API
  variant?: ProoflyVariant;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex space-x-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const MinimalElegantCard: React.FC<{
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
}> = ({ name, role, company, content, rating = 5 }) => (
  <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-l-3xl" />

    <div className="pl-4">
      <Quote className="w-10 h-10 text-blue-500 mb-4 opacity-50" />

      <p className="text-gray-700 text-base leading-relaxed mb-6 italic">
        {content}
      </p>

      <div className="mb-6">
        <StarRating rating={rating} />
      </div>

      <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="text-gray-900 font-semibold">{name}</h4>
          <p className="text-gray-500 text-sm">
            {role} at {company}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const BoldGradientCard: React.FC<{
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
}> = ({ name, role, company, content, rating = 5 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-[2px] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl p-8 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <StarRating rating={rating} />
        </div>

        <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
          {content}
        </p>

        <div className="flex items-center space-x-4">
          <div
            className={`w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white transition-all duration-300 ${
              isHovered ? "scale-110" : ""
            }`}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-gray-900 font-bold text-lg">{name}</h4>
            <p className="text-purple-600 font-semibold text-sm">{role}</p>
            <p className="text-gray-500 text-sm">{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProoflyEmbed: React.FC<ProoflyEmbedProps> = ({
  shareId,
  backendUrl = "http://localhost:3000",
  variant = "minimal",
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

  const testimonials = space.testimonials || [];
  const latest = testimonials[testimonials.length - 1];

  if (!latest) {
    return (
      <div className="p-4 text-sm text-gray-500 bg-gray-50 rounded-lg">
        No testimonials yet for this space.
      </div>
    );
  }

  const commonProps = {
    name: latest.name,
    role: latest.role,
    company: space.companyName,
    content: space.description || "Great experience with this product!",
    rating: 5,
  };

  if (variant === "bold") {
    return <BoldGradientCard {...commonProps} />;
  }

  return <MinimalElegantCard {...commonProps} />;
};

export default ProoflyEmbed;
