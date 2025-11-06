import { Brain, Heart, Leaf, Palette, Shield, Sparkles } from 'lucide-react'
import React from 'react'
import {color, motion} from 'framer-motion'

const Features = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-brand-charcoal">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
              {
              icon: <Brain className="w-10 h-10" />,
              title: "Innovation",
              desc: "We combine AI and creativity to redefine how people experience fashion.",
              color : "pink"
            },
            {
                icon: <Heart className="w-10 h-10" />,
                title: "Inclusivity",
                desc: "Every body type, every culture, every style — all are celebrated here.",
                color : "red"
            },
            {
                icon: <Leaf className="w-10 h-10" />,
                title: "Sustainability",
                desc: "Encouraging smarter wardrobe decisions to promote eco-friendly fashion.",
                color : "green"
            },
            {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Confidence",
                desc: "We empower users to feel authentic and confident in their everyday style.",
                color : "orange"
            },
            {
                icon: <Palette className="w-10 h-10" />,
                title: "Creativity",
              desc: "Fashion is art — and our AI helps you express it effortlessly.",
              color : "cyan"
            },
            {
              icon: <Shield className="w-10 h-10" />,
              title: "Data Ethics",
              desc: "Your data is safe. We ensure privacy and transparency in all interactions.",
              color : "blue"
            },
        ].map((value, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg text-center transition-all duration-200"
            >
              <div className={`flex justify-center mb-4`} style={{ color: value.color, opacity:0.5 }}>{value.icon}</div>
              <h3 className="text-xl text-brand-charcoal font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
  )
}

export default Features