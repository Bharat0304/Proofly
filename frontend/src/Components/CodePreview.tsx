import MyCodeComponent from "./CodeSnippet"
export const codeSnippet=`const MinimalElegantCard: React.FC<{ testimonial: TextTestimonial }> = ({ testimonial }) => {
  return (
    <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
      {/* Gradient accent line */}
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
    </div>
  );
};`;
export const Codepreview=()=>{
    return (
        <div>
            <MyCodeComponent code={codeSnippet} language="typescript" />
        </div>
    )
}