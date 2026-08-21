import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Optimize Unsplash images dynamically if parameters are not yet set
  const formatSrc = (rawSrc: string) => {
    if (!rawSrc) return fallbackSrc;
    if (rawSrc.includes('images.unsplash.com') && !rawSrc.includes('auto=format')) {
      return `${rawSrc}${rawSrc.includes('?') ? '&' : '?'}auto=format&fit=crop&q=80`;
    }
    return rawSrc;
  };

  const imageSource = hasError ? fallbackSrc : formatSrc(src);

  return (
    <div className={`relative overflow-hidden bg-neutral-950 ${className}`}>
      {/* Specular Liquid Glass Shimmer while image loads */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-pulse" />
        </div>
      )}
      <img
        src={imageSource}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
