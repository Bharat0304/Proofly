import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const logos: { src: string; alt: string }[] = [
  { src: "https://logo.clearbit.com/mckinsey.com", alt: "McKinsey & Company" },
  { src: "https://logo.clearbit.com/superhuman.com", alt: "Superhuman" },
  { src: "https://logo.clearbit.com/acquire.io", alt: "Acquire" },
  { src: "https://logo.clearbit.com/yoast.com", alt: "Yoast" },
  { src: "https://logo.clearbit.com/earnestcapital.com", alt: "Earnest Capital" },
];

export function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400">Proofly</h1>
        <div className="flex gap-4">
          <Link
            to="/signin"
            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            🚀 Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
          >
            📝 Sign Up
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          Showcase Proof. <span className="text-indigo-400">Build Trust.</span>
        </h1>
        <p className="max-w-2xl text-gray-400 mb-8">
          The ultimate platform to showcase your work, build trust with clients,
          and close deals faster. Collect testimonials in minutes. Build
          credibility with authentic social proof.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
          >
            🚀 Get Started
          </Link>
          <Link
            to="/how-it-works"
            className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            🎥 How It Works
          </Link>
        </div>
      </div>

      {/* Trusted Customers Section */}
      <section className="bg-gray-800 py-16">
        <h3 className="text-center text-lg font-semibold text-gray-300 mb-10">
          Trusted Customers
        </h3>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
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
      <section className="py-20 px-6">
        <h3 className="text-center text-3xl font-bold mb-12">
          What our users say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-300">
              "Proofly helped us increase conversions by 40%! The testimonials
              made our brand feel more trustworthy."
            </p>
            <h4 className="mt-4 font-semibold text-indigo-400">
              — Sarah, Startup Founder
            </h4>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-300">
              "Collecting video testimonials used to be a nightmare. Proofly
              made it effortless."
            </p>
            <h4 className="mt-4 font-semibold text-indigo-400">
              — Mark, Agency Owner
            </h4>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-300">
              "Our clients love how easy it is to leave feedback. Proofly is a
              game changer!"
            </p>
            <h4 className="mt-4 font-semibold text-indigo-400">
              — Anika, Freelancer
            </h4>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 text-center bg-gray-800">
        <h3 className="text-4xl font-bold mb-6">
          Ready to build trust and close more deals?
        </h3>
        <Link
          to="/signup"
          className="px-8 py-4 bg-indigo-500 rounded-lg font-semibold hover:bg-indigo-600 transition"
        >
          🚀 Get Started Now
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
