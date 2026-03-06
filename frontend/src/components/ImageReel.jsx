import React, { useState, useEffect } from 'react';

const images = [
  { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80', alt: 'Student studying in library for academic success' },
  { src: 'https://images.unsplash.com/photo-1758876020337-2501eeb1ede5?w=800&q=80', alt: 'Online tutoring session via video call' },
  { src: 'https://images.unsplash.com/photo-1582601231162-132ca60713d6?w=800&q=80', alt: 'Student learning remotely on laptop' },
  { src: 'https://images.unsplash.com/photo-1629360021730-3d258452c425?w=800&q=80', alt: 'Tutor helping young student with homework' },
  { src: 'https://images.unsplash.com/photo-1758687126254-03b19c28c4a2?w=800&q=80', alt: 'Parent and child learning together online' },
  { src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', alt: 'Student taking notes during study session' },
  { src: 'https://images.unsplash.com/photo-1622843019803-d91ef1230bef?w=800&q=80', alt: 'Adult learner studying at coffee shop' },
  { src: 'https://images.unsplash.com/photo-1600104055491-a1b4740563e7?w=800&q=80', alt: 'Professional reading educational materials' },
];

const ImageReel = ({ className = '', aspectRatio = 'aspect-[4/3]' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`} role="img" aria-label="Students and tutors in learning sessions">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default ImageReel;
