"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  image: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function AnimatedTestimonials({
  testimonials,
  className = "",
  autoplay = true,
  autoplayInterval = 5000,
}: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
            <Image
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              fill
              className="object-cover"
            />
          </div>
          
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-700 mb-4 italic"
          >
            "{currentTestimonial.quote}"
          </motion.blockquote>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-1"
          >
            <p className="font-semibold text-gray-900">{currentTestimonial.name}</p>
            <p className="text-sm text-gray-600">{currentTestimonial.designation}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
