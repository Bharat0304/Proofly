import MyCodeComponent from "./CodeSnippet"
export const codeSnippet=`const BoldGradientCard: React.FC<{ testimonial: TextTestimonial }> = ({ testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-[2px] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"s
          />
          <div>
            <h4 className="text-gray-900 font-bold text-lg">{testimonial.name}</h4>
            <p className="text-purple-600 font-semibold text-sm">{testimonial.role}</p>
            <p className="text-gray-500 text-sm">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;
export const CodePrevBold=()=>{
    return (
        <div>
            <MyCodeComponent code={codeSnippet} language="typescript" />
        </div>
    )
}