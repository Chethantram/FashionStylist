import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Palette, Leaf, Shield, Heart } from "lucide-react";
import Header from "components/ui/Header";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
        <Header/>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-16 py-20 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-primary mb-4">
            About <span className="text-brand-gold">AI Fashion Stylist</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Welcome to <strong>AI Fashion Stylist</strong> — your personal
            digital style partner powered by artificial intelligence. We help
            you discover outfits that fit your body type, color palette, and
            lifestyle effortlessly. Combining fashion expertise and technology,
            we make personal styling accessible to everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src="/public/about.png"
            alt="AI Fashion Stylist"
            className="rounded-3xl shadow-xl w-full md:w-4/5 object-cover"
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <section className="py-16 px-6 md:px-20 text-center bg-white">
          <h2 className="text-3xl font-bold text-brand-charcoal mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our mission is to make fashion{" "}
            <strong>personal, inclusive, and intelligent</strong>. Everyone
            deserves to feel confident in their style — regardless of body type,
            background, or budget. Through our AI stylist, we help users express
            their individuality, explore new looks, and make sustainable
            wardrobe choices.
          </p>
        </section>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}>
      <section className="py-16 px-6 md:px-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-brand-charcoal mb-4">Our Vision</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We envision a future where{" "}
          <strong>AI and creativity collaborate</strong> to make fashion more
          sustainable and personal. A world where technology empowers
          individuality, and style becomes a language of self-expression for
          everyone.
        </p>
      </section>
          </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >

      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-brand-charcoal">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
              {
              icon: <Brain className="w-10 h-10 text-brand-gold" />,
              title: "Innovation",
              desc: "We combine AI and creativity to redefine how people experience fashion.",
            },
            {
                icon: <Heart className="w-10 h-10 text-brand-gold" />,
                title: "Inclusivity",
                desc: "Every body type, every culture, every style — all are celebrated here.",
            },
            {
                icon: <Leaf className="w-10 h-10 text-brand-gold" />,
                title: "Sustainability",
                desc: "Encouraging smarter wardrobe decisions to promote eco-friendly fashion.",
            },
            {
                icon: <Sparkles className="w-10 h-10 text-brand-gold" />,
                title: "Confidence",
                desc: "We empower users to feel authentic and confident in their everyday style.",
            },
            {
                icon: <Palette className="w-10 h-10 text-brand-gold" />,
                title: "Creativity",
              desc: "Fashion is art — and our AI helps you express it effortlessly.",
            },
            {
              icon: <Shield className="w-10 h-10 text-brand-gold" />,
              title: "Data Ethics",
              desc: "Your data is safe. We ensure privacy and transparency in all interactions.",
            },
        ].map((value, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg text-center transition-all duration-200"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
          </motion.div>

      {/* Unique Features Section */}
      <section className="py-16 px-6 md:px-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-brand-charcoal mb-10">
          What Makes Us Unique
        </h2>
        <div className="max-w-4xl mx-auto text-gray-600 space-y-4 text-lg">
          <p>
            ✅ AI-Based Color Analysis — Discover your best color tones
            effortlessly.
          </p>
          <p>
            ✅ Body Type Recognition — Personalized outfit suggestions for your
            proportions.
          </p>
          <p>
            ✅ Style Intelligence Engine — Learns from your preferences over
            time.
          </p>
          <p>
            ✅ Smart Wardrobe Assistant — Organize and mix outfits digitally.
          </p>
          <p>
            ✅ Sustainable Fashion Insights — Encouraging eco-friendly style
            choices.
          </p>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-brand-charcoal">Powered by AI</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our system combines <strong>Computer Vision</strong> to analyze colors
          and outfits,
          <strong> Machine Learning</strong> to learn your style, and
          <strong> Recommendation Systems</strong> to curate personalized looks
          — making every outfit smarter.
        </p>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-charcoal text-white text-center py-16 px-6 md:px-20 rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          We’re building a movement that connects fashion, technology, and
          sustainability. Let’s create a world where AI empowers individuality —
          and every outfit tells your story.
        </p>
        <a
          href="/"
          className="bg-white text-brand-charcoal font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition-all duration-200"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}
