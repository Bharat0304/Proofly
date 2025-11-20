import { useState } from 'react';
import { Star, Quote, Heart, Twitter, Linkedin } from 'lucide-react';

const TestimonialShowcase = () => {
  const [selectedCard, setSelectedCard] = useState(1);

  const testimonialData = {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    content: "This product has completely transformed how our team collaborates. The intuitive design and powerful features have increased our productivity by 300%. I can't imagine working without it now.",
    rating: 5,
    date: "2 days ago"
  };

  const designs = [
    { id: 1, name: "Modern Glass" },
    { id: 2, name: "Gradient Hero" },
    { id: 3, name: "Minimal Clean" },
    { id: 4, name: "Social Proof" },
    { id: 5, name: "Quote Style" },
    { id: 6, name: "Card Stack" }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  const ModernGlassCard = () => (
    <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-600/10"></div>
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <img src={testimonialData.avatar} alt={testimonialData.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{testimonialData.name}</h3>
            <p className="text-sm text-gray-600">{testimonialData.role} at {testimonialData.company}</p>
          </div>
          <StarRating rating={testimonialData.rating} />
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">{testimonialData.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{testimonialData.date}</span>
          <div className="flex gap-2">
            <Twitter className="w-4 h-4 hover:text-blue-500 cursor-pointer transition-colors" />
            <Linkedin className="w-4 h-4 hover:text-blue-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );

  const GradientHeroCard = () => (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[2px] shadow-2xl hover:shadow-3xl transition-all duration-500 group">
      <div className="relative bg-white rounded-3xl p-6 h-full">
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={testimonialData.avatar} alt={testimonialData.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg" />
              <div>
                <h3 className="font-bold text-gray-900">{testimonialData.name}</h3>
                <p className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{testimonialData.role}</p>
              </div>
            </div>
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          </div>
          <blockquote className="text-gray-700 font-medium leading-relaxed mb-4 italic">
            "{testimonialData.content}"
          </blockquote>
          <div className="flex justify-between items-center">
            <StarRating rating={testimonialData.rating} />
            <span className="text-xs text-gray-500 font-medium">{testimonialData.company}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const MinimalCleanCard = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
      <div className="mb-4">
        <StarRating rating={testimonialData.rating} />
      </div>
      <p className="text-gray-800 leading-relaxed mb-6 text-lg">
        {testimonialData.content}
      </p>
      <div className="flex items-center gap-4">
        <img src={testimonialData.avatar} alt={testimonialData.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold text-gray-900">{testimonialData.name}</h4>
          <p className="text-sm text-gray-600">{testimonialData.role}, {testimonialData.company}</p>
        </div>
      </div>
    </div>
  );

  const SocialProofCard = () => (
    <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={testimonialData.avatar} alt={testimonialData.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900">{testimonialData.name}</h3>
            <p className="text-sm text-gray-600">{testimonialData.role} • {testimonialData.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-medium text-green-800">Verified</span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{testimonialData.content}</p>
      <div className="flex items-center justify-between">
        <StarRating rating={testimonialData.rating} />
        <span className="text-sm text-gray-500">{testimonialData.date}</span>
      </div>
    </div>
  );

  const QuoteStyleCard = () => (
    <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <Quote className="absolute top-4 left-4 w-8 h-8 text-indigo-300" />
      <Quote className="absolute bottom-4 right-4 w-8 h-8 text-indigo-300 rotate-180" />
      <div className="relative">
        <blockquote className="text-xl font-medium text-gray-800 leading-relaxed mb-6 pl-8">
          {testimonialData.content}
        </blockquote>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={testimonialData.avatar} alt={testimonialData.name} className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md" />
            <div>
              <h4 className="font-bold text-gray-900">{testimonialData.name}</h4>
              <p className="text-indigo-600 font-medium">{testimonialData.role}</p>
              <p className="text-sm text-gray-500">{testimonialData.company}</p>
            </div>
          </div>
          <StarRating rating={testimonialData.rating} />
        </div>
      </div>
    </div>
  );

  const CardStackCard = () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-1 opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl transform -rotate-1 opacity-20"></div>
      <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img src={testimonialData.avatar} alt={testimonialData.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{testimonialData.name}</h3>
            <p className="text-gray-600">{testimonialData.role}</p>
            <p className="text-sm text-blue-600 font-medium">{testimonialData.company}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">{testimonialData.content}</p>
        <div className="flex items-center justify-between">
          <StarRating rating={testimonialData.rating} />
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{testimonialData.date}</span>
        </div>
      </div>
    </div>
  );

  const renderSelectedCard = () => {
    switch(selectedCard) {
      case 1: return <ModernGlassCard />;
      case 2: return <GradientHeroCard />;
      case 3: return <MinimalCleanCard />;
      case 4: return <SocialProofCard />;
      case 5: return <QuoteStyleCard />;
      case 6: return <CardStackCard />;
      default: return <ModernGlassCard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Testimonial Card Designs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional testimonial components perfect for testimonial.to and similar platforms. Click on different styles to preview.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {designs.map((design) => (
            <button
              key={design.id}
              onClick={() => setSelectedCard(design.id)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                selectedCard === design.id
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{design.name}</div>
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          {renderSelectedCard()}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Visual Elements</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Modern glassmorphism effects</li>
                <li>• Gradient backgrounds and borders</li>
                <li>• Interactive hover animations</li>
                <li>• Professional avatar displays</li>
                <li>• Star rating components</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">User Experience</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Smooth transitions and micro-interactions</li>
                <li>• Social media integration ready</li>
                <li>• Verification badges and trust signals</li>
                <li>• Responsive design for all devices</li>
                <li>• Accessible color contrasts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialShowcase;