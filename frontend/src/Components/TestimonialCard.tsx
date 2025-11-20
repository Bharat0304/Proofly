import React, { useState } from 'react';
import { Play, Star, Quote, Video, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

// Types
export interface BaseTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface VideoTestimonial extends BaseTestimonial {
  type: 'video';
  videoUrl: string;
  videoThumbnail: string;
}

export interface TextTestimonial extends BaseTestimonial {
  type: 'text';
}

// // export type Testimonial = VideoTestimonial | TextTestimonial;

// Shared Components
export const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

// Card Component 1: Minimal Elegant Card
export const MinimalElegantCard: React.FC<{ testimonial: TextTestimonial }> = ({ testimonial }) => {
  return (
    <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
      {/* Gradient accent line */}
      <Link to="/snippet" >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-l-3xl" />
      
      <div className="pl-4">
        {/* Quote mark */}
        <Quote className="w-10 h-10 text-blue-500 mb-4 opacity-50" />
        
        {/* Content */}
        <p className="text-gray-700 text-base leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </p>
        
        {/* Rating */}
        <div className="mb-6">
          <StarRating rating={testimonial.rating} />
        </div>
        
        {/* Author */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
            <p className="text-gray-500 text-sm">{testimonial.role} at {testimonial.company}</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

// Card Component 2: Bold Gradient Card
export const BoldGradientCard: React.FC<{ testimonial: TextTestimonial }> = ({ testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    
    <div 
    
      className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-[2px] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/snippet2" >
      <div className="bg-white rounded-2xl p-8 h-full">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <StarRating rating={testimonial.rating} />
        </div>
        
        {/* Content */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
          "{testimonial.content}"
        </p>
        
        {/* Author */}
        <div className="flex items-center space-x-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className={`w-14 h-14 rounded-full border-3 border-transparent transition-all duration-300 ${
              isHovered ? 'border-purple-500 scale-110' : ''
            }`}
          />
          <div>
            <h4 className="text-gray-900 font-bold text-lg">{testimonial.name}</h4>
            <p className="text-purple-600 font-semibold text-sm">{testimonial.role}</p>
            <p className="text-gray-500 text-sm">{testimonial.company}</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

// Card Component 3: Glass Morphism Video Card
export const GlassMorphismVideoCard: React.FC<{ testimonial: VideoTestimonial }> = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isVideoLoaded) {
      setIsVideoLoaded(true);
    }
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20">
      {/* Video Section */}
      <Link to="/snippet3" >
      <div className="relative h-64 overflow-hidden">
        {!isVideoLoaded ? (
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${testimonial.videoThumbnail})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="group-hover:scale-110 transition-all duration-300 bg-white/30 backdrop-blur-md rounded-full p-6 hover:bg-white/50 border border-white/40"
              >
                <Play className="w-10 h-10 text-white ml-1" />
              </button>
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
              <Video className="w-3 h-3" />
              <span>VIDEO</span>
            </div>
          </div>
        ) : (
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay={isPlaying}
            poster={testimonial.videoThumbnail}
          >
            <source src={testimonial.videoUrl} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm">
        <p className="text-white/90 text-base leading-relaxed mb-4">
          "{testimonial.content}"
        </p>
        
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
        
        <div className="flex items-center space-x-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full border-2 border-blue-400"
          />
          <div>
            <h4 className="text-white font-semibold">{testimonial.name}</h4>
            <p className="text-blue-300 text-sm">{testimonial.role}</p>
            <p className="text-gray-400 text-xs">{testimonial.company}</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

// Card Component 4: Modern Dark Video Card
export const ModernDarkVideoCard: React.FC<{ testimonial: VideoTestimonial }> = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isVideoLoaded) {
      setIsVideoLoaded(true);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
      {/* Animated border effect */}
      <Link to="/snippet4" >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative bg-slate-900 rounded-2xl m-[1px]">
        {/* Video Section */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          {!isVideoLoaded ? (
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${testimonial.videoThumbnail})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="relative group-hover:scale-110 transition-transform duration-300"
                >
                  <div className="absolute inset-0 bg-cyan-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-cyan-500 rounded-full p-5 hover:bg-cyan-400">
                    <Play className="w-8 h-8 text-white ml-0.5" />
                  </div>
                </button>
              </div>
              <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                Video Review
              </div>
            </div>
          ) : (
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay={isPlaying}
              poster={testimonial.videoThumbnail}
            >
              <source src={testimonial.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p className="text-gray-300 text-base leading-relaxed mb-5">
            "{testimonial.content}"
          </p>
          
          <div className="mb-5">
            <StarRating rating={testimonial.rating} />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full border-2 border-cyan-400"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
              <p className="text-cyan-400 font-medium text-sm">{testimonial.role}</p>
              <p className="text-gray-400 text-sm">{testimonial.company}</p>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

// Main App Component
const TestimonialShowcase: React.FC = () => {
  const textTestimonial1: TextTestimonial = {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechFlow Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "This product completely transformed our workflow. The intuitive design and powerful features saved us countless hours every week. Our team productivity has increased significantly.",
    type: "text"
  };

  const textTestimonial2: TextTestimonial = {
    id: 2,
    name: "Emily Watson",
    role: "Design Director",
    company: "Creative Studio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "The attention to detail is incredible. Every interaction feels smooth and purposeful. This is exactly what we needed to elevate our client presentations to the next level.",
    type: "text"
  };

  const videoTestimonial1: VideoTestimonial = {
    id: 3,
    name: "Marcus Rodriguez",
    role: "CEO",
    company: "StartupLab",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "Watch how this solution revolutionized our entire business process...",
    type: "video",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    videoThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
  };

  const videoTestimonial2: VideoTestimonial = {
    id: 4,
    name: "James Park",
    role: "CTO",
    company: "DataCore Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "See the technical deep-dive of our implementation success story...",
    type: "video",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    videoThumbnail: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=600&h=400&fit=crop"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Four Unique Testimonial Cards
        </h1>
        <p className="text-gray-600 text-lg">
          Each component showcases a different design style
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Card 1: Minimal Elegant */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Component 1: Minimal Elegant</h3>
          <MinimalElegantCard testimonial={textTestimonial1} />
        </div>

        {/* Card 2: Bold Gradient */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Component 2: Bold Gradient</h3>
          <BoldGradientCard testimonial={textTestimonial2} />
        </div>

        {/* Card 3: Glass Morphism Video */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Component 3: Glass Morphism Video</h3>
          <GlassMorphismVideoCard testimonial={videoTestimonial1} />
        </div>

        {/* Card 4: Modern Dark Video */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Component 4: Modern Dark Video</h3>
          <ModernDarkVideoCard testimonial={videoTestimonial2} />
        </div>
      </div>

      {/* Component Info */}
      <div className="max-w-7xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-blue-600">MinimalElegantCard:</span> Clean, professional design with accent line
          </div>
          <div>
            <span className="font-semibold text-purple-600">BoldGradientCard:</span> Vibrant gradient border with animated effects
          </div>
          <div>
            <span className="font-semibold text-cyan-600">GlassMorphismVideoCard:</span> Modern glass effect with video support
          </div>
          <div>
            <span className="font-semibold text-slate-600">ModernDarkVideoCard:</span> Dark theme with glowing border animations
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialShowcase;