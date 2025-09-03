import { motion } from "framer-motion";

const logos: { src: string; alt: string }[] = [
  { src: "https://logo.clearbit.com/mckinsey.com", alt: "McKinsey & Company" },
  { src: "https://logo.clearbit.com/superhuman.com", alt: "Superhuman" },
  { src: "https://logo.clearbit.com/acquire.io", alt: "Acquire" },
  { src: "https://logo.clearbit.com/yoast.com", alt: "Yoast" },
  { src: "https://logo.clearbit.com/earnestcapital.com", alt: "Earnest Capital" },
];

export function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 overflow-hidden text-white">
      {/* Background Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
          Welcome to <span className="text-sky-300">Proofly</span>
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-white/90">
          Showcase Proof. Build Trust. Close Deals.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
          The ultimate platform to showcase your work, build trust with
          potential clients, and close deals faster than ever before. Collect
          text, video, and image testimonials in minutes. Build credibility and
          grow faster with authentic social proof.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:scale-105 transition-all duration-200">
            🚀 Get Started
          </button>
          <button className="px-6 py-3 bg-white text-gray-800 rounded-xl shadow-md hover:scale-105 transition-all duration-200">
            🎥 How It Works
          </button>
        </div>
      </div>

      {/* Trusted Customers Section (Train Effect) */}
{/* Trusted Customers Section (Infinite Train) */}
<section className="bg-gray-900 py-16 overflow-hidden">
  <h3 className="text-center text-lg font-semibold text-gray-300 mb-10">
    Trusted Customers
  </h3>
  <div className="relative w-full overflow-hidden">
    <motion.div
      className="flex gap-12"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {/* Duplicate logos to create seamless train */}
      {[...logos, ...logos].map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          className="h-10 grayscale hover:grayscale-0 transition duration-300"
        />
      ))}
    </motion.div>
  </div>
</section>


      {/* Testimonials Preview Section */}
      <section className="relative py-20 px-6 bg-gradient-to-tr from-purple-600/80 to-pink-600/80 backdrop-blur-lg">
        <h3 className="text-center text-3xl font-bold mb-12">
          What our users say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white/20 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
            <p className="text-white/90">
              "Proofly helped us increase conversions by 40%! The testimonials
              made our brand feel more trustworthy."
            </p>
            <h4 className="mt-4 font-semibold">— Sarah, Startup Founder</h4>
          </div>
          <div className="p-6 bg-white/20 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
            <p className="text-white/90">
              "Collecting video testimonials used to be a nightmare. Proofly
              made it effortless."
            </p>
            <h4 className="mt-4 font-semibold">— Mark, Agency Owner</h4>
          </div>
          <div className="p-6 bg-white/20 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
            <p className="text-white/90">
              "Our clients love how easy it is to leave feedback. Proofly is a
              game changer!"
            </p>
            <h4 className="mt-4 font-semibold">— Anika, Freelancer</h4>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="relative py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600">
        <h3 className="text-4xl font-bold mb-6">
          Ready to build trust and close more deals?
        </h3>
        <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
          🚀 Get Started Now
        </button>
      </section>
    </div>
  );
}

export default HomePage;
