import MyCodeComponent from "./CodeSnippet"
export const codeSnippet=`const GlassMorphismVideoCard: React.FC<{ testimonial: VideoTestimonial }> = ({ testimonial }) => {
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
      <div className="relative h-64 overflow-hidden">
        {!isVideoLoaded ? (
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: }}
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
    </div>
  );
};`;
export const CodePrevGlass=()=>{
    return (
        <div>
            <MyCodeComponent code={codeSnippet} language="typescript" />
        </div>
    )
}