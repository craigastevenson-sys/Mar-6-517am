import React, { useState, useEffect, useCallback } from 'react';

const images = [
  { src: 'https://images.unsplash.com/photo-1758598497575-9d46f32dff1b?w=800&h=600&fit=crop', alt: 'Professional learning language online with headphones at laptop' },
  { src: 'https://images.unsplash.com/photo-1573497019509-d715a631bbe5?w=800&h=600&fit=crop', alt: 'Corporate video conference language training session' },
  { src: 'https://images.unsplash.com/photo-1622131085513-01713201dfd2?w=800&h=600&fit=crop', alt: 'Business professional in language training meeting' },
  { src: 'https://images.unsplash.com/photo-1731432203025-7b031194e6e1?w=800&h=600&fit=crop', alt: 'Employee engaged in online French language course' },
  { src: 'https://images.unsplash.com/photo-1618544976420-1f213fcf2052?w=800&h=600&fit=crop', alt: 'Team collaboration during corporate English training' },
  { src: 'https://images.unsplash.com/photo-1632923945542-7f12f5571516?w=800&h=600&fit=crop', alt: 'Colleagues in bilingual workplace communication training' },
  { src: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800&h=600&fit=crop', alt: 'Executive team in professional language development session' },
];

const ImageCarousel = ({ aspectClass = 'aspect-[4/3]', startIndex = 0 }) => {
  const [current, setCurrent] = useState(startIndex % images.length);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className={`${aspectClass} overflow-hidden relative`} data-testid="image-carousel" role="img" aria-label="Corporate language training professionals">
      {images.map((image, i) => (
        <img
          key={i}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
