"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CircularGalleryProps {
  images: string[];
  className?: string;
  radius?: number;
  centerImage?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export function CircularGallery({ 
  images, 
  className = "", 
  radius = 200,
  centerImage,
  autoRotate = true,
  rotationSpeed = 0.5
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setRotation(prev => prev + rotationSpeed);
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, isHovered]);

  const imageCount = images.length;
  const angleStep = (2 * Math.PI) / imageCount;

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Center image */}
      {centerImage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={centerImage}
              alt="Center image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Circular images */}
      {images.map((image, index) => {
        const angle = (index * angleStep) + rotation;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:z-20"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            }}
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        );
      })}

      {/* Optional: Add rotation controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          onClick={() => setRotation(prev => prev - (Math.PI / 4))}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          aria-label="Rotate left"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setRotation(prev => prev + (Math.PI / 4))}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          aria-label="Rotate right"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
