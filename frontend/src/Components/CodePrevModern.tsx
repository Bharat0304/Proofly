import MyCodeComponent from "./CodeSnippet"
export const codeSnippet=`const ModernDarkVideoCard: React.FC<{ testimonial: VideoTestimonial }> = ({ testimonial }) => {
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
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative bg-slate-900 rounded-2xl m-[1px]">
        {/* Video Section */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          {!isVideoLoaded ? (
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage:  }}
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
    </div>
  );
};
`;
export const CodePrevModern=()=>{
    return (
        <div>
            <MyCodeComponent code={codeSnippet} language="typescript" />
        </div>
    )
}