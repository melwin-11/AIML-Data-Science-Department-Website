"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface RollingGalleryProps {
  images: string[];
  className?: string;
}

export function RollingGallery({ images, className = "" }: RollingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex gap-4 animate-scroll"
        style={{
          width: "200%",
          display: "flex",
        }}
      >
        {/* First set of images */}
        <div className="flex gap-4">
          {images.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-64 h-48 relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-4">
          {images.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-64 h-48 relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
